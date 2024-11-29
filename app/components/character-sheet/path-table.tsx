import "~/styles.css";

interface Props {
    onClick: () => void;
}

export function PathTableHead({ onClick }: Props) {

    return (
        <>
            
            <tr style={{ display: 'table-row' }} onClick={onClick}>
                <th>Categoria</th>
                <th>Nome</th>
                <th>Vitalidade</th>
                <th>Poder</th>
                <th>Técnicas</th>
                <th>Manobras</th>
                <th>Juramentos</th>
                <th>Truques</th>
                <th>Mágicas</th>
            </tr>
        </>
    )
}
