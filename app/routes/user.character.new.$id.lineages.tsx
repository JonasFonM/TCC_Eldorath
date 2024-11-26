import { lineage } from "@prisma/client";
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { LineageCircle } from "~/components/lineage-circle";
import { requireUserId } from "~/utils/auth.server";
import { submitCharLineages } from "~/utils/character.server";
import { prisma } from "~/utils/prisma.server";

export const loader: LoaderFunction = async ({ request, params }) => {
    const userId = await requireUserId(request)
    const lineages = await prisma.lineage.findMany()

    const characterId = Number(params.id)

    const character = await prisma.character.findUnique({
        where: { id: characterId },
        include: { skills: true }
    });

    const maxSelectable = character?.pendingLineages;

    return json({ userId, lineages, maxSelectable, characterId });
}

export const action: ActionFunction = async ({ request, params }) => {
    const form = await request.formData();
    const selectedLineages = form.getAll('lineages') as string[];
    const selectedLineageIds = selectedLineages.map(id => parseInt(id))
    const pure = form.get('pure') === 'true';
    const characterId = params.id

    if (!selectedLineages || selectedLineages.length === 0) {
        return json({ error: "You must select at least one lineage." }, { status: 400 });
    }
    try {
        await submitCharLineages(selectedLineageIds, Number(characterId), pure)
        return redirect(`/user/character/${characterId}/capabilities/`)
    } catch (error) {
        console.error(error);
        return json({ error: "Failed to save lineages." }, { status: 500 });
    }

}

export default function LineageSelection() {
    const { lineages, maxSelectable, characterId } = useLoaderData<{ lineages: lineage[], maxSelectable: number, characterId: string }>();
    const [selectedLineages, setSelectedLineages] = useState<number[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isPure, setPure] = useState<boolean>(true);

    const isMaxSelected = selectedLineages.length >= maxSelectable;

    const handleLineageClick = (lineageId: number) => {
        setSelectedLineages((prevSelectedLineages) => {
            const isSelected = prevSelectedLineages.includes(lineageId);

            const newSelectedLineages = isSelected
                ? prevSelectedLineages.filter(id => id !== lineageId)
                : [...prevSelectedLineages, lineageId];

            setPure(newSelectedLineages.length === 1);

            if (newSelectedLineages.length > maxSelectable) {
                setError("Você não pode escolher mais Linhagens.");
                return prevSelectedLineages;
            } else {
                setError(null);
            }

            return newSelectedLineages;
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {

        if (!selectedLineages && maxSelectable != 0 || selectedLineages.length <= 0 && maxSelectable != 0) {
            event.preventDefault();

            return alert(`Selecione pelo menos uma Linhagem.`);
        }
        return;
    }



    return (
        <>
            {maxSelectable > 0 ?
                <>
                    <form method="post" onSubmit={handleSubmit}>
                        <h1 className="title-container">Escolha até {maxSelectable} Linhagens<NavLink to={`/user/character/${characterId}/capabilities/`} style={{ color: 'red' }} className="question-button">X</NavLink></h1>
                        <h3>Escolher apenas 1 Linhagem a torna Pura</h3>

                        <div className="lineages-grid">
                            {lineages.map(lineage => (
                                <LineageCircle
                                    key={lineage.id}
                                    lineage={lineage}
                                    isPure={selectedLineages.length <=1}
                                    isSelected={selectedLineages.includes(lineage.id)}
                                    onClick={() => !isMaxSelected || selectedLineages.includes(lineage.id) ? handleLineageClick(lineage.id) : null}
                                />
                            ))}
                        </div>
                        {selectedLineages.map(lineageId => (
                            <input type="hidden" key={lineageId} name="lineages" value={lineageId} />
                        ))}

                        <input type="hidden" key='pure' name="pure" value={isPure ? 'true' : 'false'} />

                        {error && <p>{error}</p>}

                        <button type="submit" className="button">Confirmar</button>
                    </form>
                </>

                :
                <>
                    <h1 className="title-container">Sua Linhagem já foi Escolhida</h1>
                    <NavLink to={`/user/character/${characterId}/capabilities/`}><button type="button" className="button">Sair</button></NavLink>

                </>
            }

        </>
    );
}
