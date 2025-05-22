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
            <h1 className="title-container">Inventário</h1>

            <table>
                <TableHead
                    tableTitles={['Acessórios']}
                    onClick={() => showRow("Acessorios")}
                    open={isShown("Acessorios")}
                    error={false}
                />

                {items.filter(i => i.item.type === 'slotAccessory').map(i => (
                    <React.Fragment key={i.id}>
                        <TableData
                            key={`Data-${i.id}`}
                            tableData={[i.material
                                ? String(i.item.name) + ' de ' + String(i.material)
                                : String(i.item.name)]}
                            show={isShown("Acessorios")}
                            onClick={() => showRow(`Item-${i.id}`)}
                            selected={isShown(`Item-${i.id}`)}
                            error={false}
                        />
                        <TableDropdown
                            key={`Drop-${i.id}`}
                            show={isShown("Acessorios") && isShown(`Item-${i.id}`)}
                            categories={[String(i.item.subType)]}
                            subtitleIndexes={[0]}
                            items={[String(i.item.description)]}
                        />
                    </React.Fragment>
                ))}
            </table>

            <table>
                <TableHead
                    tableTitles={['Armaduras']}
                    onClick={() => showRow("Armaduras")}
                    open={isShown("Armaduras")}
                    error={false}
                />

                {items.filter(i => i.item.type === 'slotArmor').map(i => (
                    <React.Fragment key={i.id}>
                        <TableData
                            key={`Data-${i.id}`}
                            tableData={[i.material
                                ? String(i.item.name) + ' de ' + String(i.material)
                                : String(i.item.name)]}
                            show={isShown("Armaduras")}
                            onClick={() => showRow(`Item-${i.id}`)}
                            selected={isShown(`Item-${i.id}`)}
                            error={false}
                        />
                        <TableDropdown
                            key={`Drop-${i.id}`}
                            show={isShown("Armaduras") && isShown(`Item-${i.id}`)}
                            categories={[String(i.item.subType)]}
                            subtitleIndexes={[0]}
                            items={[String(i.item.description)]}
                        />
                    </React.Fragment>
                ))}
            </table>

            <table>
                <TableHead
                    tableTitles={['Armas']}
                    onClick={() => showRow("Armas")}
                    open={isShown("Armas")}
                    error={false}
                />

                {items.filter(i => i.item.type === 'slotWeapon').map(i => (
                    <React.Fragment key={i.id}>
                        <TableData
                            key={`Data-${i.id}`}
                            tableData={[i.material
                                ? String(i.item.name) + ' de ' + String(i.material)
                                : String(i.item.name)]}
                            show={isShown("Armas")}
                            onClick={() => showRow(`Item-${i.id}`)}
                            selected={isShown(`Item-${i.id}`)}
                            error={false}
                        />
                        <TableDropdown
                            key={`Drop-${i.id}`}
                            show={isShown("Armas") && isShown(`Item-${i.id}`)}
                            categories={[String(i.item.subType)]}
                            subtitleIndexes={[0]}
                            items={[String(i.item.description)]}
                        />
                    </React.Fragment>
                ))}

            </table >

            <table>
                <TableHead
                    tableTitles={['Consumíveis']}
                    onClick={() => showRow("Consumiveis")}
                    open={isShown("Consumiveis")}
                    error={false}
                />

                {items.filter(i => i.item.type === 'consumable').map(i => (
                    <React.Fragment key={i.id}>
                        <TableData
                            key={`Data-${i.id}`}
                            tableData={[i.material
                                ? String(i.item.name) + ' de ' + String(i.material)
                                : String(i.item.name)]}
                            show={isShown("Consumiveis")}
                            onClick={() => showRow(`Item-${i.id}`)}
                            selected={isShown(`Item-${i.id}`)}
                            error={false}
                        />
                        <TableDropdown
                            key={`Drop-${i.id}`}
                            show={isShown("Consumiveis") && isShown(`Item-${i.id}`)}
                            categories={[String(i.item.subType)]}
                            subtitleIndexes={[0]}
                            items={[String(i.item.description)]}
                        />
                    </React.Fragment>
                ))}
            </table>
        </React.Fragment>
    );
}