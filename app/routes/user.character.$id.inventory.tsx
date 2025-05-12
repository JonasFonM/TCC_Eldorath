import { character, character_item, item } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData, useOutletContext } from "@remix-run/react";
import React, { useRef, useState } from "react";
import { TableHead } from "~/components/character-sheet/general-table";
import { TableData } from "~/components/character-sheet/general-table-data";
import { TableDropdown } from "~/components/character-sheet/table-dropdown";
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

    const show = useRef<number[]>([]);

    const forceUpdate = useState(0)[1];

    const showRow = (n: number) => {
        if (show.current.includes(n)) {
            const newShow = show.current.filter(ns => ns != n)
            show.current = newShow
            return forceUpdate(n => n + 1);
        }
        show.current.push(n);
        return forceUpdate(n => n + 1);
    }

    return (
        <React.Fragment>
            <h1 className="title-container">Inventário</h1>

            <table>
                <TableHead
                    tableTitles={['Acessórios']}
                    onClick={() => showRow(-2)}
                    open={show.current.includes(-2)}
                />

                {items.filter(i => i.item.type === 'slotAccessory').map(i => (
                    <React.Fragment key={i.id}>
                        <TableData
                            key={`Data-${i.id}`}
                            tableData={[i.material
                                ? String(i.item.name) + ' de ' + String(i.material)
                                : String(i.item.name)]}
                            show={show.current.includes(-2)}
                            onClick={() => showRow(i.id)}
                            selected={show.current.includes(i.id)}
                        />
                        <TableDropdown
                            key={`Drop-${i.id}`}
                            show={show.current.includes(-2) && show.current.includes(i.id)}
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
                    onClick={() => showRow(-3)}
                    open={show.current.includes(-3)}
                />

                {items.filter(i => i.item.type === 'slotArmor').map(i => (
                    <React.Fragment key={i.id}>
                        <TableData
                            key={`Data-${i.id}`}
                            tableData={[i.material
                                ? String(i.item.name) + ' de ' + String(i.material)
                                : String(i.item.name)]}
                            show={show.current.includes(-3)}
                            onClick={() => showRow(i.id)}
                            selected={show.current.includes(i.id)}
                        />
                        <TableDropdown
                            key={`Drop-${i.id}`}
                            show={show.current.includes(-3) && show.current.includes(i.id)}
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
                    onClick={() => showRow(-4)}
                    open={show.current.includes(-4)}
                />

                {items.filter(i => i.item.type === 'slotWeapon').map(i => (
                    <React.Fragment key={i.id}>
                        <TableData
                            key={`Data-${i.id}`}
                            tableData={[i.material
                                ? String(i.item.name) + ' de ' + String(i.material)
                                : String(i.item.name)]}
                            show={show.current.includes(-4)}
                            onClick={() => showRow(i.id)}
                            selected={show.current.includes(i.id)}
                        />
                        <TableDropdown
                            key={`Drop-${i.id}`}
                            show={show.current.includes(-4) && show.current.includes(i.id)}
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
                    onClick={() => showRow(-5)}
                    open={show.current.includes(-5)}
                />

                {items.filter(i => i.item.type === 'consumable').map(i => (
                    <React.Fragment key={i.id}>
                        <TableData
                            key={`Data-${i.id}`}
                            tableData={[i.material
                                ? String(i.item.name) + ' de ' + String(i.material)
                                : String(i.item.name)]}
                            show={show.current.includes(-5)}
                            onClick={() => showRow(i.id)}
                            selected={show.current.includes(i.id)}
                        />
                        <TableDropdown
                            key={`Drop-${i.id}`}
                            show={show.current.includes(-5) && show.current.includes(i.id)}
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