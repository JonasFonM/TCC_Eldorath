/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { skill } from '@prisma/client';

interface Props {
  skill: skill;
}

export function SkillTableItem({ skill }: Props) {
  const prerequisites = [];

  if (skill.lvl) prerequisites.push(`Nível ${skill.lvl}`);
  if (skill.rlSiz) prerequisites.push(`Tamanho Relativo ${skill.rlSiz}`);
  if (skill.trSiz) prerequisites.push(`Tamanho Real ${skill.trSiz}`);
  if (skill.agi) prerequisites.push(`Agilidade ${skill.agi}`);
  if (skill.bdy) prerequisites.push(`Corpo ${skill.bdy}`);
  if (skill.mnd) prerequisites.push(`Mente ${skill.mnd}`);



  return (
    <tr style={{margin: '16px'} }>
      <td>{skill.name}</td>
      <td>{skill.techniqueSubtype || skill.type}</td>
    </tr>
  );
}