import "~/styles.css";

interface Props {
    onClick: () => void;
}

export function SkillTableHead({ onClick }: Props) {

    return (
        <>
            
            <tr onClick={onClick}>
                <th>Nome</th>
                <th>Tipo</th>
            </tr>
        </>
    )
}
