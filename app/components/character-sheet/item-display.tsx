import { character, character_item, item } from "@prisma/client";
import React, { useState } from "react";
import { RenderSlot } from "./render-slots";


interface Props {
    character: character,
    items: (character_item & { item: item })[],
    onClick: () => void
}

export function ItemDisplay({ character, items, onClick }: Props) {

    let totalSlots = Math.max(character.slotAmulet, character.slotBelt, character.slotCloak, character.slotCuirass, character.slotEarings, character.slotGauntlet, character.slotGreaves, character.slotHelm, character.slotPauldron, character.slotRings, character.slotUpperLegs, character.slotWeapon)
    totalSlots % 2 === 0 ? totalSlots++ : totalSlots


    return (

        <>
            <div className="inventory"
                style={{ width: '100%', gridTemplateColumns: `repeat(${7}, 1fr)` }}>

                <RenderSlot slots={character.slotHelm} slotType="slotHelm" row={1} column={2} onClick={onClick} ></RenderSlot>
                <RenderSlot slots={character.slotEarings} slotType="slotEarings" row={2} column={2} onClick={onClick} ></RenderSlot>
                <RenderSlot slots={character.slotCloak} slotType="slotCloak" row={3} column={2} onClick={onClick} ></RenderSlot>
                <RenderSlot slots={character.slotAmulet} slotType="slotAmulet" row={4} column={2} onClick={onClick} ></RenderSlot>
                <RenderSlot slots={character.slotRings} slotType="slotRings" row={5} column={2} onClick={onClick} ></RenderSlot>
                <RenderSlot slots={character.slotWeapon} slotType="slotWeapon" row={6} column={2} onClick={onClick} ></RenderSlot>



            </div>

        </>
    )
};

