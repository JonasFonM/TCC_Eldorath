import { character, character_item, item } from "@prisma/client";
import { join } from "node:path";
import React, { useState } from "react";

interface Props {
    character: character,
    items: (character_item & { item: item })[],
    onClick: () => void
}

export function ItemDisplay({ character, items, onClick }: Props) {


    let totalSlots = character.slotAmulet + character.slotBelt + character.slotCloak + character.slotCuirass + character.slotEarings + character.slotGauntlet + character.slotGreaves + character.slotHelm + character.slotPauldron + character.slotRings + character.slotUpperLegs + character.slotWeapon
    totalSlots % 2 === 0 ? totalSlots++ : totalSlots

    let headSlots = (character.slotCloak + character.slotEarings + character.slotEarings)
    headSlots % 2 === 0 ? headSlots++ : headSlots

    const renderItems = (slots: number[], row: number, totalColumns: number, slotTypes: string[]) => {
        const items: JSX.Element[] = [];
        const center = (totalColumns + 1) / 2
        const columnPlacement: number[][] = Array(slots.length).fill(null).map(() => []);

        slots.forEach((sl, index) => {
            let lastJ = 0
            for (let j = 0; j < sl; j++) {

                index != 0 ?
                    lastJ % 2 < 1 ?
                        columnPlacement[index].push(columnPlacement[index - 1][lastJ] - 1)
                        :
                        columnPlacement[index].push(columnPlacement[index - 1][lastJ] + 1)
                    :
                    j === 0 ?
                        columnPlacement[index].push(center)
                        :
                        j % 2 < 1 ?
                            columnPlacement[index].push(center - (Math.floor(index / 2) + 1))
                            :
                            columnPlacement[index].push(center + (Math.floor(index / 2) + 1))


                console.log(columnPlacement[index][j])

                items.push(
                    <button key={`${index}-${j}`}
                        style={{ gridRow: row, gridColumn: columnPlacement[index][j] }}
                        className={`grid-item`}
                        onClick={onClick}
                    >{slotTypes[index].at(4) + ` ${index},${j}`}</button>
                )

                lastJ = j
            }

        }
        )
        return (items)
    }

    return (

        <>
            <div className="inventory" style={{ width: '100%', gridTemplateColumns: `repeat(${headSlots}, 1fr)` }}>
                {
                    renderItems([character.slotEarings, character.slotEarings, character.slotCloak], 1, headSlots, ['slotHelm', 'slotEarings', 'slotCloak'])}
            </div>

        </>
    )
};

