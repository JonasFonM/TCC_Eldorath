import { Link, NavLink, useOutletContext } from "@remix-run/react";
import { character, character_item, character_lineage, character_path, character_skill, item, lineage, path, skill } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { GeneralExplain } from "~/components/explanations/general-explain";
import React, { useState } from "react";
import { TableData } from "~/components/character-sheet/general-table-data";
import { TableHead } from "~/components/character-sheet/general-table";

export const loader: LoaderFunction = async ({ params }) => {
    const characterId = params.id;
    return (characterId)
}


export default function LineagesRoute() {
    const { characterId, character, character_lineages, character_paths, character_skills, character_items }
        = useOutletContext<{
            characterId: string,
            character: character,
            character_lineages: (character_lineage & { lineage: lineage })[],
            character_paths: (character_path & { path: path })[],
            character_skills: (character_skill & { skill: skill })[],
            character_items: (character_item & { item: item })[],
        }>();

    const [showLineage, setShowLineage] = useState<number>(-3);
    const [showPath, setShowPath] = useState<number>(-3);
    const [showSkill, setShowSkill] = useState<number>(-3);
    const [showItem, setShowItem] = useState<number>(-3);

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
                <tbody>
                    {character.agility + character.body + character.mind < 7
                        ? <tr className="error">
                            <td>
                                <NavLink to={`/user/character/new/${characterId}/basic/`}
                                    className={'lineBtn'}
                                    style={{ color: 'inherit' }}>Você precisa usar seus Pontos de Atributo</NavLink>
                            </td>
                        </tr>
                        : ''}

                    <TableHead
                        tableTitles={['Linhagens']}
                        onClick={showLineage != 0 ? () => setShowLineage(0) : () => setShowLineage(-3)}
                        open={showLineage > -3}
                    />

                    {character_lineages.length < 1
                        ? <tr className="error">
                            <td>
                                <NavLink to={`/user/character/new/${characterId}/lineages/`}
                                    className={'lineBtn'}
                                    style={{ color: 'inherit' }}>Você precisa de pelo menos 1 Linhagem</NavLink>
                            </td>
                        </tr>
                        : ''}

                    {character_lineages.map(ln => (
                        <React.Fragment key={ln.id}>
                            <TableData
                                key={String(ln.lineage.name) + ln.id}
                                tableData={ln.pure ? [String(ln.lineage.name) + ' Pura'] : [String(ln.lineage.name)]}
                                show={showLineage >= (0)}
                                onClick={() => setShowLineage(Number(ln.id))}
                                selected={false}
                            />
                        </React.Fragment>
                    ))}

                    <TableHead
                        tableTitles={['Caminhos']}
                        onClick={showPath != 0 ? () => setShowPath(0) : () => setShowPath(-3)}
                        open={showPath > -3}
                    />

                    {character_paths.length < 1
                        ? <tr className="error">
                            <td>
                                <NavLink to={`/user/character/new/${characterId}/paths/`}
                                    className={'lineBtn'}
                                    style={{ color: 'inherit' }}>Você precisa de pelo menos 1 Caminho</NavLink>
                            </td>
                        </tr>
                        : ''}

                    {character_paths.map(p => (
                        <React.Fragment key={p.id}>
                            <TableData
                                key={String(p.path.name) + p.id}
                                tableData={[String(p.path.name)]}
                                show={showPath >= (0)}
                                onClick={() => setShowPath(Number(p.id))}
                                selected={false}
                            />
                        </React.Fragment>
                    ))}

                    <TableHead
                        tableTitles={['Talentos']}
                        onClick={showSkill != 0 ? () => setShowSkill(0) : () => setShowSkill(-3)}
                        open={showSkill > -3}
                    />

                    {character_skills.length < 1
                        ? <tr className="error">
                            <td>
                                <NavLink to={`/user/character/new/${characterId}/skills/`}
                                    className={'lineBtn'}
                                    style={{ color: 'inherit' }}>Você precisa de pelo menos 1 Talento
                                </NavLink>
                            </td>
                        </tr>
                        : ''}

                    {character_skills.map(sk => (
                        <React.Fragment key={sk.id}>
                            <TableData
                                key={String(sk.skill.name) + sk.id}
                                tableData={[String(sk.skill.name)]}
                                show={showSkill >= (0)}
                                onClick={() => setShowSkill(Number(sk.id))}
                                selected={false}
                            />
                        </React.Fragment>
                    ))}

                    <TableHead
                        tableTitles={['Itens']}
                        onClick={showItem != 0 ? () => setShowItem(0) : () => setShowItem(-3)}
                        open={showItem > -3}
                    />


                    {character_items.map(it => (
                        <React.Fragment key={it.id}>
                            <TableData
                                key={String(it.item.name) + it.id}
                                tableData={[it.material
                                    ? String(it.item.name) + ' de ' + String(it.material)
                                    : String(it.item.name)]}
                                show={showItem >= (0)}
                                onClick={() => setShowItem(Number(it.id))}
                                selected={false}
                            />
                        </React.Fragment>
                    ))}

                </tbody>
            </table >

            {character_lineages.map(ln => (
                <React.Fragment key={ln.id}>
                    <GeneralExplain
                        title={String(ln.lineage.name)}
                        description={String(ln.lineage.description)}
                        isHidden={showLineage != Number(ln.id)}
                        onCancel={() => setShowLineage(0)}
                        style={'linear-gradient(to bottom right, white, gold)'}
                        color="black" />
                </React.Fragment>
            ))}

            {character_paths.map(p => (
                <React.Fragment key={p.id}>
                    <GeneralExplain
                        title={String(p.path.name)}
                        description={String(p.path.description)}
                        isHidden={showPath != Number(p.id)}
                        onCancel={() => setShowPath(0)}
                        style={'linear-gradient(to bottom right, white, gold)'}
                        color="black" />
                </React.Fragment>))}

            {character_skills.map(sk => (
                <React.Fragment key={sk.id}>
                    <GeneralExplain
                        title={String(sk.skill.name)}
                        description={String(sk.skill.description)}
                        isHidden={showSkill != Number(sk.id)}
                        onCancel={() => setShowSkill(0)}
                        style={'linear-gradient(to bottom right, white, gold)'}
                        color="black" />
                </React.Fragment>))}

            {character_items.map(it => (
                <React.Fragment key={it.id}>
                    <GeneralExplain
                        title={it.material
                            ? String(it.item.name) + ' de ' + String(it.material)
                            : String(it.item.name)}
                        description={String(it.item.description)}
                        isHidden={showItem != Number(it.id)}
                        onCancel={() => setShowItem(0)}
                        style={'linear-gradient(to bottom right, white, gold)'}
                        color="black" />
                </React.Fragment>))}

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
