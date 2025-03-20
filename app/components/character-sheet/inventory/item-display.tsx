import { character, character_item, item } from "@prisma/client";
import React, { useRef, useState } from "react";
import { RenderSlot } from "./render-slots";


interface Props {
    character: character,
    items: (character_item & { item: item })[],
    equippedItems: (character_item & { item: item })[],
}

export function ItemDisplay({ character, items, equippedItems }: Props) {

    let totalSlots = Math.max(character.slotAmulet, character.slotBelt, character.slotCloak, character.slotCuirass, character.slotEarings, character.slotGauntlet, character.slotGreaves, character.slotHelm, character.slotPauldron, character.slotRings, character.slotUpperLegs, character.slotWeapon)
    totalSlots % 2 === 0 ? totalSlots++ : totalSlots

    return (

        <>
            <div className="inventory"
                style={{ width: '100%', gridTemplateColumns: `1fr 2fr 1fr 6fr 1fr 2fr 1fr` }}>

                <RenderSlot slots={character.slotCloak} slotType="slotCloak" row={1} column={2} equippedItems={equippedItems.filter(it => it.item.type === 'slotCloak')} ></RenderSlot>
                <RenderSlot slots={character.slotEarings} slotType="slotEarings" row={2} column={2} equippedItems={equippedItems.filter(it => it.item.type === 'slotEarings')} ></RenderSlot>
                <RenderSlot slots={character.slotAmulet} slotType="slotAmulet" row={3} column={2} equippedItems={equippedItems.filter(it => it.item.type === 'slotAmulet')} ></RenderSlot>
                <RenderSlot slots={character.slotRings} slotType="slotRings" row={4} column={2} equippedItems={equippedItems.filter(it => it.item.type === 'slotRings')}></RenderSlot>
                <RenderSlot slots={character.slotBelt} slotType="slotBelt" row={5} column={2} equippedItems={equippedItems.filter(it => it.item.type === 'slotBelt')} ></RenderSlot>
                <RenderSlot slots={character.slotWeapon} slotType="slotWeapon" row={6} column={2} equippedItems={equippedItems.filter(it => it.item.type === 'slotWeapon')}></RenderSlot>



                <RenderSlot slots={character.slotHelm} slotType="slotHelm" row={1} column={6} equippedItems={equippedItems.filter(it => it.item.type === 'slotHelm')} ></RenderSlot>
                <RenderSlot slots={character.slotPauldron} slotType="slotPauldron" row={2} column={6} equippedItems={equippedItems.filter(it => it.item.type === 'slotPauldron')}></RenderSlot>
                <RenderSlot slots={character.slotCuirass} slotType="slotCuirass" row={3} column={6} equippedItems={equippedItems.filter(it => it.item.type === 'slotCuirass')}></RenderSlot>
                <RenderSlot slots={character.slotGauntlet} slotType="slotGauntlet" row={4} column={6} equippedItems={equippedItems.filter(it => it.item.type === 'slotGauntlet')}></RenderSlot>
                <RenderSlot slots={character.slotUpperLegs} slotType="slotUpperLegs" row={5} column={6} equippedItems={equippedItems.filter(it => it.item.type === 'slotUpperLegs')}></RenderSlot>
                <RenderSlot slots={character.slotGreaves} slotType="slotGreaves" row={6} column={6} equippedItems={equippedItems.filter(it => it.item.type === 'slotGreaves')}></RenderSlot>


            </div>

        </>
    )
};

