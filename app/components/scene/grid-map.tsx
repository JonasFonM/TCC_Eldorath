import { JSX } from "react/jsx-runtime";
import "~/styles.css";

interface Props {
    rows: number;
    columns: number;
    onClick: () => void;
}

export function GridMap({ onClick, rows, columns }: Props) {
    let templateColumns = ''
    let templateRows = ''

    const gridSquares: JSX.Element[] = [];

    for (let index = 0; index < columns; index++) {
        templateColumns = templateColumns.concat('auto ');
    }

    for (let index = 0; index < rows; index++) {
        templateRows = templateRows.concat('auto ');
    }

    const renderGridSquares = () => {
        for (let index = 0; index < (rows * columns); index++) {
            gridSquares.push(<div key={index} className="grid-item"> </div>)
        }
        return (gridSquares)
    }

    return (
        <div className="grid" style={{ gridTemplateColumns: `${templateColumns}`, gridTemplateRows: `${templateRows}` }}>

            {renderGridSquares()}

        </div>
    )
};