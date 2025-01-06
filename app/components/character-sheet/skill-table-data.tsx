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
                <tr style={selected ? { backgroundColor: 'darkgoldenrod' } : {}} onClick={onClick} className={show ? '' : 'hidden-row'}>
                    <td>{skill.name}</td>
                    <td>{skill.techniqueSubtype || skill.type}</td>
                </tr>}
        </>
    )
}
