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

  if (skill.lvl) prerequisites.push(`Nível ${skill.lvl}`);
  if (skill.rlSiz) prerequisites.push(`Tamanho Relativo ${skill.rlSiz}`);
  if (skill.trSiz) prerequisites.push(`Tamanho Real ${skill.trSiz}`);
  if (skill.agi) prerequisites.push(`Agilidade ${skill.agi}`);
  if (skill.bdy) prerequisites.push(`Corpo ${skill.bdy}`);
  if (skill.mnd) prerequisites.push(`Mente ${skill.mnd}`);

  

  return (
    <div className='grid-item' onClick={onClick} style={{ border: isSelected ? '2px solid green' : '1px solid gray', padding: '5%', borderRadius: '2%', backgroundColor: isSelected ? 'rgb(209, 153, 12)' : '' }}>
      <h3 style={{ backgroundColor: isPureLineage ? 'gold' : '', color: isPureLineage ? 'black' : 'white' }}>{skill.name}</h3>
      <div className='dropdown-content'>
      {prerequisites.length > 0 && <p>Pré requisitos: {prerequisites.join('\n | \n')}</p>
    }

        <p>{skill.techniqueSubtype || skill.type}</p>
        <p>{skill.description}</p>
      </div>
    </div>
  );
}