/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { character } from '@prisma/client'
import { NavLink, } from '@remix-run/react'

interface props {
  character: character
}


export function CharacterCircle({ character }: props) {

  return (

    <NavLink style={{ textDecoration: 'none', color: 'white' }} to={`/user/character/${character.id}/stats/`}><h1 style={{ fontSize: '1.7rem' }}>{character.name}</h1></NavLink>

  )
}