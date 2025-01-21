/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { weapon, character_weapon } from '@prisma/client';
import { DeleteConfirm } from './delete-confirmation';
import { useState } from 'react';

interface Props {
  weapon: character_weapon & { weapon: weapon };
  isSelected: boolean;
  onClick: () => void;
}



export function CharacterWeaponCircle({ weapon, isSelected, onClick }: Props) {

  const [selectedDelete, setSelectedDelete] = useState<number>(0);

  const showDelete = () => {
    setSelectedDelete(() => {
      return weapon.id;
    });
  };

  const cancelDelete = () => {
    setSelectedDelete(() => {
      return 0
    });
  };

  return (
    <>
      <div onClick={onClick} className='grid-item' style={{ border: isSelected ? '2px solid green' : '1px solid gray', padding: '5%', borderRadius: '2%' }}>

        <div>
          <h3>{weapon.weapon.name}</h3>

          <p>{weapon.weapon.description}</p>

        </div>
        <div className='dropdown-content'>
          <DeleteConfirm name={ weapon.weapon.name + ' de ' + weapon.material} isHidden={selectedDelete === 0} onShow={showDelete} onCancel={cancelDelete} entity='weapon' id={String(weapon.id)} />

          <p>Cost:{weapon.cost}</p>
          <p>Weight:{weapon.weight}</p>
          <p>Crafting Tier:{weapon.craftTier}</p>
          <p>Material:{weapon.material}</p>
          <p>Reach:{weapon.reach}</p>

        </div>

      </div>

    </>
  );
}