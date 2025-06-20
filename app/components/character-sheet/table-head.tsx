import "~/styles.css";

interface Props {
    onClick: () => void;
    tableTitles: string[];
    open: boolean,
    error: boolean
}

export function TableHead({ onClick, tableTitles, open, error }: Props) {

    return (
        <thead className={error ? 'error' : ''}>
            <tr style={{ backgroundColor: open ? '#090809' : 'inherit' }} onClick={onClick}>
                {tableTitles.map((tt, index) => (
                    <th style={{ fontSize: '1.5rem', fontWeight: 'bolder', color: open ? 'gold' : 'inherit' }} key={index}>{tt}</th>
                ))}
            </tr>
        </thead>
    )
}
