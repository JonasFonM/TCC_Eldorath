import { path } from '@prisma/client'
import "~/styles.css";

interface Props {
    path: path;
    show: boolean;
    onClick: () => void;
    selected: boolean;
}

export function PathTableData({ path, show, onClick, selected }: Props) {

    return (
        <>
            {
                <tr className={selected ? 'selected' : ''} onClick={onClick} style={show ? { display: 'table-row' } : { display: 'none' } }>
                    <td>{path.pathTier}</td>
                    <td>{path.name}</td>
                    <td>{path.vitality}</td>
                    <td>{path.power}</td>
                    <td>{path.addTechniques}</td>
                    <td>{path.addManeuvers}</td>
                    <td>{path.addOaths}</td>
                    <td>{path.addTricks}</td>
                    <td>{path.addMagics}</td>
                </tr>}
        </>
    )
}
