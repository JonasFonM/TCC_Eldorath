/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { character } from '@prisma/client'

interface props {
character: character
className?: string
  onClick?: (...args: any) => any
}

export function CharacterCircle({ character, onClick, className }: props) {
  return (
    <div
      className={`${className} cursor-pointer bg-gray-400 rounded-full flex justify-center items-center`}
      onClick={onClick}
    >
      <h2>
        {character.name.toUpperCase()}
      </h2>
    </div>
  )
}