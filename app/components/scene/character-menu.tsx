import "~/styles.css";
import { ResourceBar } from "./resource-bar";
import { character } from "@prisma/client";

interface Props {
    character: character;
    show: boolean;
    onClick: () => void;
    selected: boolean;
}
export function CharacterMenu({ show, onClick, selected, character }: Props) {

    return (
        <tbody>
            <tr className={selected ? 'selected' : ''} onClick={onClick} style={show ? {} : { display: 'none' }}>
                <td style={{ fontVariant: 'small-caps', fontSize: '1.3rem', fontFamily: 'serif' }}>{character.name}
                    <ResourceBar
                        color="darkred"
                        halvedColor="red"
                        currentValue={character.currentVitality}
                        maxValue={character.vitality}
                    />
                    <ResourceBar
                        color="darkgreen"
                        halvedColor="green"
                        currentValue={character.currentVigor}
                        maxValue={character.vigor}
                    />
                    <ResourceBar
                        color="darkcyan"
                        halvedColor="cyan"
                        currentValue={character.currentPower}
                        maxValue={character.power}
                    />
                </td>
            </tr>
        </tbody>
    )
}
