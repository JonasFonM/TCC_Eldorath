/* eslint-disable @typescript-eslint/no-explicit-any */
import { character } from "@prisma/client"
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node"
import { NavLink, useActionData, useLoaderData } from "@remix-run/react"
import { useEffect, useRef, useState } from "react"
import { GeneralExplain } from "~/components/explanations/general-explain"
import { getUserIdFromSession, requireUserId } from '~/utils/auth.server'
import { tierByLevel, updateCharacter } from "~/utils/character.server"
import { prisma } from "~/utils/prisma.server"

export const loader: LoaderFunction = async ({ request, params }) => {
    const userId = await requireUserId(request)
    const characterId = Number(params.id);
    const character = await prisma.character.findUnique({
        where: { id: characterId }
    });
    return json({ userId, character })
}

export const action: ActionFunction = async ({ params, request }) => {
    const form = await request.formData();
    const name = form.get('name') as string;
    const level = parseInt(form.get('level') as string, 10);
    const tier = parseInt(tierByLevel(form.get('level')) as string, 10);
    const agility = parseInt(form.get('agility') as string, 10);
    const body = parseInt(form.get('body') as string, 10);
    const mind = parseInt(form.get('mind') as string, 10);
    const authorId = await getUserIdFromSession(request);

    if (!authorId) {
        return json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!name || isNaN(level) || isNaN(tier) || isNaN(agility) || isNaN(body) || isNaN(mind)) {
        return json({ error: "All fields are required and must be valid numbers" }, { status: 400 });
    }

    try {
        const character = await updateCharacter({ name, level, tier, agility, body, mind, authorId }, Number(params.id));

        return (
            redirect(`/user/character/new/${String(character.id)}/lineages/`)
        );
    } catch (error) {
        console.error(error);
        return json({ error: "Failed to create character" }, { status: 500 });
    }

}

export default function NewCharacterRoute() {
    const actionData = useActionData<ActionFunction>();
    const { character } = useLoaderData<{ character: character }>();
    const [limit, setLimit] = useState(0);
    const [showAtr, setShowAtr] = useState<number>();
    const baseLimit = character.npc === true
        ? 4
        : 6

    const firstLoad = useRef(true);
    const [formData, setFormData] = useState({
        name: '',
        level: 1,
        agility: 0,
        body: 0,
        mind: 0
    });

    useEffect(() => {
        if (character) {
            setFormData({
                name: character.name,
                level: character.level,
                agility: character.agility,
                body: character.body,
                mind: character.mind
            });
            setLimit(baseLimit + character.tier - character.mind - character.body - character.agility + (character.boss ? 8 : 0))
        }
    }, [character]);

    const [errors, setErrors] = useState({
        name: '',
        level: '',
        agility: '',
        body: '',
        mind: ''
    });
    const [formError, setFormError] = useState('');

    useEffect(() => {
        if (!firstLoad.current && actionData) {
            setErrors(actionData.errors || {
                name: '',
                level: '',
                agility: '',
                body: '',
                mind: ''
            });
            setFormError(actionData.error || '');
        }
    }, [actionData]);

    useEffect(() => {
        if (!firstLoad.current) {
            setFormError('');
        }
    }, [formData]);

    useEffect(() => {
        firstLoad.current = false;
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const adjustAttribute = (attribute: 'agility' | 'body' | 'mind', adjustment: number) => {
        setFormData((prev) => {
            const newValue = prev[attribute] + adjustment;
            if (newValue >= 0 && limit - adjustment >= 0) {
                setLimit(limit - adjustment);
                return { ...prev, [attribute]: newValue };
            }
            return prev;
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        if (limit > 0) {
            event.preventDefault();
            setFormError(`Você precisa usar todos os pontos. ${limit} pontos não foram gastos.`);
            return;
        }

        if (!formData.name || !formData.level || !formData.agility || !formData.body || !formData.mind) {
            event.preventDefault();
            setErrors({
                name: !formData.name ? 'Você precisa informar um nome' : '',
                level: '',
                agility: !formData.agility ? 'Agilidade tem valor mínimo 1' : '',
                body: !formData.body ? 'Corpo tem valor mínimo 1' : '',
                mind: !formData.mind ? 'Mente tem valor mínimo 1' : '',
            });
            setFormError('Preencha todos os campos.');
            return;
        }
    };

    return (
        <form method="post" autoComplete="off" onSubmit={handleSubmit}>

            <div className="container" style={{ position: 'sticky', top: '64px', zIndex: '3' }}>
                <input className="title-input"
                    id="Nome"
                    autoComplete="off"
                    style={{ fontFamily: 'serif', fontSize: '2.3rem', color: "gold", textAlign: 'center' }}
                    type="text"
                    name="name"
                    placeholder="Nome"
                    value={formData.name}
                    onChange={handleChange} />
                {errors.name && <p className="error">{errors.name}</p>}
            </div>

            <input hidden type="number" name="level" value={formData.level} onChange={handleChange} />
            {errors.level && <p>{errors.level}</p>}

            <h1 className="title-container">Atributos<button type="button" onClick={() => setShowAtr(1)} className="question-button">?</button></h1>
            <GeneralExplain title={'Atributos'} description="Atributos são os valores que representam seus limites e capacidades." isHidden={showAtr != 1} onCancel={() => setShowAtr(0)} />

            <h3>Pontos: {limit}</h3>
            {formError && <p className="error">{formError}</p>}

            <div className="container">
                <div className="col-12">
                    <label style={{ fontVariant: 'small-caps', fontFamily: 'serif', fontSize: '1.3rem' }}>
                        Agilidade: {formData.agility}
                        <input hidden type="number" name="agility" value={formData.agility} onChange={handleChange} />
                        <div className="container">
                            <button className="col-3 button" style={{ marginRight: '1%' }} type="button" onClick={() => adjustAttribute('agility', -1)}>-</button>
                            <button className="col-3 button" style={{ marginLeft: '1%' }} type="button" onClick={() => adjustAttribute('agility', 1)}>+</button>
                        </div>
                    </label>
                    {errors.agility && <p className="error">{errors.agility}</p>}
                </div>

                <div className="col-12">
                    <label style={{ fontVariant: 'small-caps', fontFamily: 'serif', fontSize: '1.3rem' }}>
                        Corpo: {formData.body}
                        <input hidden type="number" name="body" value={formData.body} onChange={handleChange} />
                        <div className="container">
                            <button className="col-3 button" style={{ marginRight: '1%' }} type="button" onClick={() => adjustAttribute('body', -1)}>-</button>
                            <button className="col-3 button" style={{ marginLeft: '1%' }} type="button" onClick={() => adjustAttribute('body', 1)}>+</button>
                        </div>
                    </label>
                    {errors.body && <p className="error">{errors.body}</p>}
                </div>

                <div className="col-12">
                    <label style={{ fontVariant: 'small-caps', fontFamily: 'serif', fontSize: '1.3rem' }}>
                        Mente: {formData.mind}
                        <input hidden type="number" name="mind" value={formData.mind} onChange={handleChange} />
                        <div className="container">
                            <button className="col-3 button" style={{ marginRight: '1%' }} type="button" onClick={() => adjustAttribute('mind', -1)}>-</button>
                            <button className="col-3 button" style={{ marginLeft: '1%' }} type="button" onClick={() => adjustAttribute('mind', 1)}>+</button>
                        </div>
                    </label>
                    {errors.mind && <p className="error">{errors.mind}</p>}
                </div>
            </div>


            <div className="container">
                <button className="button" type="submit">Avançar</button>
            </div>
        </form>
    );
}
