import { lineage } from "@prisma/client";
import { ActionFunction, json, redirect } from "@remix-run/node";
import { NavLink, useOutletContext } from "@remix-run/react";
import React, { useRef, useState } from "react";
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
        return redirect(`/user/character/new/${characterId}/paths/`)
    } catch (error) {
        console.error(error);
        return json({ error: "Failed to save lineages." }, { status: 500 });
    }

}

export default function LineageSelection() {
    const { characterId, lineages, maxSelectableLineages } = useOutletContext<{ characterId: string, lineages: lineage[], maxSelectableLineages: number }>();
    const [selectedLineages, setSelectedLineages] = useState<number[]>([]);
    const [isPure, setPure] = useState<boolean>(false);
    const isMaxSelected = selectedLineages.length >= maxSelectableLineages;

    const show = useRef<number[]>([]); // Avoid re-renders

    const forceUpdate = useState(0)[1]; // Trigger minimal re-renders when necessary

    const showRow = (n: number) => {
        if (show.current.includes(n)) {
            const newShow = show.current.filter(ns => ns != n)
            show.current = newShow
            return forceUpdate(n => n + 1);
        }
        show.current.push(n);
        return forceUpdate(n => n + 1);
    }

    const handleLineageClick = (lineageId: number) => {
        setSelectedLineages((prevSelectedLineages) => {
            const isSelected = prevSelectedLineages.includes(lineageId);

            const newSelectedLineages = isSelected
                ? prevSelectedLineages.filter(id => id !== lineageId)
                : [...prevSelectedLineages, lineageId];

            setPure(newSelectedLineages.length === 1);

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
            <h1>Linhagens</h1>
            {maxSelectableLineages > 0 ?
                <>
                    <form method="post" onSubmit={handleSubmit}>
                        <h2>Escolha até {maxSelectableLineages} Linhagens</h2>
                        <h3>Escolher apenas 1 Linhagem a torna Pura</h3>

                        <table>
                            <thead>
                                <TableHead
                                    tableTitles={['Linhagem']}
                                    onClick={() => showRow(-2)}
                                    open={show.current.includes(-2)}
                                />
                            </thead>

                            {lineages.map(ln => (
                                <React.Fragment key={ln.id}>
                                    <tbody className={!isMaxSelected || selectedLineages.includes(ln.id) ? '' : 'error'}>

                                        <TableData
                                            key={ln.id}
                                            tableData={isPure && selectedLineages.includes(ln.id) ? [String(ln.name) + ' Pura'] : [String(ln.name)]}
                                            show={show.current.includes(-2)}
                                            onClick={selectedLineages.length < maxSelectableLineages || selectedLineages.includes(ln.id)
                                                ? () => handleLineageClick(Number(ln.id))
                                                : () => null}
                                            selected={selectedLineages.includes(ln.id)}
                                        />
                                    </tbody>
                                </React.Fragment>
                            ))}

                        </table >

                        {selectedLineages.map(lineageId => (
                            <input type="hidden" key={lineageId} name="lineages" value={lineageId} />
                        ))}

                        <input type="hidden" key='pure' name="pure" value={isPure ? 'true' : 'false'} />


                        <button type="submit" className="button">Próximo</button>
                    </form>
                </>

                :
                <>
                    <h2>Você já escolheu uma Linhagem</h2>
                    <NavLink to={`/user/character/new/${characterId}/paths`}><button type="button" className="button">Caminhos</button></NavLink>

                </>
            }

        </>
    );
}
