/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { character } from '@prisma/client'
import { NavLink } from '@remix-run/react'

interface props {
character: character
className?: string
}

export function CharacterCircle({ character }: props) {
  return (
    <NavLink to={`/characters/${character.id}`}>
      <h2>
        {character.name.toUpperCase()}
      </h2>
    </NavLink>
  )
}