import { lineage } from "@prisma/client";
import { ActionFunction, json, redirect } from "@remix-run/node";
import { NavLink, useOutletContext } from "@remix-run/react";
import React, { useState } from "react";
import { TableHead } from "~/components/character-sheet/general-table";
import { TableData } from "~/components/character-sheet/general-table-data";
import { submitCharLineages } from "~/utils/character.server";


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
        return redirect(`/user/character/new/${characterId}/`)
    } catch (error) {
        console.error(error);
        return json({ error: "Failed to save lineages." }, { status: 500 });
    }

}

export default function LineageSelection() {
    const { characterId, lineages, maxSelectableLineages } = useOutletContext<{ characterId: string, lineages: lineage[], maxSelectableLineages: number }>();
    const [selectedLineages, setSelectedLineages] = useState<number[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isPure, setPure] = useState<boolean>(false);
    const [showLineage, setShowLineage] = useState<number>(0);

    const handleLineageClick = (lineageId: number) => {
        setSelectedLineages((prevSelectedLineages) => {
            const isSelected = prevSelectedLineages.includes(lineageId);

            const newSelectedLineages = isSelected
                ? prevSelectedLineages.filter(id => id !== lineageId)
                : [...prevSelectedLineages, lineageId];

            setPure(newSelectedLineages.length === 1);

            if (newSelectedLineages.length > maxSelectableLineages) {
                setError("Você não pode escolher mais Linhagens.");
                return prevSelectedLineages;
            } else {
                setError(null);
            }

            return newSelectedLineages;
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {

        if (!selectedLineages && maxSelectableLineages != 0 || selectedLineages.length <= 0 && maxSelectableLineages != 0) {
            event.preventDefault();

            return alert(`Selecione pelo menos uma Linhagem.`);
        }
        return;
    }

    return (
        <>
            {maxSelectableLineages > 0 ?
                <>
                    <form method="post" onSubmit={handleSubmit}>
                        <h1 className="title-container">Escolha até {maxSelectableLineages} Linhagens</h1>
                        <h3>Escolher apenas 1 Linhagem a torna Pura</h3>

                        <table>
                            <tbody>

                                <TableHead tableTitles={['Linhagem']} onClick={showLineage != -2 ? () => setShowLineage(-2) : () => setShowLineage(0)} />

                                {lineages.map(ln => (
                                    <React.Fragment key={ln.id}>
                                        <TableData
                                            key={ln.id}
                                            tableData={isPure ? [String(ln.name) + ' Pura'] : [String(ln.name)]}
                                            show={showLineage === (-2)}
                                            onClick={() => handleLineageClick(Number(ln.id))}
                                            selected={selectedLineages.includes(ln.id)}
                                        />

                                    </React.Fragment>
                                ))}

                            </tbody>
                        </table >

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
                    <NavLink to={`/user/character/new/${characterId}/`}><button type="button" className="button">Sair</button></NavLink>

                </>
            }

        </>
    );
}
