/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { item, character_item } from '@prisma/client';
import { DeleteConfirm } from './delete-confirmation';
import { useState } from 'react';

interface Props {
  item: character_item & { item: item };
  isSelected: boolean;
  onClick: () => void;
}



export function CharacterItemCircle({ item, isSelected, onClick }: Props) {
  const [selectedDelete, setSelectedDelete] = useState<number>(0);

  const showDelete = () => {
    setSelectedDelete(() => {
      return item.id;
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
        <h3>{item.item.name}</h3>
        <p>{item.item.description}</p>

        <div className='dropdown-content'>
          <p>Cost:{item.baseCost}</p>
          <p>Weight:{item.weight}</p>
          <p>Defense:{item.defense}</p>
          <p>Crafting Tier:{item.craftTier}</p>
          <p>Material:{item.material}</p>
          <DeleteConfirm name={item.material + ' ' + item.item.name} isHidden={selectedDelete === 0} onShow={showDelete} onCancel={cancelDelete} entity='item' id={String(item.id)} />

        </div>

      </div>
    </div>
  );
}