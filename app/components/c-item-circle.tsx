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

    <>
      <li>
        <button onClick={onClick}>
          {item.item.name + ' de ' + item.material}
        </button>
      </li>
      <div>
        <DeleteConfirm name={item.item.name + ' de ' + item.material} isHidden={selectedDelete === 0} onShow={showDelete} onCancel={cancelDelete} entity='item' id={String(item.id)} />
      </div>
    </>

  );
}