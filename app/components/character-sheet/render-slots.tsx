import React, { useRef, useState } from "react";

interface Props {
    slots: number,
    slotType: string,
    row: number,
    column: number,
    onClick: () => void
}

export function RenderSlot({ slots, slotType, row, column, onClick }: Props) {
    const items: JSX.Element[] = [];
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
    for (let index = 0; index < slots; index++) {
        items.push(
            <button key={`${slotType}-${index}`}
                style={{
                    gridRow: row,
                    gridColumn: column,
                    display: showLayer.current === index ? 'inherit' : 'none',
                }}
                className={`grid-item`}
                onClick={onClick}
            >{slotType.at(4) + ` ${index}`}</button>
        )
    }

    slots > 1
        ?
        items.push(
            <React.Fragment key={`Change current ${slotType}`}>
                <button key={'Left'} style={{ gridRow: row, gridColumn: column - 1 }} onClick={handleLeftClick}>{`<`}</button>
                <button key={'Right'} style={{ gridRow: row, gridColumn: column + 1 }} onClick={handleRightClick}>{`>`}</button>
            </React.Fragment>
        )
        :
        null

    return (items)
}