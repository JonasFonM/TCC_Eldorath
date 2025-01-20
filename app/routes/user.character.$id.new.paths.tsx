import { character, path } from "@prisma/client";
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { PathTableHead } from "~/components/character-sheet/path-table";
import { PathTableData } from "~/components/character-sheet/path-table-data";
import { requireUserId } from "~/utils/auth.server";
import { submitCharPaths } from "~/utils/character.server";
import { prisma } from "~/utils/prisma.server";

export const loader: LoaderFunction = async ({ request, params }) => {
    const userId = await requireUserId(request)
    const characterId = Number(params.id);

    const character = await prisma.character.findUnique({
        where: { id: characterId },
    });

    const paths = await prisma.path.findMany()

    const maxSelectable = character?.pendingPath

    return json({ userId, paths, maxSelectable, characterId, character });
}

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
        return redirect(`../../paths`)
    } catch (error) {
        console.error(error);
        return json({ error: "Failed to save paths." }, { status: 500 });
    }

}

export default function PathSelection() {
    const { paths, maxSelectable, character } = useLoaderData<{ paths: path[], characterId: string, maxSelectable: number, character: character }>();
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

    const handlePathClick = (pathId: number) => {
        setSelectedPaths((prevPaths) => {
            const isSelected = prevPaths.includes(pathId);

            const newSelectedPaths = isSelected
                ? prevPaths.filter(id => id !== pathId)
                : [...prevPaths, pathId];

            if (newSelectedPaths.length > maxSelectable) {
                setError("Você só pode selecionar 1 caminho por Categoria.");
                return prevPaths;
            } else {
                setError(null);
            }

            return newSelectedPaths;
        });
    };

    return (
        <>

            {maxSelectable > 0 ?
                <>
                    <form method="post">

                        <h1 className="title-container">Escolha seu Caminho<NavLink to={`../../paths`} style={{ color: 'red' }} className="question-button">X</NavLink></h1>

                        <h2 style={{ fontVariant: 'small-caps' }}>Caminhos Iniciantes</h2>

                        <table>

                            <PathTableHead onClick={() => showRow(1)} />

                            {tier1.map(p => (
                                <>
                                    <PathTableData
                                        key={p.id}
                                        path={p}
                                        show={show === (p.pathTier)}
                                        onClick={() => handlePathClick(p.id)}
                                        selected={selectedPaths.includes(p.id)}

                                    />
                                </>

                            ))
                            }

                        </table>


                        {character.tier >= 2 ?
                            <>
                                <h2 style={{ fontVariant: 'small-caps' }}>Caminhos Veteranos</h2>

                                <table>
                                    <PathTableHead onClick={() => showRow(2)} />
                                    {tier2.map(p => (
                                        <>
                                            <PathTableData
                                                key={p.id}
                                                path={p}
                                                show={show === (p.pathTier)}
                                                onClick={() => handlePathClick(p.id)}
                                                selected={selectedPaths.includes(p.id)}

                                            />
                                        </>
                                    ))
                                    }
                                </table>

                            </>
                            : ''
                        }

                        {character.tier >= 3 ?
                            <>
                                <h2 style={{ fontVariant: 'small-caps' }}>Caminhos Mestres</h2>

                                <table>

                                    <PathTableHead onClick={() => showRow(3)} />

                                    {tier3.map(p => (
                                        <>
                                            <PathTableData
                                                key={p.id}
                                                path={p}
                                                show={show === (p.pathTier)}
                                                onClick={() => handlePathClick(p.id)}
                                                selected={selectedPaths.includes(p.id)}
                                            />
                                        </>
                                    ))
                                    }
                                </table>
                            </>
                            : ''}

                        {character.tier >= 4 ?
                            <>
                                <h2 style={{ fontVariant: 'small-caps' }}>Caminhos Lendários</h2>

                                <table>

                                    <PathTableHead onClick={() => showRow(4)} />

                                    {tier4.map(p => (
                                        <>
                                            <PathTableData
                                                key={p.id}
                                                path={p}
                                                show={show === (p.pathTier)}
                                                onClick={() => handlePathClick(p.id)}
                                                selected={selectedPaths.includes(p.id)}

                                            />
                                        </>
                                    ))
                                    }
                                </table>
                            </>
                            : ''
                        }

                        {selectedPaths.map(pathId => (
                            <input type="hidden" key={pathId} id={String(pathId)} name="paths" value={pathId} />
                        ))}
                        {error && <p>{error}</p>}

                        <input type="hidden" key={maxSelectable} name="pendingPaths" value={maxSelectable} />


                        <button type="submit" className="button">Confirmar</button>
                    </form>

                </>

                :

                <>
                    <h1 className="title-container">Você já escolheu um Caminho</h1>
                    <NavLink className='button' to={`../../paths`}>Sair</NavLink>
                </>

            }



        </>
    );
}
