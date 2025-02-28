/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { character } from '@prisma/client'
import { NavLink, } from '@remix-run/react'
import { DeleteConfirm } from './delete-confirmation';
import { useState } from 'react';


interface props {
    character: character
    isAuthor: boolean
}


export function CharacterCircle({ character, isAuthor }: props) {
    const [selectedDelete, setSelectedDelete] = useState<number>(0);

    return (
        <div className='title-container'>

            <NavLink style={{ textDecoration: 'none', color: 'white' }} to={`/user/character/${character.id}/stats`}><h1 style={{ fontSize: '1.4rem' }}>{character.name}</h1></NavLink>
            {isAuthor ?
                <DeleteConfirm name={character.name} isHidden={selectedDelete != character.id} onShow={() => setSelectedDelete(character.id)} onCancel={() => setSelectedDelete(0)} entity={"character"} id={String(character.id)} />
                : ''
            }
        </div>

    )
}

