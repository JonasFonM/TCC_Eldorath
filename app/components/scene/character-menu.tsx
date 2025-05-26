import "~/styles.css";
import { ResourceBar } from "./resource-bar";

interface Props {
    name: string;
    show: boolean;
    error: boolean;
    vit: number;
    maxVit: number;
    vig: number;
    maxVig: number;
    pow: number;
    maxPow: number;
    onClick: () => void;
    selected: boolean;
}
export function CharacterMenu({ name, show, error, onClick, selected, vit, maxVit, vig, maxVig, pow, maxPow }: Props) {

    return (
        <tbody className={error ? 'error' : ''}>
            <tr className={selected ? 'selected' : ''} onClick={onClick} style={show ? {} : { display: 'none' }}>
                <td style={{ fontVariant: 'small-caps', fontSize: '1.3rem', fontFamily: 'serif' }}>{name}
                    <ResourceBar
                        color="darkred"
                        halvedColor="red"
                        currentValue={vit}
                        maxValue={maxVit}
                    />
                    <ResourceBar
                        color="darkgreen"
                        halvedColor="green"
                        currentValue={vig}
                        maxValue={maxVig}
                    />
                    <ResourceBar
                        color="darkcyan"
                        halvedColor="cyan"
                        currentValue={pow}
                        maxValue={maxPow}
                    />
                </td>
            </tr>
        </tbody>
    )
}
