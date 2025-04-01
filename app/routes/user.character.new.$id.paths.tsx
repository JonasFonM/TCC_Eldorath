import { character, path } from "@prisma/client";
import { ActionFunction, json, redirect } from "@remix-run/node";
import { NavLink, useOutletContext } from "@remix-run/react";
import React, { useRef, useState } from "react";
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
    const isMaxSelected = selectedPaths.length >= maxSelectablePaths;

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
                            <thead>
                                <TableHead
                                    tableTitles={["Iniciante"]}
                                    onClick={() => showRow(1)}
                                    open={show.current.includes(1)}
                                />
                            </thead>
                            {tier1.map(p => (
                                <React.Fragment key={p.id}>
                                    <tbody className={!isMaxSelected || selectedPaths.includes(p.id) ? '' : 'error'}>
                                        <TableData
                                            key={p.id}
                                            tableData={[`${p.name}`]}
                                            show={show.current.includes(p.pathTier)}
                                            onClick={selectedPaths.length < maxSelectablePaths || selectedPaths.includes(p.id)
                                                ? () => handlePathClick(p.id, 1)
                                                : () => null}
                                            selected={selectedPaths.includes(p.id)}
                                        />

                                    </tbody>
                                    <tbody style={{ display: selectedPaths.includes(p.id) && show.current.includes(p.pathTier) ? '' : 'none', width: '100%' }} className="table-extension">
                                        <tr><th>Benefícios</th></tr>
                                        <tr><td>Vitalidade: {String(p.vitality)}</td></tr>
                                        <tr><td>Poder: {String(p.power)}</td></tr>
                                        <tr><td>Técnicas: {String(p.addTechniques)}</td></tr>
                                        <tr><td>Manobras: {String(p.addManeuvers)}</td></tr>
                                        <tr><td>Juramentos: {String(p.addOaths)}</td></tr>
                                        <tr><td>Truques: {String(p.addTricks)}</td></tr>
                                        <tr><td>Mágicas: {String(p.addMagics)}</td></tr>
                                    </tbody>
                                </React.Fragment>
                            ))
                            }
                        </table>


                        {character.tier >= 2 ?
                            <>
                                <table>
                                    <tbody>
                                        <TableHead
                                            tableTitles={['Veterano']}
                                            onClick={() => showRow(2)}
                                            open={show.current.includes(2)}
                                        />

                                        {tier2.map(p => (
                                            <React.Fragment key={p.id}>
                                                <tbody className={!isMaxSelected || selectedPaths.includes(p.id) ? '' : 'error'}>
                                                    <TableData
                                                        key={p.id}
                                                        tableData={[`${p.name}`]}
                                                        show={show.current.includes(p.pathTier) && (selectedPaths.includes(p.id) || selectedPaths.length === 0)}
                                                        onClick={selectedPaths.length < maxSelectablePaths || selectedPaths.includes(p.id)
                                                            ? () => handlePathClick(p.id, 1)
                                                            : () => null}
                                                        selected={selectedPaths.includes(p.id)}
                                                    />

                                                </tbody>
                                                <tbody style={{ display: selectedPaths.includes(p.id) && show.current.includes(p.pathTier) ? '' : 'none', width: '100%' }} className="table-extension">
                                                    <tr><th>Benefícios</th></tr>
                                                    <tr><td>Vitalidade: {String(p.vitality)}</td></tr>
                                                    <tr><td>Poder: {String(p.power)}</td></tr>
                                                    <tr><td>Técnicas: {String(p.addTechniques)}</td></tr>
                                                    <tr><td>Manobras: {String(p.addManeuvers)}</td></tr>
                                                    <tr><td>Juramentos: {String(p.addOaths)}</td></tr>
                                                    <tr><td>Truques: {String(p.addTricks)}</td></tr>
                                                    <tr><td>Mágicas: {String(p.addMagics)}</td></tr>
                                                </tbody>
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
                                <table>
                                    <tbody>

                                        <TableHead
                                            tableTitles={['Mestre']}
                                            onClick={() => showRow(3)}
                                            open={show.current.includes(3)}
                                        />

                                        {tier3.map(p => (
                                            <React.Fragment key={p.id}>
                                                <tbody className={!isMaxSelected || selectedPaths.includes(p.id) ? '' : 'error'}>
                                                    <TableData
                                                        key={p.id}
                                                        tableData={[`${p.name}`]}
                                                        show={show.current.includes(p.pathTier) && (selectedPaths.includes(p.id) || selectedPaths.length === 0)}
                                                        onClick={selectedPaths.length < maxSelectablePaths || selectedPaths.includes(p.id)
                                                            ? () => handlePathClick(p.id, 1)
                                                            : () => alert("Você não pode escolher mais Caminhos.")}
                                                        selected={selectedPaths.includes(p.id)}
                                                    />

                                                </tbody>
                                                <tbody style={{ display: selectedPaths.includes(p.id) && show.current.includes(p.pathTier) ? '' : 'none', width: '100%' }} className="table-extension">
                                                    <tr><th>Benefícios</th></tr>
                                                    <tr><td>Vitalidade: {String(p.vitality)}</td></tr>
                                                    <tr><td>Poder: {String(p.power)}</td></tr>
                                                    <tr><td>Técnicas: {String(p.addTechniques)}</td></tr>
                                                    <tr><td>Manobras: {String(p.addManeuvers)}</td></tr>
                                                    <tr><td>Juramentos: {String(p.addOaths)}</td></tr>
                                                    <tr><td>Truques: {String(p.addTricks)}</td></tr>
                                                    <tr><td>Mágicas: {String(p.addMagics)}</td></tr>
                                                </tbody>
                                            </React.Fragment>
                                        ))
                                        }
                                    </tbody>

                                </table>
                            </>
                            : ''}

                        {character.tier >= 4 ?
                            <>
                                <table>
                                    <tbody>
                                        <TableHead
                                            tableTitles={['Lenda']}
                                            onClick={() => showRow(4)}
                                            open={show.current.includes(4)}
                                        />

                                        {tier4.map(p => (
                                            <React.Fragment key={p.id}>
                                                <tbody className={!isMaxSelected || selectedPaths.includes(p.id) ? '' : 'error'}>
                                                    <TableData
                                                        key={p.id}
                                                        tableData={[`${p.name}`]}
                                                        show={show.current.includes(p.pathTier) && (selectedPaths.includes(p.id) || selectedPaths.length === 0)}
                                                        onClick={selectedPaths.length < maxSelectablePaths || selectedPaths.includes(p.id)
                                                            ? () => handlePathClick(p.id, 1)
                                                            : () => alert("Você não pode escolher mais Caminhos.")}
                                                        selected={selectedPaths.includes(p.id)}
                                                    />

                                                </tbody>
                                                <tbody style={{ display: selectedPaths.includes(p.id) && show.current.includes(p.pathTier) ? '' : 'none', width: '100%' }} className="table-extension">
                                                    <tr><th>Benefícios</th></tr>
                                                    <tr><td>Vitalidade: {String(p.vitality)}</td></tr>
                                                    <tr><td>Poder: {String(p.power)}</td></tr>
                                                    <tr><td>Técnicas: {String(p.addTechniques)}</td></tr>
                                                    <tr><td>Manobras: {String(p.addManeuvers)}</td></tr>
                                                    <tr><td>Juramentos: {String(p.addOaths)}</td></tr>
                                                    <tr><td>Truques: {String(p.addTricks)}</td></tr>
                                                    <tr><td>Mágicas: {String(p.addMagics)}</td></tr>
                                                </tbody>
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
