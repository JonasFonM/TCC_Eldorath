import { character, character_item, item } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { NavLink, useLoaderData, useOutletContext } from "@remix-run/react";
import React from "react";
import { GeneralGrid } from "~/components/character-sheet/general-grid";
import { ItemDisplay } from "~/components/character-sheet/inventory/item-display";

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
    const { items, equippedItems, availableItems, referer } = useLoaderData<{ items: (character_item & { item: item })[]; equippedItems: (character_item & { item: item })[]; availableItems: (character_item & { item: item })[]; referer: string }>();
    const { character, isAuthor } = useOutletContext<{ character: character, isAuthor: boolean }>();



    return (
        <React.Fragment>
            <h1 className="title-container">Inventário<NavLink style={{ color: 'blue' }} className={'question-button'} to={'../new/inventory'}>+</NavLink></h1>

            <ItemDisplay
                availableItems={availableItems}
                equippedItems={equippedItems}
                character={character}
            />

            <GeneralGrid
                gridItems={items.map(i => `${i.item.name} de ${i.material}`)}
                columns={5}
                rows={(character.body * 5) + (character.relativeSize * 5) + 5}
                descriptions={items.map(i => i.item.description)}
            />

        </React.Fragment>
    );
}