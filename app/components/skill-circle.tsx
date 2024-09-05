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
  return (
    <div onClick={onClick} style={{ border: isSelected ? '2px solid green' : '1px solid gray', padding: '5%', borderRadius: '2%', backgroundColor: isSelected ? 'rgb(209, 153, 12)' : '' } }>
      <h3 style={{backgroundColor: isPureLineage ? 'gold' : '', color: isPureLineage ? 'black' : 'white'}}>{skill.name}</h3>
      <p>{skill.techniqueSubtype || skill.type}</p>
      <p>{skill.description}</p>
    </div>
  );
}