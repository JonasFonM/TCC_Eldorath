/* eslint-disable @typescript-eslint/no-explicit-any */
import { character } from "@prisma/client"
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node"
import { Link, NavLink, useActionData, useLoaderData, useOutletContext } from "@remix-run/react"
import { useEffect, useRef, useState } from "react"
import { AttributeHandler } from "~/components/character-sheet/attribute-handler"
import { CharacterCreationFooter } from "~/components/character-sheet/character-creator-footer"
import { ResetConfirm } from "~/components/character-sheet/reset-confirm"
import { useSidebar } from "~/components/context-providers/side-bar-context"
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

    const totalLimit = baseLimit + character.tier - character.mind - character.body - character.agility + (character.boss ? 8 : 0)

    const canDelete =
        character.name === "Nome"
        && character.level === 1
        && character.agility === 1
        && character.body === 1
        && character.mind === 1
        && character.campaignId === null
        && character.experience === 0
        && character.pendingLineages === 2
        && character.pendingPath === 1
        && character.pendingSkills === 2

    const [selectReset, setReset] = useState<number>(0);

    const showReset = () => {
        setReset(() => {
            return character.id;
        });
    };

    const cancelReset = () => {
        setReset(() => {
            return 0
        });
    };

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
            setLimit(totalLimit)
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
            if (newValue >= 1 && limit - adjustment >= 0) {
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

    const advanceWithoutChange = limit === 0
        && character.agility === formData.agility
        && character.body === formData.body
        && character.mind === formData.mind


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

            <div style={{ position: "sticky", top: '130px', zIndex: '1' }} className="title-input">
                <h1 className="title-container">Atributos
                    <button type="button" onClick={() => setShowAtr(1)} className="question-button">?</button>
                    <button id="reset" type="button" onClick={showReset} className="question-button">R</button>
                </h1>
                <h3 style={{ fontSize: '1.2rem', margin: '0' }}>Pontos: {limit}</h3>
                {formError && <p className="error" style={{ margin: '0' }}>{formError}</p>}
            </div>
            <GeneralExplain title={'Atributos'} description="Atributos são os valores que representam seus limites e capacidades." isHidden={showAtr != 1} onCancel={() => setShowAtr(0)} />
            <ResetConfirm name={character.name} isHidden={selectReset === 0} onCancel={cancelReset} id={String(character.id)} />

            <div className="container" style={{ marginBottom: '150px' }}>
                <AttributeHandler
                    title="Agilidade"
                    attributeName="agility"
                    attributeValue={formData.agility}
                    onPlus={() => adjustAttribute('agility', +1)}
                    onMinus={() => adjustAttribute('agility', -1)}
                />

                <input hidden type="number" name="agility" value={formData.agility} onChange={handleChange} />

                <AttributeHandler
                    title="Corpo"
                    attributeName="body"
                    attributeValue={formData.body}
                    onPlus={() => adjustAttribute('body', +1)}
                    onMinus={() => adjustAttribute('body', -1)}
                />

                <input hidden type="number" name="body" value={formData.body} onChange={handleChange} />

                <AttributeHandler
                    title="Mente"
                    attributeName="mind"
                    attributeValue={formData.mind}
                    onPlus={() => adjustAttribute('mind', +1)}
                    onMinus={() => adjustAttribute('mind', -1)}
                />

                <input hidden type="number" name="mind" value={formData.mind} onChange={handleChange} />
            </div>

            <CharacterCreationFooter
                backBtnName={canDelete
                    ? 'Deletar'
                    : 'Voltar'
                }
                backLink={canDelete
                    ? `/delete/character/${character.id}/`
                    : `/user/character/${character.id}/stats/`
                }
                advBtnName={'Linhagens'}
                advLink={advanceWithoutChange
                    ? `/user/character/new/${character.id}/lineages/`
                    : null
                }
                showAdv={true}
            />
        </form >
    );
}
