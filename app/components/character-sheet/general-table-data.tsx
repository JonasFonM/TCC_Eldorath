import "~/styles.css";

interface Props {
    tableData: string[];
    show: boolean;
    onClick: () => void;
    selected: boolean;
}

export function TableData({ tableData, show, onClick, selected }: Props) {

    return (
        <tbody>
            {
                <tr className={selected ? 'selected' : ''} onClick={onClick} style={show ? { display: 'table-row' } : { display: 'none' }}>
                    {tableData.map(td => (
                        <td>{td}</td>
                    ))
                    }
                </tr>}
        </tbody>)
}
