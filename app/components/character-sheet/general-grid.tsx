import React, { useRef, useState } from "react";
import "~/styles.css";
import { GeneralExplain } from "../explanations/general-explain";

interface Props {
    rows: number;
    columns: number;
    gridItems: string[];
    descriptions: string[];

}

export function GeneralGrid({ gridItems, descriptions, columns, rows }: Props) {
    const showGridItem = useRef<number>(-1); // Avoid re-renders

    const forceUpdate = useState(0)[1]; // Trigger minimal re-renders when necessary

    const handleGridItemClick = (index: number) => {
        showGridItem.current = showGridItem.current != index
            ? index
            : showGridItem.current;
        forceUpdate(n => n + 1); // Minimal re-render
    };

    let templateColumns = ''
    let templateRows = ''


    for (let index = 0; index < columns; index++) {
        templateColumns = templateColumns.concat('auto ');
    }

    for (let index = 0; index < rows; index++) {
        templateRows = templateRows.concat('auto ');
    }

    return (
        <div className="grid" style={{ gridTemplateColumns: `${templateColumns}`, gridTemplateRows: `${templateRows}` }}>
            {gridItems.map((gi, index) => (
                <React.Fragment key={gi + index}>
                    <button className="grid-item" onClick={() => handleGridItemClick(index)}  >{gi}</button>

                    <GeneralExplain title={gridItems[index]} description={descriptions[index]} style={'linear-gradient(to bottom, white, grey)'} color="black" isHidden={showGridItem.current !== index} onCancel={() => handleGridItemClick(-1)} />
                </React.Fragment>
            ))}
        </div>
    )
}
