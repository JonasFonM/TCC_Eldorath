import { Link, NavLink, useOutletContext } from "@remix-run/react";
import { character, character_item, character_lineage, character_path, character_skill, item, lineage, path, skill } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { GeneralExplain } from "~/components/explanations/general-explain";
import React, { useRef, useState } from "react";
import { TableData } from "~/components/character-sheet/general-table-data";
import { TableHead } from "~/components/character-sheet/general-table";
import { TableDropdown } from "~/components/character-sheet/table-dropdown";

export const loader: LoaderFunction = async ({ params }) => {
    const characterId = params.id;
    return (characterId)
}


export default function LineagesRoute() {
    const { characterId, character, character_lineages, character_paths, character_skills, character_items, skills }
        = useOutletContext<{
            characterId: string,
            character: character,
            character_lineages: (character_lineage & { lineage: lineage })[],
            character_paths: (character_path & { path: path })[],
            character_skills: (character_skill & { skill: skill })[],
            character_items: (character_item & { item: item })[],
            skills: skill[];
        }>();

    const show = useRef<string[]>([]); // Avoid re-renders

    const forceUpdate = useState(0)[1]; // Trigger minimal re-renders when necessary

    const showRow = (n: string) => {
        if (show.current.includes(n)) {
            const newShow = show.current.filter(ns => ns != n)
            show.current = newShow
            return forceUpdate(n => n + 1);
        }
        show.current.push(n);
        return forceUpdate(n => n + 1);
    }

    return (
        <>
            <h1 style={{ marginTop: '0', marginBottom: '0', padding: '0' }}>Resumo Final</h1>
            <h2>Suas Escolhas</h2>

            <table>
                <thead>
                    <tr>
                        <th style={{ width: '33.3%' }}>AGI</th>
                        <th style={{ width: '33.3%' }}>COR</th>
                        <th style={{ width: '33.3%' }}>MEN</th>
                    </tr>
                    <tr>
                        <td style={{ width: '33.3%' }}>{character.agility}</td>
                        <td style={{ width: '33.3%' }}>{character.body}</td>
                        <td style={{ width: '33.3%' }}>{character.mind}</td>
                    </tr>
                </thead>
            </table>

            <table>
                {character.agility + character.body + character.mind < 7
                    ? <tbody>
                        <tr className="error">
                            <td>
                                <NavLink to={`/user/character/new/${characterId}/basic/`}
                                    className={'lineBtn'}
                                    style={{ color: 'inherit' }}>Você precisa usar seus Pontos de Atributo</NavLink>
                            </td>
                        </tr>
                    </tbody>
                    : ''
                }

                <TableHead
                    tableTitles={['Linhagens']}
                    onClick={() => showRow("L")}
                    open={show.current.includes("L")}
                />
                {character_lineages.length < 1
                    ? <tbody>
                        <tr className="error">
                            <td>
                                <NavLink to={`/user/character/new/${characterId}/lineages/`}
                                    className={'lineBtn'}
                                    style={{ color: 'inherit' }}>Você precisa de pelo menos 1 Linhagem</NavLink>
                            </td>
                        </tr>
                    </tbody>
                    : character_lineages.map(ln => (
                        <React.Fragment key={ln.id}>
                            <TableData
                                key={String(ln.lineage.name) + ln.id}
                                tableData={ln.pure ? [String(ln.lineage.name) + ' Pura'] : [String(ln.lineage.name)]}
                                show={show.current.includes("L")}
                                onClick={() => showRow(`L${ln.id}`)}
                                selected={show.current.includes(`L${ln.id}`)}
                            />
                            <TableDropdown
                                key={`Drop-${ln.id}`}
                                show={show.current.includes("L") && show.current.includes(`L${ln.id}`)}
                                categories={[]}
                                subtitleIndexes={[]}
                                items={[String(ln.lineage.description)]}
                            />
                        </React.Fragment>
                    ))
                }

                <TableHead
                    tableTitles={['Caminhos']}
                    onClick={() => showRow("C")}
                    open={show.current.includes("C")}
                />
                {character_paths.length < 1
                    ? <tbody>
                        <tr className="error">
                            <td>
                                <NavLink to={`/user/character/new/${characterId}/paths/`}
                                    className={'lineBtn'}
                                    style={{ color: 'inherit' }}>Você precisa de pelo menos 1 Caminho</NavLink>
                            </td>
                        </tr>
                    </tbody>
                    : character_paths.map(p => (
                        <React.Fragment key={p.id}>
                            <TableData
                                key={String(p.path.name) + p.id}
                                tableData={[String(p.path.name)]}
                                show={show.current.includes("C")}
                                onClick={() => showRow(`C${p.id}`)}
                                selected={show.current.includes(`C${p.id}`)}
                            />
                            <TableDropdown
                                key={`Drop-${p.id}`}
                                show={show.current.includes("C") && show.current.includes(`C${p.id}`)}
                                categories={[`Benefícios`]}
                                subtitleIndexes={[1]}
                                items={[
                                    String(p.path.description),
                                    `Vitalidade: ${String(p.path.vitality)}`,
                                    `Poder: ${String(p.path.power)}`,
                                    `Manobras: ${String(p.path.addManeuvers)}`,
                                    `Magias: ${String(p.path.addMagics)}`
                                ]}
                            />
                        </React.Fragment>
                    ))
                }

                <TableHead
                    tableTitles={['Talentos']}
                    onClick={() => showRow(`T`)}
                    open={show.current.includes(`T`)}
                />
                {character_skills.length < 1
                    ? <tbody>
                        <tr className="error">
                            <td>
                                <NavLink to={`/user/character/new/${characterId}/skills/`}
                                    className={'lineBtn'}
                                    style={{ color: 'inherit' }}>
                                    Você precisa de pelo menos 1 Talento
                                </NavLink>

                            </td>
                        </tr>
                    </tbody>
                    : character_skills.map(sk => (
                        <React.Fragment key={sk.id}>
                            <TableData
                                key={String(sk.skill.name) + sk.id}
                                tableData={[String(sk.skill.name)]}
                                show={show.current.includes(`T`)}
                                onClick={() => showRow(`T${sk.id}`)}
                                selected={show.current.includes(`T${sk.id}`)}
                            />
                            <TableDropdown
                                key={`Drop-${sk.id}`}
                                show={show.current.includes(`T`) && show.current.includes(`T${sk.id}`)}
                                categories={["", "Tipo", "Requisitos"]}
                                subtitleIndexes={[1, 2]}
                                items={[
                                    String(sk.skill.description),
                                    String(sk.skill.type),
                                    `Agilidade: ${String(sk.skill.agi)} | Corpo: ${String(sk.skill.bdy)} 
                                    | Mente: ${String(sk.skill.mnd)} 
                                    | Nível: ${String(sk.skill.lvl)} 
                                    | Tamanho Real: ${String(sk.skill.trSiz)}
                                    | Tamanho Efetivo: ${String(sk.skill.efSiz)} 
                                    | ${sk.skill.prerequisiteId
                                        ? `Talento: ${String(skills.filter(s => s.id === sk.skill.prerequisiteId).map(s => s.name))}`
                                        : `Não Requer outro Talento`}`]}
                            />
                        </React.Fragment>
                    ))
                }

                <TableHead
                    tableTitles={['Itens']}
                    onClick={() => showRow(`I`)}
                    open={show.current.includes(`I`)}
                />
                {character_items.map(it => (
                    <React.Fragment key={it.id}>
                        <TableData
                            key={String(it.item.name) + it.id}
                            tableData={[it.material
                                ? String(it.item.name) + ' de ' + String(it.material)
                                : String(it.item.name)]}
                            show={show.current.includes(`I`)}
                            onClick={() => showRow(`I${it.id}`)}
                            selected={show.current.includes(`I${it.id}`)}
                        />
                        <TableDropdown
                            key={`Drop-${it.id}`}
                            show={show.current.includes("I") && show.current.includes(`I${it.id}`)}
                            categories={[]}
                            subtitleIndexes={[]}
                            items={[String(it.item.description)]}
                        />
                    </React.Fragment>
                ))}

            </table >

            <div className="col-6">
                {character.level === 1 && character.experience === 0
                    ? <Link to={`/user/character/${characterId}/reset/`} className="button" style={{ width: '60%' }}>Recomeçar</Link>
                    : <div style={{ visibility: 'hidden' }}>Hi</div>
                }
            </div>

            <div className="col-6">
                {character.agility + character.body + character.mind >= 7 && character_skills.length > 0 && character_paths.length > 0 && character_lineages.length > 0
                    ? <Link to={`/user/character/${characterId}/stats/`} className="button" style={{ width: '60%' }}>Finalizar</Link>
                    : <div style={{ visibility: 'hidden' }}>Hi</div>
                }
            </div>
        </>
    )
}
