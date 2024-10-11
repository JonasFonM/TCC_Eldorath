/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { weapon, character_weapon } from '@prisma/client';

interface Props {
  weapon: character_weapon & { weapon: weapon };
  isSelected: boolean;
  onClick: () => void;
}



export function CharacterWeaponCircle({ weapon, isSelected, onClick }: Props) {

  return (
    <div onClick={onClick} className='dropdown' style={{ border: isSelected ? '2px solid green' : '1px solid gray', padding: '5%', borderRadius: '2%' }}>
      <div>
        <h3>{weapon.weapon.name}</h3>
        <p>{weapon.weapon.description}</p>
      </div>
      <div className='dropdown-content'>
        <p style={{ color: weapon.trained ? 'green' : 'red' }}>{weapon.trained ? 'Trained' : 'Not Trained'}</p>
        <p>Cost:{weapon.cost}</p>
        <p>Weight:{weapon.weight}</p>
        <p>Crafting Tier:{weapon.craftTier}</p>
        <p>Material:{weapon.material}</p>
        <p>Reach:{weapon.reach}</p>
      </div>
    </div>
  );
}