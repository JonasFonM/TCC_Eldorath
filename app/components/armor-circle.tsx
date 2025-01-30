/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { item } from '@prisma/client';

interface Props {
  item: item;
  isSelected: boolean;
  onClick: () => void;
}



export function ItemCircle({ item, isSelected, onClick }: Props) {

  return (
    <div className='grid-item' onClick={onClick} style={{ border: isSelected ? '2px solid green' : '1px solid gray', padding: '5%', borderRadius: '2%' }}>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <div className='dropdown-content'>
        <p>Custo: {item.baseCost}</p>
        <p>Peso: {item.weight}</p>
        <p>Defesa: {item.baseDefense}</p>
      </div>
    </div>
  );
}