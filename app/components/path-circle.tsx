/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { path } from '@prisma/client';

interface Props {
  path: path;
  isSelected: boolean;
  onClick: () => void;
}

export function PathCircle({ path, isSelected, onClick }: Props) {
  return (
    <div onClick={onClick} style={{ border: isSelected ? '2px solid green' : '1px solid gray', padding: '5%', borderRadius: '2%' }}>
      <h3>{path.name}</h3>
      <p>{path.description}</p>
    </div>
  );
}