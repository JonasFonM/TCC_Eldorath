import { character } from '@prisma/client'
import { CharacterCircle } from '~/components/character-circle'
import "~/styles.css";

export function CharacterPanel({ characters }: { characters: character[] }) {
    return (
        <div>
            <div>
                <h2>Character List</h2>
            </div>
            <div>
                {characters.map(character => (
                    <CharacterCircle key={character.id} character={character} className="block" />
                ))}
            </div>
        </div>
    )
}