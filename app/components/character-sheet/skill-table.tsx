import "~/styles.css";

interface Props {
    onClick: () => void;
}

export function SkillTableHead({ onClick }: Props) {

    return (
        <>
            <tr style={{ display: 'table-row' }} onClick={onClick}>
                <th>Nome</th>
                <th>Tipo</th>
            </tr>
        </>
    )
}
