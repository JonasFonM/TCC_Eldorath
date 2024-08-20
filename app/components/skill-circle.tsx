/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { skill } from '@prisma/client';

interface Props {
  skill: skill;
  isSelected: boolean;
  onClick: () => void;
}

export function SkillCircle({ skill, isSelected, onClick }: Props) {
  return (
    <div onClick={onClick} style={{ border: isSelected ? '2px solid green' : '1px solid gray', padding: '5%', borderRadius: '2%' }}>
      <h3>{skill.name}</h3>
      <p>{skill.description}</p>
    </div>
  );
}