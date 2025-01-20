/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { weapon } from '@prisma/client';

interface Props {
  weapon: weapon;
  isSelected: boolean;
  onClick: () => void;
}



export function WeaponCircle({ weapon, isSelected, onClick }: Props) {
    
    return (
    <div onClick={onClick} className='grid-item' style={{ border: isSelected ? '1px solid green' : '1px solid gray', padding: '5%', borderRadius: '2%' }}>
      <div>
      <h3>{weapon.name}</h3>
      <p>{weapon.description}</p>
      </div>
      <div className='dropdown-content'>
      <p>Custo: {weapon.baseCost}</p>
      <p>Peso: {weapon.baseWeight}</p>
      <p>Alcance: {weapon.baseReach}</p>
      </div>
    </div>
  );
}