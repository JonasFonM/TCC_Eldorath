/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { character } from '@prisma/client'
import { NavLink, } from '@remix-run/react'
import { DeleteConfirm } from './delete-confirmation'
import { useState } from 'react'

interface props {
  character: character
  className?: string
}


export function CharacterCircle({ character }: props) {

  const [selectedDelete, setSelectedDelete] = useState<number>(0);

  const showDelete = () => {
    setSelectedDelete(() => {
      return character.id;
    });
  };

  const cancelDelete = () => {
    setSelectedDelete(() => {
      return 0
    });
  };

  return (
    <>

      <h2 className='title-container'>
        
        <NavLink style={{textDecoration: 'none', color: 'white'}} to={`/user/character/${character.id}/stats/`}>{character.name.toUpperCase()}</NavLink>

        <DeleteConfirm name={character.name} isHidden={selectedDelete === 0} onShow={showDelete} onCancel={cancelDelete} entity={"character"} id={String(character.id)} />
      </h2>

    </>
  )
}