import { character, character_item, item } from "@prisma/client";
import React, { useState } from "react";

interface Props {
    character: character,
    items: (character_item & { item: item })[],
    isAuthor: boolean
}

export function ItemDisplay({ character, items, isAuthor }: Props) {

    let headSlots = (character.slotCloak + character.slotHelm + character.slotEarings)
    headSlots % 2 === 0 ? headSlots++ : headSlots

    const renderItems = (slots: number, row: number, totalColumns: number) => {
        const items: JSX.Element[] = [];

        const center = (totalColumns + 1) / 2

        for (let index = 0; index < slots; index++) {

            const columnPlacement =
                slots > 1 ?
                    index % 2 < 1 ?
                        (center - (index+1))
                        : (center + (index))
                    : (center)

            items.push(

                <div key={`i${index}`} style={{ gridRow: row, gridColumn: columnPlacement }} className={`grid-item`} >{`${slots}i${index}`}</div>)

        }
        return (items)
    }

    return (

        <>
            <div className="grid" style={{ width: '100%', gridTemplateColumns: `repeat(${headSlots + 6}, 1fr)` }}>
                {renderItems(character.slotCloak, 1, headSlots + 6)}
                {renderItems(character.slotHelm, 2, headSlots + 6)}

                {renderItems(6, 2, headSlots + 6)}

            </div>
            {/*
                {renderItems(character.slotAmulet)}

                {renderItems(character.slotPauldron)}

                {renderItems(character.slotCuirass)}

                {renderItems(character.slotGauntlet)}

                {renderItems(character.slotWeapon)}

                {renderItems(character.slotRings)}

                {renderItems(character.slotBelt)}

                {renderItems(character.slotUpperLegs)}

                {renderItems(character.slotGreaves)}
        */}
        </>
    )
};

