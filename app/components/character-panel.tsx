import { character } from '@prisma/client'
import { CharacterCircle } from '~/components/character-circle'
import "~/styles.css";

export function CharacterPanel({ characters }: { characters: character[] }) {
    return (
        <div>
                {characters.map(character => (
                    <CharacterCircle key={character.id} character={character} />
                ))}
        </div>
    )
}
