import "~/styles.css";

interface Props {
    tableData: string[];
    show: boolean;
    onClick: () => void;
    selected: boolean;
}

export function TableData({ tableData, show, onClick, selected }: Props) {

    return (
        <tr className={selected ? 'selected' : ''} onClick={onClick} style={show ? {} : { display: 'none' }}>
            {tableData.map((td, index) => (
                <td style={{ fontSize: '1.3rem' }} key={index}>{td}</td>
            ))
            }
        </tr>
    )
}
