import { character, character_item, item } from "@prisma/client";
import React, { useState } from "react";

interface Props {
    character: character,
    items: (character_item & { item: item })[],
    isAuthor: boolean
}

export function ItemDisplay({ character, items, isAuthor }: Props) {


    const totalSlots = character.slotAmulet + character.slotBelt + character.slotCloak + character.slotCuirass + character.slotEarings + character.slotGauntlet + character.slotGreaves + character.slotHelm + character.slotPauldron + character.slotRings + character.slotUpperLegs + character.slotWeapon

    const helms: JSX.Element[] = [];
    const gridSquares: JSX.Element[] = [];

    const renderHead = () => {
        for (let index = 0; index < (character.slotHelm); index++) {
            helms.push(
                <div key={index} className="grid-item">A</div>)
        }
        return (
            <div className="col-4">
                {helms}
            </div>
        )
    }

    const renderGridSquares = () => {
        for (let index = 0; index < (totalSlots); index++) {
            gridSquares.push(
                <div key={index} className="grid-item">A</div>)
        }
        return (
            <div className="col-5">
                {gridSquares}
            </div>)
    }

    return (
        <div className="inventory" >

            {renderHead()}
            {renderGridSquares()}


        </div>
    )
};

