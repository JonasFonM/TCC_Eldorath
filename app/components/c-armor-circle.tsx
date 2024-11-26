/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { armor, character_armor } from '@prisma/client';
import { DeleteConfirm } from './delete-confirmation';
import { useState } from 'react';

interface Props {
  armor: character_armor & { armor: armor };
  isSelected: boolean;
  onClick: () => void;
}



export function CharacterArmorCircle({ armor, isSelected, onClick }: Props) {
  const [selectedDelete, setSelectedDelete] = useState<number>(0);

  const showDelete = () => {
    setSelectedDelete(() => {
      return armor.id;
    });
  };

  const cancelDelete = () => {
    setSelectedDelete(() => {
      return 0
    });
  };

  return (
    <div className='title-container'>        

      <div className='grid-item' onClick={onClick} style={{ border: isSelected ? '2px solid green' : '1px solid gray', padding: '5%', borderRadius: '2%' }}>
        <h3>{armor.armor.name}</h3>
        <p>{armor.armor.description}</p>

        <div className='dropdown-content'>
          <p style={{ color: armor.trained ? 'green' : 'red' }}>{armor.trained ? 'Trained' : 'Not Trained'}</p>
          <p>Cost:{armor.baseCost}</p>
          <p>Weight:{armor.weight}</p>
          <p>Defense:{armor.defense}</p>
          <p>Crafting Tier:{armor.craftTier}</p>
          <p>Material:{armor.material}</p>
          <DeleteConfirm name={armor.material + ' ' + armor.armor.name} isHidden={selectedDelete === 0} onShow={showDelete} onCancel={cancelDelete} entity='armor' id={String(armor.id)} />

        </div>

      </div>
    </div>
  );
}