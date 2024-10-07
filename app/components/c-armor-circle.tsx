/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { armor, character_armor } from '@prisma/client';

interface Props {
  armor: character_armor & { armor: armor};
  isSelected: boolean;
  onClick: () => void;
}



export function CharacterArmorCircle({ armor, isSelected, onClick }: Props) {
    
    return (
    <div onClick={onClick} className='grid-item' style={{ border: isSelected ? '2px solid green' : '1px solid gray', padding: '5%', borderRadius: '2%' }}>
      <h3>{armor.armor.name}</h3>
      <p>{armor.armor.description}</p>
      <p style={{color: armor.trained ? 'green' : 'red'}}>{armor.trained ? 'Trained' : 'Not Trained'}</p>
      <p>Cost:{armor.baseCost}</p>
      <p>Weight:{armor.weight}</p>
      <p>Defense:{armor.defense}</p>
      <p>Crafting Tier:{armor.craftTier}</p>
      <p>Material:{armor.material}</p>
    </div>
  );
}