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



export function CharacterWeaponCircle({ weapon, onClick }: Props) {

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
      <li>
        <button onClick={onClick}>
          {weapon.weapon.name + ' de ' + weapon.material}
        </button>
      </li>
      <div>
        <DeleteConfirm name={weapon.weapon.name + ' de ' + weapon.material} isHidden={selectedDelete === 0} onShow={showDelete} onCancel={cancelDelete} entity='weapon' id={String(weapon.id)} />
      </div>
    </>
  );
}