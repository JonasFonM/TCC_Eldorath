import { skill } from '@prisma/client'
import "~/styles.css";
import { SkillTableItem } from './skill-table-item';

export function SkillTable({ skills }: { skills: skill[] }) {
    return (
        <div>
            <table>
                <tr>
                    <th>Nome</th>
                    <th>Tipo</th>
                </tr>
                {skills.map(skill => (
                    <SkillTableItem key={skill.id} skill={skill} />
                ))}
            </table>
        </div>
    )
}
