import { character, character_path, path } from "@prisma/client";
import { ActionFunction, json, redirect } from "@remix-run/node";
import { Link, NavLink, useOutletContext } from "@remix-run/react";
import React, { useState } from "react";
import { TableHead } from "~/components/character-sheet/table-head";
import { TableData } from "~/components/character-sheet/table-data";
import { TableDropdown } from "~/components/character-sheet/table-dropdown";
import { useShowRow } from "~/components/context-providers/showRowContext";
import { submitCharPaths } from "~/utils/character.server";
import { SpecialFooter } from "~/components/special-footer";

export const action: ActionFunction = async ({ request, params }) => {
    const characterId = params.id
    const form = await request.formData();
    const selectedPaths = form.getAll('paths') as string[];
    const pendingPaths = form.get('pendingPaths') as string;
    const selectedTiers = form.get('selectedTiers') as string;
    const selectedPathIds = selectedPaths.map(id => parseInt(id))

    if (!selectedPaths || selectedPaths.length === 0) {
        return redirect(`/user/character/new/${characterId}/skills/`);
    }
    if (selectedPaths.length > 0) {
        try {
            await submitCharPaths(selectedPathIds, Number(characterId), Number(pendingPaths), Number(selectedTiers))
            return redirect(`/user/character/new/${characterId}/skills/`)
        } catch (error) {
            console.error(error);
            return json({ error: "Falha ao salvar Caminhos." }, { status: 500 });
        }
    }

}

export default function PathSelection() {
    const { paths, maxSelectablePaths, character, characterId, character_paths } = useOutletContext<{ paths: path[], characterId: string, maxSelectablePaths: number, character: character, character_paths: (character_path & { path: path })[] }>();
    const [selectedPaths, setSelectedPaths] = useState<number[]>([]);
    const [selectedTiers, setSelectedTiers] = useState<number[]>([]);
    const { showRow, isShown } = useShowRow();
    const charPathIds = character_paths.map(cPath => cPath.path.id)

    const isMaxSelected = selectedPaths.length >= maxSelectablePaths

    const tier1 = paths.filter(p => p.pathTier === 1);
    const tier2 = paths.filter(p => p.pathTier === 2);
    const tier3 = paths.filter(p => p.pathTier === 3);
    const tier4 = paths.filter(p => p.pathTier === 4);

    const chararcterPathTiers = character_paths.map(cPath => cPath.path.pathTier)
    const allTiers = [tier1, tier2, tier3, tier4]
    const tierTitles = ["Iniciante", "Veterano", "Mestre", "Lenda"]

    const handlePathClick = (pathId: number, pathTier: number) => {

        if (charPathIds.includes(pathId)) {
            return;
        }

        if (pathTier > character.tier) {
            return;
        }

        if ((chararcterPathTiers.includes(pathTier) && !selectedPaths.includes(pathId))
            || (selectedTiers.includes(pathTier) && !selectedPaths.includes(pathId))
        ) {
            return;
        }

        setSelectedPaths((prevPaths) => {
            const isSelected = prevPaths.includes(pathId);
            let newSelectedPaths;
            isSelected
                ? newSelectedPaths = prevPaths.filter(id => id !== pathId)
                : newSelectedPaths = [...prevPaths, pathId];
            return newSelectedPaths;
        });

        setSelectedTiers((prevTiers) => {
            const isSelected = prevTiers.includes(pathTier);
            let newSelectedTiers;
            isSelected
                ? newSelectedTiers = prevTiers.filter(id => id !== pathTier)
                : newSelectedTiers = [...prevTiers, pathTier];
            return newSelectedTiers;
        });

        return;
    };

    const handleSubmit = async (event: React.FormEvent) => {
        if (!selectedPaths || selectedPaths.length === 0 && maxSelectablePaths > 0) {
            event.preventDefault();
            return alert("Selecione pelo menos um Caminho.")
        }

    };

    return (
        <>
            <h1 className="title-input" style={{ position: 'sticky', top: '64px', backgroundColor: 'black' }}>Caminhos</h1>

            <form method="post" onSubmit={handleSubmit}>

                <div style={{ marginBottom: '120px' }}>

                    {allTiers.map((t, index) =>
                        <table key={"Tier" + index + 1}>
                            <TableHead
                                tableTitles={[tierTitles[index]]}
                                onClick={() => showRow(`Tier-${index + 1}`)}
                                open={isShown(`Tier-${index + 1}`) || chararcterPathTiers.includes(index + 1)}
                                error={character.tier < index + 1}
                            />
                            {chararcterPathTiers.includes(index + 1)
                                ? <tbody>
                                    <tr style={{ backgroundColor: 'black' }}>
                                        <td style={{ fontVariant: 'small-caps', fontWeight: 'bolder', color: 'gold' }}>Você já escolheu 1 Caminho desta Categoria</td>
                                    </tr>
                                </tbody>

                                : t.map(p => (
                                    <React.Fragment key={p.id}>
                                        <TableData
                                            key={p.id}
                                            tableData={[`${p.name}`]}
                                            show={isShown(`Tier-${p.pathTier}`)}
                                            onClick={() => handlePathClick(p.id, 1)}
                                            selected={selectedPaths.includes(p.id) || charPathIds.includes(p.id)}
                                            error={isMaxSelected && !selectedPaths.includes(p.id)}
                                        />
                                        <TableDropdown
                                            key={`Drop-${p.id}`}
                                            show={(selectedPaths.includes(p.id) || charPathIds.includes(p.id)) && isShown(`Tier-${p.pathTier}`)}
                                            categories={['Descrição', `Benefícios`]}
                                            subtitleIndexes={[0, 1]}
                                            items={[
                                                String(p.description),
                                                `Vitalidade: ${String(p.vitality)}`,
                                                `Poder: ${String(p.power)}`,
                                                `Manobras: ${String(p.addManeuvers)}`,
                                                `Magias: ${String(p.addMagics)}`
                                            ]}
                                        />
                                    </React.Fragment>
                                ))
                            }
                        </table>
                    )}

                    {selectedPaths.map(pathId => (
                        <input type="hidden" key={pathId} id={String(pathId)} name="paths" value={pathId} />
                    ))}

                    <input type="hidden" key={maxSelectablePaths} name="pendingPaths" value={maxSelectablePaths} />

                    {selectedPaths.map(sp =>
                        <input type="hidden" key={sp} name="selectedTiers" value={sp} />
                    )}

                </div>
                <SpecialFooter
                    backBtnName={'Linhagens'}
                    backLink={`/user/character/new/${characterId}/lineages`}
                    advBtnName="Talentos"
                    advLink={
                        charPathIds.length > 0
                            ? `/user/character/new/${characterId}/skills/`
                            : null
                    }
                    showAdv={true}
                />
            </form >
        </>

    );
}
