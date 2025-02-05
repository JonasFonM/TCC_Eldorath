import "~/styles.css";

interface Props {
    onClick: () => void;
    tableTitles: string[];
}

export function TableHead({ onClick, tableTitles }: Props) {

    return (
        <>
            <tr style={{ display: 'table-row' }} onClick={onClick}>
                {tableTitles.map(tt => (
                    <th>{tt}</th>
                ))}
            </tr>
        </>
    )
}
