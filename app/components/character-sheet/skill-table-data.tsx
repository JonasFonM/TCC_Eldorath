import { skill } from '@prisma/client'
import "~/styles.css";

interface Props {
    skill: skill;
    show: boolean;
    onClick: () => void;
}

export function SkillTableData({ skill, show, onClick }: Props) {

    return (
        <>
            {
                <tr onClick={onClick} style={show ? { display: 'table-row' } : { display: 'none' }}>
                    <td>{skill.name}</td>
                    <td>{skill.techniqueSubtype || skill.type}</td>
                </tr>}
        </>
    )
}
