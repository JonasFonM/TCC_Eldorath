import "~/styles.css";

interface Props {
    onClick: () => void;
}

export function PathTableHead({ onClick }: Props) {

    return (
        <tr onClick={onClick}>
            <th>Caminho</th>
            <th>Vit</th>
            <th>Pod</th>
            <th>Tec</th>
            <th>Man</th>
            <th>Jur</th>
            <th>Tru</th>
            <th>Mag</th>
        </tr>
    )
}