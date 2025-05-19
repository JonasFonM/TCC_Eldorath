import React, { useRef, useState } from "react";
import "~/styles.css";
import { GeneralExplain } from "../explanations/general-explain";

interface Props {
    rows: number;
    columns: number;
    gridItems: string[];
    descriptions: string[];
    onClick: () => void;
}

export function GeneralGrid({ gridItems, descriptions, columns, rows, onClick }: Props) {
    const showGridItem = useRef<number>(-1); // Avoid re-renders

    const forceUpdate = useState(0)[1]; // Trigger minimal re-renders when necessary

    const handleGridItemClick = (index: number) => {
        showGridItem.current = showGridItem.current != index
            ? index
            : showGridItem.current;
        forceUpdate(n => n + 1); // Minimal re-render
    };
    const gridSquares: JSX.Element[] = [];

    const renderGridSquares = () => {
        gridItems.map((gi, index) => (
            gridSquares.push(<button key={`Ocupado-${gi}-${index}`} className="grid-item" onClick={() => handleGridItemClick(index)}  >{gi}</button>
            )))

        for (let index = 0; index < ((rows * columns) - gridItems.length); index++) {
            gridSquares.push(<button key={`Vazio-${index}`} onClick={onClick} className="grid-item"></button>)
        }
        return (gridSquares)
    }

    return (
        <div className="grid">
            {
                gridItems.map((gi, index) => (
                    <React.Fragment key={`Explica-${gi}-${index}`}>
                        <GeneralExplain title={gridItems[index]} description={descriptions[index]} isHidden={showGridItem.current !== index} onCancel={() => handleGridItemClick(-1)} />
                    </React.Fragment>
                ))
            }

            {renderGridSquares()}

        </div>
    )
}
