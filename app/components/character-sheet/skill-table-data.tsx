import { skill } from '@prisma/client'
import "~/styles.css";

interface Props {
    skill: skill;
    show: boolean;
    onClick: () => void;
    selected: boolean;
}

export function SkillTableData({ skill, show, onClick, selected }: Props) {

    return (
        <>
            {
                <tr className={selected ? 'selected' : ''} onClick={onClick} style={show ? { display: 'table-row' } : { display: 'none' }}>
                    <td>{skill.name}</td>
                    <td>{skill.type}</td>
                </tr>}
        </>
    )
}
