import { character } from '@prisma/client'
import { CharacterCircle } from '~/components/character-circle'
import "~/styles.css";
import { DeleteConfirm } from './delete-confirmation';
import { useState } from 'react';

export function CharacterPanel({ characters, isAuthor }: { characters: character[], isAuthor: boolean }) {

    const [selectedDelete, setSelectedDelete] = useState<number>(0);

    return (
        <div className='title-container'>
            {characters.map(character => (
                <CharacterCircle key={character.id} character={character} />
            ))}
            {isAuthor ?
                characters.map(character => (
                    <DeleteConfirm key={character.id} name={character.name} isHidden={selectedDelete === 0} onShow={() => setSelectedDelete(character.id)} onCancel={() => setSelectedDelete(0)} entity={"character"} id={String(character.id)} />
                ))
                :
                ''
            }

        </div>
    )
}
