/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { lineage } from '@prisma/client';

interface Props {
  lineage: lineage;
  isSelected: boolean;
  onClick: () => void;
}

export function LineageCircle({ lineage, isSelected, onClick }: Props) {
  return (
    <div onClick={onClick} style={{ border: isSelected ? '2px solid green' : '1px solid gray', padding: '5%', borderRadius: '2%' }}>
      <h3>{lineage.name}</h3>
      <p>{lineage.description}</p>
    </div>
  );
}