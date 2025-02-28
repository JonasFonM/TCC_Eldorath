import { character } from '@prisma/client'
import "~/styles.css";
import { CharacterCircle } from './character-circle';

export function CharacterPanel({ characters, isAuthor }: { characters: character[], isAuthor: boolean }) {

    return (
        <div className='col-12'>

            {characters.map(character => (
                <CharacterCircle key={character.id} isAuthor={isAuthor} character={character} />
            ))}

        </div>
    )
}
