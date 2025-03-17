import { character, character_item, item } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { NavLink, useLoaderData, useOutletContext } from "@remix-run/react";
import React, { useState } from "react";
import { CharacterItemCircle } from "~/components/c-item-circle";
import { ItemDisplay } from "~/components/character-sheet/item-display";

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
        }
    })

    return ({ items, characterId, referer })
}

export default function InventoryRoute() {
    const { items, referer } = useLoaderData<{ items: (character_item & { item: item })[]; referer: string }>();
    const { character, isAuthor } = useOutletContext<{ character: character, isAuthor: boolean }>();


    return (
        <React.Fragment>
            <h1 className="title-container">Inventário<NavLink style={{ color: 'blue' }} className={'question-button'} to={'../new/inventory'}>+</NavLink></h1>
            <ItemDisplay
                items={items}
                character={character}
                onClick={isAuthor ? () => null : () => null} />

        </React.Fragment>
    );
}