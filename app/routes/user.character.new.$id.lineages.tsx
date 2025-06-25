import { character_lineage, lineage } from "@prisma/client";
import { ActionFunction, json, redirect } from "@remix-run/node";
import { NavLink, useOutletContext } from "@remix-run/react";
import React, { useRef, useState } from "react";
import { TableHead } from "~/components/character-sheet/table-head";
import { TableData } from "~/components/character-sheet/table-data";
import { TableDropdown } from "~/components/character-sheet/table-dropdown";
import { useShowRow } from "~/components/context-providers/showRowContext";
import { submitCharLineages } from "~/utils/character.server";
import { SpecialFooter } from "~/components/special-footer";
import { GeneralExplain } from "~/components/explanations/general-explain";


export const action: ActionFunction = async ({ request, params }) => {
    const form = await request.formData();
    const selectedLineages = form.getAll('lineages') as string[];
    const selectedLineageIds = selectedLineages.map(id => parseInt(id))
    const pure = form.get('pure') === 'true';
    const characterId = params.id

    if (!selectedLineages || selectedLineages.length === 0) {
        return redirect(`/user/character/new/${characterId}/paths/`);
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
    const { characterId,
        lineages,
        character_lineages,
        maxSelectableLineages } =
        useOutletContext<{
            characterId: string,
            lineages: lineage[],
            character_lineages: (character_lineage & { lineage: lineage })[],
            maxSelectableLineages: number
        }>();

    const [selectedLineages, setSelectedLineages] = useState<number[]>([]);
    const [isPure, setPure] = useState<boolean>(false);

    const { showRow, isShown } = useShowRow();

    const confirmedPreviousLineageIds = character_lineages.map(cl => cl.lineage.id)

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
        if (character_lineages.length > 0) return;

        if (!selectedLineages && maxSelectableLineages != 0 || selectedLineages.length <= 0 && maxSelectableLineages != 0) {
            event.preventDefault();

            return alert(`Selecione pelo menos uma Linhagem.`);
        }
        return;
    }

    return (
        <>
            <h1 className="title-input title-container" style={{ position: 'sticky', top: '64px', backgroundColor: 'black' }}>
                Linhagens
                <button className="question-button" onClick={() => showRow("ELinhagem")}>?</button>
            </h1>

            <GeneralExplain
                title={'Linhagens'}
                description="Linhagens são sua descendência, sua origem. Geralmente representam a quais espécies ou raças você e os seus pais pertencem, mas existem exceções."
                isHidden={!isShown("ELinhagem")}
                onCancel={() => showRow("ELinhagem")}
            />

            <form method="post" onSubmit={handleSubmit}>
                <div className="container" style={{ position: 'sticky', top: '139px', backgroundColor: 'black', borderBottom: '1px solid gold' }}>
                    <h3 style={{ margin: '2px' }}>Você pode ter 1 ou 2 Linhagens</h3>
                    <h3 style={{ margin: '2px' }}>Ter apenas 1 Linhagem permite escolher Talentos Únicos</h3>
                </div>
                <table>
                    <TableHead
                        tableTitles={['Linhagem']}
                        onClick={() => showRow('TBLinhagem')}
                        open={isShown('TBLinhagem')}
                        error={false}
                    />

                    {lineages.map(ln => (
                        <React.Fragment key={ln.id}>
                            <TableData
                                key={ln.id}
                                tableData={
                                    !isPure && selectedLineages.includes(ln.id)
                                        || confirmedPreviousLineageIds.length > 1 && confirmedPreviousLineageIds.includes(ln.id)
                                        ? ['Meio ' + String(ln.name)]
                                        : [String(ln.name)]
                                }
                                show={isShown('TBLinhagem')}
                                onClick={selectedLineages.length < maxSelectableLineages || selectedLineages.includes(ln.id)
                                    ? () => handleLineageClick(Number(ln.id))
                                    : () => null}
                                selected={selectedLineages.includes(ln.id) || confirmedPreviousLineageIds.includes(ln.id)}
                                error={selectedLineages.length >= maxSelectableLineages && !selectedLineages.includes(ln.id) && !confirmedPreviousLineageIds.includes(ln.id)}
                            />
                            <TableDropdown
                                key={`Drop-${ln.id}`}
                                show={isShown('TBLinhagem') && selectedLineages.includes(ln.id) || isShown('TBLinhagem') && confirmedPreviousLineageIds.includes(ln.id)}
                                categories={[]}
                                subtitleIndexes={[]}
                                items={[String(ln.description)]}
                            />
                        </React.Fragment>
                    ))}

                </table >

                {selectedLineages.map(lineageId => (
                    <input type="hidden" key={lineageId} name="lineages" value={lineageId} />
                ))}

                <input type="hidden" key='pure' name="pure" value={isPure ? 'true' : 'false'} />
                <SpecialFooter
                    backBtnName={'Atributos'}
                    backLink={`/user/character/new/${characterId}/basic`}
                    advBtnName={confirmedPreviousLineageIds.length > 0
                        ? `Caminhos`
                        : 'Confirmar'}
                    advLink={
                        confirmedPreviousLineageIds.length > 0
                            ? `/user/character/new/${characterId}/paths/`
                            : null
                    }
                    showAdv={true}
                />
            </form>

        </>
    );
}
