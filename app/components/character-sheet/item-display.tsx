import { character, character_item, item } from "@prisma/client";
import React, { useState } from "react";

interface Props {
    character: character,
    items: (character_item & { item: item })[],
    onClick: () => void
}

export function ItemDisplay({ character, items, onClick }: Props) {


    let totalSlots = character.slotAmulet + character.slotBelt + character.slotCloak + character.slotCuirass + character.slotEarings + character.slotGauntlet + character.slotGreaves + character.slotHelm + character.slotPauldron + character.slotRings + character.slotUpperLegs + character.slotWeapon
    totalSlots % 2 === 0 ? totalSlots++ : totalSlots

    let headSlots = (character.slotCloak + character.slotHelm + character.slotEarings)
    headSlots % 2 === 0 ? headSlots++ : headSlots

    const renderItems = (slots: number, row: number, totalColumns: number, slotType: string) => {
        const items: JSX.Element[] = [];

        const center = (totalColumns + 1) / 2

        for (let index = 0; index < slots; index++) {

            const columnPlacement =
                slots > 1 ?
                    index % 2 < 1 ?
                        (center - (Math.floor(index / 2) + 1))
                        : (center + (Math.floor(index / 2) + 1))
                    : (center)

            items.push(

                <button key={`i${index}`} style={{ gridRow: row, gridColumn: columnPlacement }} className={`grid-item`} onClick={onClick}></button>)

        }
        return (items)
    }

    return (

        <>
            <div className="inventory" style={{ width: '100%', gridTemplateColumns: `repeat(${totalSlots}, 1fr)` }}>
                {renderItems(character.slotCloak, 1, totalSlots, 'slotCloak')}
                {renderItems(character.slotHelm, 2, totalSlots, 'slotHelm')}
                {renderItems(character.slotEarings, 2, totalSlots, 'slotEarings')}
                {renderItems(character.slotAmulet, 5, totalSlots, 'slotAmulet')}
                {renderItems(character.slotPauldron, 4, totalSlots, 'slotPauldron')}
                {renderItems(character.slotCuirass, 4, totalSlots, 'slotCuirass')}
                {renderItems(character.slotGauntlet, 5, totalSlots, 'slotGauntlet')}
                {renderItems(character.slotWeapon, 6, totalSlots, 'slotWeapon')}
                {renderItems(character.slotRings, 8, totalSlots, 'slotRings')}
                {renderItems(character.slotBelt, 9, totalSlots, 'slotBelt')}
                {renderItems(character.slotUpperLegs, 10, totalSlots, 'slotUpperLegs')}
                {renderItems(character.slotGreaves, 11, totalSlots, 'slotGreaves')}

            </div>

        </>
    )
};

