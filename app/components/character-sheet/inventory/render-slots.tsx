import { character_item, item } from "@prisma/client";
import React, { useRef, useState } from "react";
import { EmptySlot } from "./empty-slot";
import { EquippedItem } from "./equipped-item";

interface Props {
    slots: number,
    slotType: string,
    row: number,
    column: number,
    equippedItems: (character_item & { item: item })[],
}

export function RenderSlot({ slots, slotType, row, column, equippedItems }: Props) {
    const squares: JSX.Element[] = [];
    const showLayer = useRef<number>(0); // Avoid re-renders

    const forceUpdate = useState(0)[1]; // Trigger minimal re-renders when necessary

    const handleLeftClick = () => {
        showLayer.current = showLayer.current > 0 ? showLayer.current - 1 : slots - 1;
        forceUpdate(n => n + 1); // Minimal re-render
    };

    const handleRightClick = () => {
        showLayer.current = showLayer.current < slots - 1 ? showLayer.current + 1 : 0;
        forceUpdate(n => n + 1);
    };

    const showItemsForSlot = useRef<number>(-1); // Avoid re-renders

    const handleSlotClick = (slotPosition: number) => {
        showItemsForSlot.current = showItemsForSlot.current != slotPosition ? slotPosition : showItemsForSlot.current;
        console.log(showItemsForSlot)
        forceUpdate(n => n + 1); // Minimal re-render
    };

    const showEquippedItem = useRef<number>(-1); // Avoid re-renders

    const handleEquippedItemClick = (slotPosition: number) => {
        showEquippedItem.current = showEquippedItem.current != slotPosition ? slotPosition : showEquippedItem.current;
        console.log(showEquippedItem)
        forceUpdate(n => n + 1); // Minimal re-render
    };

    for (let index = 0; index < slots; index++) {

        squares.push(
            <React.Fragment key={`${slotType}-${index}`}>
                <button
                    style=
                    {{
                        gridRow: row,
                        gridColumn: column,
                        display: showLayer.current === index ? 'inherit' : 'none'
                    }}
                    className={`grid-item`}
                    onClick={() => handleSlotClick(index)}>

                    {`${slotType.at(4)} ${index}`}

                </button>

                <EmptySlot slotType={slotType} index={index} onCancel={() => handleSlotClick(-1)} isHidden={showItemsForSlot.current != index}></EmptySlot>

            </React.Fragment>
        )
    }

    slots > 1
        ?
        squares.push(
            <React.Fragment key={`Change current ${slotType}`}>
                <button key={'Left'} style={{ gridRow: row, gridColumn: column - 1 }} onClick={handleLeftClick}>{`<`}</button>
                <button key={'Right'} style={{ gridRow: row, gridColumn: column + 1 }} onClick={handleRightClick}>{`>`}</button>
            </React.Fragment>
        )
        :
        null

    return (squares)
}

/* !!! PRECISA SER ADAPTADO !!!

        squares.push(
            <React.Fragment key={`${slotType}-${index}`}>

                <button
                    style={{
                        gridRow: row,
                        gridColumn: column,
                        display: showLayer.current === index ? 'inherit' : 'none',
                    }}
                    className={`grid-item`}
                    onClick={() => handleEquippedItemClick(index)}>
                    {equippedItems[index].item.name + ` ${index}`}
                </button>
                <EquippedItem item={equippedItems[index]} slotType={slotType} index={index} onCancel={() => handleSlotClick(-1)} isHidden={showItemsForSlot.current != index}></EquippedItem>

            </React.Fragment>
        )
*/