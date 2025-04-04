import "~/styles.css";

interface Props {
    onClick: () => void;
    tableTitles: string[];
    open: boolean
}

export function TableHead({ onClick, tableTitles, open }: Props) {

    return (
        <tr style={{ backgroundColor: open ? '#090809' : 'inherit' }} onClick={onClick}>
            {tableTitles.map((tt, index) => (
                <th style={{color: open ? 'gold' : 'inherit', fontSize: '1.4rem'}} key={index}>{tt}</th>
            ))}
        </tr>
    )
}
