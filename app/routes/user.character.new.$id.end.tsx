import { Link, NavLink, useOutletContext } from "@remix-run/react";
import { character, character_item, character_lineage, character_path, character_skill, item, lineage, path, skill } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { GeneralExplain } from "~/components/explanations/general-explain";
import React, { useRef, useState } from "react";
import { TableData } from "~/components/character-sheet/table-data";
import { TableHead } from "~/components/character-sheet/table-head";
import { TableDropdown } from "~/components/character-sheet/table-dropdown";
import { SpecialFooter } from "~/components/special-footer";
import { ResetConfirm } from "~/components/character-sheet/reset-confirm";

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

    const baseLimit = character.npc === true
        ? 4
        : 6

    const attributeLimit = baseLimit + character.tier + (character.boss ? 8 : 0)

    const spentAllPoints = character.agility + character.body + character.mind >= attributeLimit

    const itemList = character_items.map(it => it.item)

    const stringShow = useRef<string[]>([]);

    const forceUpdate = useState(0)[1];

    const stringShowRow = (n: string) => {
        if (stringShow.current.includes(n)) {
            const newShow = stringShow.current.filter(ns => ns != n)
            stringShow.current = newShow
            return forceUpdate(n => n + 1);
        }
        stringShow.current.push(n);
        return forceUpdate(n => n + 1);
    }

    const [selectReset, setReset] = useState<number>(0);

    const showReset = () => {
        setReset(() => {
            return character.id;
        });
    };

    const cancelReset = () => {
        setReset(() => {
            return 0
        });
    };

    return (
        <>
            <h1 className="title-container title-input" style={{ position: 'sticky', top: '64px', backgroundColor: 'black' }}>
                Resumo Final
                <button id="reset" type="button" onClick={showReset} className="question-button">R</button>
            </h1>
            <ResetConfirm name={character.name} isHidden={selectReset === 0} onCancel={cancelReset} id={String(character.id)} />

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
                {!spentAllPoints
                    ? <thead>
                        <tr className="error">
                            <td>
                                <NavLink to={`/user/character/new/${characterId}/basic/`}
                                    className={'lineBtn'}
                                    style={{ color: 'inherit' }}>Você precisa usar seus Pontos de Atributo: {attributeLimit}</NavLink>
                            </td>
                        </tr>
                    </thead>
                    : ''
                }

                <TableHead
                    tableTitles={['Linhagens']}
                    onClick={() => stringShowRow("L")}
                    open={stringShow.current.includes("L")}
                    error={character_lineages.length < 1}
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
                                tableData={ln.pure ? [String(ln.lineage.name)] : ['Meio ' + String(ln.lineage.name)]}
                                show={stringShow.current.includes("L")}
                                onClick={() => stringShowRow(`L${ln.id}`)}
                                selected={stringShow.current.includes(`L${ln.id}`)}
                                error={false}
                            />
                            <TableDropdown
                                key={`Drop-${ln.id}`}
                                show={stringShow.current.includes("L") && stringShow.current.includes(`L${ln.id}`)}
                                categories={[]}
                                subtitleIndexes={[]}
                                items={[String(ln.lineage.description)]}
                            />
                        </React.Fragment>
                    ))
                }

                <TableHead
                    tableTitles={['Caminhos']}
                    onClick={() => stringShowRow("C")}
                    open={stringShow.current.includes("C")}
                    error={character_paths.length < 1}
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
                                show={stringShow.current.includes("C")}
                                onClick={() => stringShowRow(`C${p.id}`)}
                                selected={stringShow.current.includes(`C${p.id}`)}
                                error={false}
                            />
                            <TableDropdown
                                key={`Drop-${p.id}`}
                                show={stringShow.current.includes("C") && stringShow.current.includes(`C${p.id}`)}
                                categories={['', `Benefícios`]}
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
                    onClick={() => stringShowRow(`T`)}
                    open={stringShow.current.includes(`T`)}
                    error={character_skills.length < 1}
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
                                show={stringShow.current.includes(`T`)}
                                onClick={() => stringShowRow(`T${sk.id}`)}
                                selected={stringShow.current.includes(`T${sk.id}`)}
                                error={false}
                            />
                            <TableDropdown
                                key={`Drop-${sk.id}`}
                                show={stringShow.current.includes(`T`) && stringShow.current.includes(`T${sk.id}`)}
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
                    onClick={() => stringShowRow(`I`)}
                    open={stringShow.current.includes(`I`)}
                    error={false}
                />

                {character_items.map((it, index, ci) => (
                    ci.findIndex(ci => ci.item.id === it.item.id) === index
                        ? <React.Fragment key={it.id}>
                            <TableData
                                key={String(it.item.name) + it.id}
                                tableData={[it.material
                                    ? String(it.item.name) + ' de ' + String(it.material) + ` (x${ci.filter(ci => ci.item.id === it.item.id).length})`
                                    : String(it.item.name) + ` (x${ci.filter(ci => ci.item.id === it.item.id).length})`]}
                                show={stringShow.current.includes(`I`)}
                                onClick={() => stringShowRow(`I${it.id}`)}
                                selected={stringShow.current.includes(`I${it.id}`)}
                                error={false}
                            />
                            <TableDropdown
                                key={`Drop-${it.id}`}
                                show={stringShow.current.includes("I") && stringShow.current.includes(`I${it.id}`)}
                                categories={[`${it.cost} DK`]}
                                subtitleIndexes={[0]}
                                items={[String(it.item.description)]}
                            />
                        </React.Fragment>
                        : null
                ))}

            </table >

            <SpecialFooter
                backBtnName={'Itens'}
                backLink={`/user/character/new/${characterId}/inventory/`}
                advBtnName={`Finalizar`}
                advLink={`/pathstats/character/${characterId}/`}
                showAdv={spentAllPoints && character_skills.length > 0 && character_paths.length > 0 && character_lineages.length > 0}
            />

        </>
    )
}
