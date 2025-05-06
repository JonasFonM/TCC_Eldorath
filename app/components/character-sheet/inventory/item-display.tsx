import { character, character_item, item } from "@prisma/client";
import React from "react";
import { RenderSlot } from "./render-slots";


interface Props {
    character: character,
    equippedItems: (character_item & { item: item })[],
    availableItems: (character_item & { item: item })[],
}

export function ItemDisplay({ character, equippedItems, availableItems }: Props) {
    return (

        <React.Fragment key={'Equipment'}>
            <div className="inventory"
                style=
                {{
                    width: '100%',
                    padding: '5%',
                    gridTemplateColumns: `1fr 2fr 1fr 1fr 2fr 1fr 1fr 2fr 1fr`,
                }}>

                <RenderSlot slots={character.slotArmor} slotType="slotArmor" row={6} column={2} equippedItems={equippedItems.filter(it => it.item.type === 'slotArmor')} availableItems={availableItems.filter(it => it.item.type === 'slotArmor')}></RenderSlot>
                <RenderSlot slots={character.slotAccessory} slotType="slotAccessory" row={6} column={5} equippedItems={equippedItems.filter(it => it.item.type === 'slotAccessory')} availableItems={availableItems.filter(it => it.item.type === 'slotAccessory')}></RenderSlot>
                <RenderSlot slots={character.slotWeapon} slotType="slotWeapon" row={6} column={8} equippedItems={equippedItems.filter(it => it.item.type === 'slotWeapon')} availableItems={availableItems.filter(it => it.item.type === 'slotWeapon')}></RenderSlot>

            </div>


        </React.Fragment>
    )
};

