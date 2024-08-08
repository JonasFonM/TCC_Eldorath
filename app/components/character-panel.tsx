import { character } from '@prisma/client'
import { CharacterCircle } from '~/components/character-circle'
import "~/styles.css";

export function CharacterPanel({ characters }: { characters: character[] }) {
    return (
        <div>
            <div>
                <h1>Character List</h1>
            </div>
            <div>
                {characters.map(character => (
                    <CharacterCircle key={character.id} character={character} />
                ))}
            </div>
        </div>
    )
}
