import { character, path } from "@prisma/client";
import { ActionFunction, json, redirect } from "@remix-run/node";
import { NavLink, useOutletContext } from "@remix-run/react";
import React, { useRef, useState } from "react";
import { TableHead } from "~/components/character-sheet/table-head";
import { TableData } from "~/components/character-sheet/table-data";
import { TableDropdown } from "~/components/character-sheet/table-dropdown";
import { useShowRow } from "~/components/context-providers/showRowContext";
import { submitCharPaths } from "~/utils/character.server";

export const action: ActionFunction = async ({ request, params }) => {
    const form = await request.formData();
    const selectedPaths = form.getAll('paths') as string[];
    const pendingPaths = form.get('pendingPaths') as string;
    const selectedPathIds = selectedPaths.map(id => parseInt(id))
    const characterId = params.id

    if (!selectedPaths || selectedPaths.length === 0) {
        return json({ error: "Você não selecionou um Caminho!" }, { status: 400 });
    }
    try {
        await submitCharPaths(selectedPathIds, Number(characterId), Number(pendingPaths))
        return redirect(`/user/character/new/${characterId}/skills/`)
    } catch (error) {
        console.error(error);
        return json({ error: "Falha ao salvar Caminhos." }, { status: 500 });
    }

}

export default function PathSelection() {
    const { paths, maxSelectablePaths, character, characterId } = useOutletContext<{ paths: path[], characterId: string, maxSelectablePaths: number, character: character }>();
    const [selectedPaths, setSelectedPaths] = useState<number[]>([]);

    const { showRow, isShown } = useShowRow();



    const tier1 = paths.filter(p => p.pathTier == 1);
    const tier2 = paths.filter(p => p.pathTier == 2);
    const tier3 = paths.filter(p => p.pathTier == 3);
    const tier4 = paths.filter(p => p.pathTier == 4);



    const handlePathClick = (pathId: number, pathTier: number) => {
        setSelectedPaths((prevPaths) => {
            const isSelected = prevPaths.includes(pathId);

            const newSelectedPaths = isSelected
                ? prevPaths.filter(id => id !== pathId)
                : [...prevPaths, pathId];

            return newSelectedPaths;
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {
        if (!selectedPaths || selectedPaths.length === 0) {
            event.preventDefault();
            return alert("Selecione pelo menos um Caminho.")
        }

    };

    return (
        <>
            <h1>Caminhos</h1>
            {maxSelectablePaths > 0 ?
                <>
                    <form method="post" onSubmit={handleSubmit}>

                        <h2>Escolha seu Caminho</h2>

                        <table>
                            <TableHead
                                tableTitles={["Iniciante"]}
                                onClick={() => showRow(1)}
                                open={isShown(1)}
                            />
                            {tier1.map(p => (
                                <React.Fragment key={p.id}>

                                    {//       <tbody className={!isMaxSelected || selectedPaths.includes(p.id) ? '' : 'error'}>
                                    }
                                    <TableData
                                        key={p.id}
                                        tableData={[`${p.name}`]}
                                        show={isShown(p.pathTier)}
                                        onClick={selectedPaths.length < maxSelectablePaths || selectedPaths.includes(p.id)
                                            ? () => handlePathClick(p.id, 1)
                                            : () => null}
                                        selected={selectedPaths.includes(p.id)}
                                    />
                                    <TableDropdown
                                        key={`Drop-${p.id}`}
                                        show={isShown(p.pathTier) && selectedPaths.includes(p.id)}
                                        categories={[`Benefícios`]}
                                        subtitleIndexes={[1]}
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

                        {character.tier >= 2 ?
                            <table>
                                <TableHead
                                    tableTitles={['Veterano']}
                                    onClick={() => showRow(2)}
                                    open={isShown(2)}
                                />
                                {tier2.map(p => (
                                    <React.Fragment key={p.id}>
                                        <TableData
                                            key={p.id}
                                            tableData={[`${p.name}`]}
                                            show={isShown(p.pathTier) && (selectedPaths.includes(p.id) || selectedPaths.length === 0)}
                                            onClick={selectedPaths.length < maxSelectablePaths || selectedPaths.includes(p.id)
                                                ? () => handlePathClick(p.id, 1)
                                                : () => null}
                                            selected={selectedPaths.includes(p.id)}
                                        />
                                        <TableDropdown
                                            key={`Drop-${p.id}`}
                                            show={isShown(p.pathTier) && selectedPaths.includes(p.id)}
                                            categories={[`Benefícios`]}
                                            subtitleIndexes={[1]}
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
                            : ''
                        }

                        {character.tier >= 3 ?
                            <table>
                                <TableHead
                                    tableTitles={['Mestre']}
                                    onClick={() => showRow(3)}
                                    open={isShown(3)}
                                />
                                {tier3.map(p => (
                                    <React.Fragment key={p.id}>
                                        <TableData
                                            key={p.id}
                                            tableData={[`${p.name}`]}
                                            show={isShown(p.pathTier) && (selectedPaths.includes(p.id) || selectedPaths.length === 0)}
                                            onClick={selectedPaths.length < maxSelectablePaths || selectedPaths.includes(p.id)
                                                ? () => handlePathClick(p.id, 1)
                                                : () => alert("Você não pode escolher mais Caminhos.")}
                                            selected={selectedPaths.includes(p.id)}
                                        />
                                        <TableDropdown
                                            key={`Drop-${p.id}`}
                                            show={isShown(p.pathTier) && selectedPaths.includes(p.id)}
                                            categories={[`Benefícios`]}
                                            subtitleIndexes={[1]}
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
                            : ''}

                        {character.tier >= 4 ?
                            <table>
                                <TableHead
                                    tableTitles={['Lenda']}
                                    onClick={() => showRow(4)}
                                    open={isShown(4)}
                                />

                                {tier4.map(p => (
                                    <React.Fragment key={p.id}>
                                        <TableData
                                            key={p.id}
                                            tableData={[`${p.name}`]}
                                            show={isShown(p.pathTier) && (selectedPaths.includes(p.id) || selectedPaths.length === 0)}
                                            onClick={selectedPaths.length < maxSelectablePaths || selectedPaths.includes(p.id)
                                                ? () => handlePathClick(p.id, 1)
                                                : () => alert("Você não pode escolher mais Caminhos.")}
                                            selected={selectedPaths.includes(p.id)}
                                        />
                                        <TableDropdown
                                            key={`Drop-${p.id}`}
                                            show={isShown(p.pathTier) && selectedPaths.includes(p.id)}
                                            categories={[`Benefícios`]}
                                            subtitleIndexes={[1]}
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
                            : ''
                        }

                        {selectedPaths.map(pathId => (
                            <input type="hidden" key={pathId} id={String(pathId)} name="paths" value={pathId} />
                        ))}

                        <input type="hidden" key={maxSelectablePaths} name="pendingPaths" value={maxSelectablePaths} />

                        <button type="submit" className="button">Próximo</button>
                    </form>

                </>

                :

                <>
                    <h2>Você já escolheu um Caminho</h2>
                    <NavLink className='button' to={`/user/character/new/${characterId}/skills/`}>Talentos</NavLink>
                </>

            }

        </>
    );
}
