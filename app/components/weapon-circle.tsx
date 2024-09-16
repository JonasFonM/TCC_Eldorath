/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { weapon, training } from '@prisma/client';

interface Props {
  weapon: weapon;
  training: training;
  isSelected: boolean;
  onClick: () => void;
}



export function WeaponCircle({ weapon, training, isSelected, onClick }: Props) {
    
    return (
    <div onClick={onClick} style={{ border: isSelected ? '2px solid green' : '1px solid gray', padding: '5%', borderRadius: '2%' }}>
      <h3>{weapon.name}</h3>
      <p>{weapon.description}</p>
      <p>Training:{training.name}</p>
      <p>Cost:{weapon.cost}</p>
      <p>Weight:{weapon.weight}</p>
    </div>
  );
}