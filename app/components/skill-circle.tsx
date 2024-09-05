/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { skill } from '@prisma/client';

interface Props {
  skill: skill;
  isSelected: boolean;
  onClick: () => void;
  isPureLineage: boolean
}

export function SkillCircle({ skill, isSelected, onClick, isPureLineage }: Props) {
  const prerequisites = [];

  if (skill.lvl) prerequisites.push(`Level ${skill.lvl}`);
  if (skill.rlSiz) prerequisites.push(`Relative Size ${skill.rlSiz}`);
  if (skill.trSiz) prerequisites.push(`True Size ${skill.trSiz}`);
  if (skill.agi) prerequisites.push(`Agility ${skill.agi}`);
  if (skill.bdy) prerequisites.push(`Body ${skill.bdy}`);
  if (skill.mnd) prerequisites.push(`Mind ${skill.mnd}`);

  return (
    <div onClick={onClick} style={{ border: isSelected ? '2px solid green' : '1px solid gray', padding: '5%', borderRadius: '2%', backgroundColor: isSelected ? 'rgb(209, 153, 12)' : '' } }>
      <h3 style={{backgroundColor: isPureLineage ? 'gold' : '', color: isPureLineage ? 'black' : 'white'}}>{skill.name}</h3>
      {prerequisites.length > 0 && <p>Prerequisites: {prerequisites.join(' ')}</p>}
      <p>{skill.techniqueSubtype || skill.type}</p>
      <p>{skill.description}</p>
    </div>
  );
}