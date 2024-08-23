/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { training } from '@prisma/client';

interface Props {
  training: training;
  isSelected: boolean;
  onClick: () => void;
}

export function TrainingCircle({ training, isSelected, onClick }: Props) {
  return (
    <div onClick={onClick} style={{ border: isSelected ? '2px solid green' : '1px solid gray', padding: '5%', borderRadius: '2%', backgroundColor: isSelected ? 'rgb(209, 153, 12)' : '' } }>
      <h3>{training.name}</h3>
      <p>{training.description}</p>
    </div>
  );
}
