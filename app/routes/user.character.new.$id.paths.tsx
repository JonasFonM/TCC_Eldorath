import { character, path } from "@prisma/client";
import { ActionFunction, json, redirect } from "@remix-run/node";
import { NavLink, useOutletContext } from "@remix-run/react";
import React, { useState } from "react";
import { TableHead } from "~/components/character-sheet/general-table";
import { TableData } from "~/components/character-sheet/general-table-data";
import { submitCharPaths } from "~/utils/character.server";

export const action: ActionFunction = async ({ request, params }) => {
    const form = await request.formData();
    const selectedPaths = form.getAll('paths') as string[];
    const pendingPaths = form.get('pendingPaths') as string;
    const selectedPathIds = selectedPaths.map(id => parseInt(id))
    const characterId = params.id

    if (!selectedPaths || selectedPaths.length === 0) {
        return json({ error: "You must select at least one path." }, { status: 400 });
    }
    try {
        await submitCharPaths(selectedPathIds, Number(characterId), Number(pendingPaths))
        return redirect(`/user/character/${characterId}/paths`)
    } catch (error) {
        console.error(error);
        return json({ error: "Failed to save paths." }, { status: 500 });
    }

}

export default function PathSelection() {
    const { paths, maxSelectablePaths, character, characterId } = useOutletContext<{ paths: path[], characterId: string, maxSelectablePaths: number, character: character }>();
    const [selectedPaths, setSelectedPaths] = useState<number[]>([]);
    const [error, setError] = useState<string | null>(null);

    const [show, setShow] = useState<number>();

    const tier1 = paths.filter(p => p.pathTier == 1);
    const tier2 = paths.filter(p => p.pathTier == 2);
    const tier3 = paths.filter(p => p.pathTier == 3);
    const tier4 = paths.filter(p => p.pathTier == 4);

    const showRow = (tier: number) => {
        show != tier ?
            setShow(() => {
                return tier;
            })
            :
            setShow(() => {
                return 0;
            })
    }

    const handlePathClick = (pathId: number, pathTier: number) => {
        setSelectedPaths((prevPaths) => {
            const isSelected = prevPaths.includes(pathId);

            const newSelectedPaths = isSelected
                ? prevPaths.filter(id => id !== pathId)
                : [...prevPaths, pathId];

            if (newSelectedPaths.length * pathTier > maxSelectablePaths) {
                setError("Você selecionou o máximo de caminhos.");
                return prevPaths;
            } else {
                setError(null);
            }

            return newSelectedPaths;
        });
    };

    const tableTitles = ["Caminho", "Vit", "Pod", "Tec", "Man", "Jur", "Tru", "Mag"]

    return (
        <>

            {maxSelectablePaths > 0 ?
                <>
                    <form method="post">

                        <h1 className="title-container">Escolha seu Caminho<NavLink to={`/user/character/${characterId}/paths`} style={{ color: 'red' }} className="question-button">X</NavLink></h1>

                        <h2 style={{ fontVariant: 'small-caps' }}>Caminhos Iniciantes</h2>

                        <table>
                            <tbody>
                                <TableHead tableTitles={tableTitles} onClick={() => showRow(1)} />

                                {tier1.map(p => (
                                    <React.Fragment key={p.id}>
                                        <TableData
                                            key={p.id}
                                            tableData={[p.name, String(p.vitality), String(p.power), String(p.addTechniques), String(p.addManeuvers), String(p.addOaths), String(p.addTricks), String(p.addMagics)]}
                                            show={show === (p.pathTier)}
                                            onClick={() => handlePathClick(p.id, 1)}
                                            selected={selectedPaths.includes(p.id)}

                                        />
                                    </React.Fragment>

                                ))
                                }
                            </tbody>
                        </table>


                        {character.tier >= 2 ?
                            <>
                                <h2 style={{ fontVariant: 'small-caps' }}>Caminhos Veteranos</h2>

                                <table>
                                    <tbody>

                                        <TableHead tableTitles={tableTitles} onClick={() => showRow(2)} />
                                        {tier2.map(p => (
                                            <React.Fragment key={p.id}>
                                                <TableData
                                                    key={p.id}
                                                    tableData={[p.name, String(p.vitality), String(p.power), String(p.addTechniques), String(p.addManeuvers), String(p.addOaths), String(p.addTricks), String(p.addMagics)]}
                                                    show={show === (p.pathTier)}
                                                    onClick={() => handlePathClick(p.id, 2)}
                                                    selected={selectedPaths.includes(p.id)}

                                                />
                                            </React.Fragment>
                                        ))
                                        }
                                    </tbody>

                                </table>

                            </>
                            : ''
                        }

                        {character.tier >= 3 ?
                            <>
                                <h2 style={{ fontVariant: 'small-caps' }}>Caminhos Mestres</h2>

                                <table>
                                    <tbody>

                                        <TableHead tableTitles={tableTitles} onClick={() => showRow(3)} />

                                        {tier3.map(p => (
                                            <React.Fragment key={p.id}>
                                                <TableData
                                                    key={p.id}
                                                    tableData={[p.name, String(p.vitality), String(p.power), String(p.addTechniques), String(p.addManeuvers), String(p.addOaths), String(p.addTricks), String(p.addMagics)]}
                                                    show={show === (p.pathTier)}
                                                    onClick={() => handlePathClick(p.id, 3)}
                                                    selected={selectedPaths.includes(p.id)}
                                                />
                                            </React.Fragment>
                                        ))
                                        }
                                    </tbody>

                                </table>
                            </>
                            : ''}

                        {character.tier >= 4 ?
                            <>
                                <h2 style={{ fontVariant: 'small-caps' }}>Caminhos Lendários</h2>

                                <table>
                                    <tbody>

                                        <TableHead tableTitles={tableTitles} onClick={() => showRow(4)} />

                                        {tier4.map(p => (
                                            <React.Fragment key={p.id}>
                                                <TableData
                                                    key={p.id}
                                                    tableData={[p.name, String(p.vitality), String(p.power), String(p.addTechniques), String(p.addManeuvers), String(p.addOaths), String(p.addTricks), String(p.addMagics)]}
                                                    show={show === (p.pathTier)}
                                                    onClick={() => handlePathClick(p.id, 4)}
                                                    selected={selectedPaths.includes(p.id)}

                                                />
                                            </React.Fragment>
                                        ))
                                        }
                                    </tbody>

                                </table>
                            </>
                            : ''
                        }

                        {selectedPaths.map(pathId => (
                            <input type="hidden" key={pathId} id={String(pathId)} name="paths" value={pathId} />
                        ))}
                        {error && <p>{error}</p>}

                        <input type="hidden" key={maxSelectablePaths} name="pendingPaths" value={maxSelectablePaths} />


                        <button type="submit" className="button">Confirmar</button>
                    </form>

                </>

                :

                <>
                    <h1 className="title-container">Você já escolheu um Caminho</h1>
                    <NavLink className='button' to={`/user/character/${characterId}/paths`}>Sair</NavLink>
                </>

            }



        </>
    );
}
