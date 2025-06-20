import { character, character_item, item } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import React, { useRef, useState } from "react";
import { TableHead } from "~/components/character-sheet/table-head";
import { TableData } from "~/components/character-sheet/table-data";
import { TableDropdown } from "~/components/character-sheet/table-dropdown";
import { useShowRow } from "~/components/context-providers/showRowContext";
import { GeneralExplain } from "~/components/explanations/general-explain";

import { prisma } from "~/utils/prisma.server";

export const loader: LoaderFunction = async ({ request, params }) => {

    const referer = request.headers.get("Referer") || "/";

    const characterId = Number(params.id)

    const items = await prisma.character_item.findMany({
        where: {
            characterId: characterId
        },
        include: {
            item: true
        },
        orderBy: { item: { name: 'asc' } }
    })

    const equippedItems = items.filter(it => it.equipped > -1)
    const availableItems = items.filter(it => it.equipped === -1)

    return ({ items, equippedItems, availableItems, characterId, referer })
}

export default function InventoryRoute() {
    const { items, availableItems } = useLoaderData<{ items: (character_item & { item: item })[]; equippedItems: (character_item & { item: item })[]; availableItems: (character_item & { item: item })[] }>();
    const { character } = useOutletContext<{ character: character, isAuthor: boolean }>();
    const { showRow, isShown } = useShowRow();

    return (
        <React.Fragment>
            <div style={{ position: "sticky", top: '64px', zIndex: '1' }} className="title-input">
                <h1 className="title-container">
                    Inventário
                    <button className="question-button" onClick={() => showRow("EInventario")}>?</button>
                </h1>
            </div>

            <GeneralExplain
                title={'Inventário'}
                description="Seu Inventário é onde você pode conferir todos os Itens em sua posse. Eles são separados nos Tipos: Acessório, Armadura, Arma e Consumível."
                isHidden={!isShown("EInventario")}
                onCancel={() => showRow("EInventario")}
            />

            <table>
                <TableHead
                    tableTitles={['Acessórios']}
                    onClick={() => showRow("Acessorios")}
                    open={isShown("Acessorios")}
                    error={false}
                />

                {items.filter(it => it.item.type === 'slotAccessory').map((it, index, ci) => (
                    ci.findIndex(ci => ci.item.id === it.item.id) === index
                        ? < React.Fragment key={it.id} >
                            <TableData
                                key={`Data-${it.id}`}
                                tableData={[it.material
                                    ? String(it.item.name) + ' de ' + String(it.material) + ` (x${ci.filter(ci => ci.item.id === it.item.id).length})`
                                    : String(it.item.name) + ` (x${ci.filter(ci => ci.item.id === it.item.id).length})`]}
                                show={isShown("Acessorios")}
                                onClick={() => showRow(`Item-${it.id}`)}
                                selected={isShown(`Item-${it.id}`)}
                                error={false}
                            />
                            <TableDropdown
                                key={`Drop-${it.id}`}
                                show={isShown("Acessorios") && isShown(`Item-${it.id}`)}
                                categories={[String(it.item.subType)]}
                                subtitleIndexes={[0]}
                                items={[String(it.item.description)]}
                            />
                        </React.Fragment>
                        : null
                ))
                }
            </table >

            <table>
                <TableHead
                    tableTitles={['Armaduras']}
                    onClick={() => showRow("Armaduras")}
                    open={isShown("Armaduras")}
                    error={false}
                />

                {items.filter(it => it.item.type === 'slotArmor').map((it, index, ci) => (
                    ci.findIndex(ci => ci.item.id === it.item.id) === index
                        ? <React.Fragment key={it.id}>
                            <TableData
                                key={`Data-${it.id}`}
                                tableData={[it.material
                                    ? String(it.item.name) + ' de ' + String(it.material) + ` (x${ci.filter(ci => ci.item.id === it.item.id).length})`
                                    : String(it.item.name) + ` (x${ci.filter(ci => ci.item.id === it.item.id).length})`]}
                                show={isShown("Armaduras")}
                                onClick={() => showRow(`Item-${it.id}`)}
                                selected={isShown(`Item-${it.id}`)}
                                error={false}
                            />
                            <TableDropdown
                                key={`Drop-${it.id}`}
                                show={isShown("Armaduras") && isShown(`Item-${it.id}`)}
                                categories={[String(it.item.subType)]}
                                subtitleIndexes={[0]}
                                items={[String(it.item.description)]}
                            />
                        </React.Fragment>
                        : null
                ))}
            </table>

            <table>
                <TableHead
                    tableTitles={['Armas']}
                    onClick={() => showRow("Armas")}
                    open={isShown("Armas")}
                    error={false}
                />

                {items.filter(it => it.item.type === 'slotWeapon').map((it, index, ci) => (
                    ci.findIndex(ci => ci.item.id === it.item.id) === index
                        ? <React.Fragment key={it.id}>
                            <TableData
                                key={`Data-${it.id}`}
                                tableData={[it.material
                                    ? String(it.item.name) + ' de ' + String(it.material) + ` (x${ci.filter(ci => ci.item.id === it.item.id).length})`
                                    : String(it.item.name) + ` (x${ci.filter(ci => ci.item.id === it.item.id).length})`]}
                                show={isShown("Armas")}
                                onClick={() => showRow(`Item-${it.id}`)}
                                selected={isShown(`Item-${it.id}`)}
                                error={false}
                            />
                            <TableDropdown
                                key={`Drop-${it.id}`}
                                show={isShown("Armas") && isShown(`Item-${it.id}`)}
                                categories={[String(it.item.subType)]}
                                subtitleIndexes={[0]}
                                items={[String(it.item.description)]}
                            />
                        </React.Fragment>
                        : null
                ))}

            </table >

            <table>
                <TableHead
                    tableTitles={['Consumíveis']}
                    onClick={() => showRow("Consumiveis")}
                    open={isShown("Consumiveis")}
                    error={false}
                />

                {items.filter(it => it.item.type === 'consumable').map((it, index, ci) => (
                    ci.findIndex(ci => ci.item.id === it.item.id) === index
                        ? <React.Fragment key={it.id}>
                            <TableData
                                key={`Data-${it.id}`}
                                tableData={[it.material
                                    ? String(it.item.name) + ' de ' + String(it.material) + ` (x${ci.filter(ci => ci.item.id === it.item.id).length})`
                                    : String(it.item.name) + ` (x${ci.filter(ci => ci.item.id === it.item.id).length})`]}
                                show={isShown("Consumiveis")}
                                onClick={() => showRow(`Item-${it.id}`)}
                                selected={isShown(`Item-${it.id}`)}
                                error={false}
                            />
                            <TableDropdown
                                key={`Drop-${it.id}`}
                                show={isShown("Consumiveis") && isShown(`Item-${it.id}`)}
                                categories={[String(it.item.subType)]}
                                subtitleIndexes={[0]}
                                items={[String(it.item.description)]}
                            />
                        </React.Fragment>
                        : null
                ))}
            </table>
        </React.Fragment >
    );
}