/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { armor, training } from '@prisma/client';

interface Props {
  armor: armor & { training: training };
  isSelected: boolean;
  onClick: () => void;
}



export function ArmorCircle({ armor, isSelected, onClick }: Props) {

  return (
    <div className='grid-item' onClick={onClick} style={{ border: isSelected ? '2px solid green' : '1px solid gray', padding: '5%', borderRadius: '2%' }}>
      <h3>{armor.name}</h3>
      <p>{armor.description}</p>
      <div className='dropdown-content'>
        <p>Training: {armor.training?.name}</p>
        <p>Cost: {armor.baseCost}</p>
        <p>Weight: {armor.weight}</p>
        <p>Defense: {armor.baseDefense}</p>
      </div>
    </div>
  );
}