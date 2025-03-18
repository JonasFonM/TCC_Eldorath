import { character, character_item, item } from "@prisma/client";


interface Props {
    character: character,
    items: (character_item & { item: item })[],
    onClick: () => void
}

export function ItemDisplay({ character, items, onClick }: Props) {


    let totalSlots = character.slotAmulet + character.slotBelt + character.slotCloak + character.slotCuirass + character.slotEarings + character.slotGauntlet + character.slotGreaves + character.slotHelm + character.slotPauldron + character.slotRings + character.slotUpperLegs + character.slotWeapon
    totalSlots % 2 === 0 ? totalSlots++ : totalSlots

    let headSlots = (character.slotHelm + character.slotEarings + character.slotCloak)
    headSlots % 2 === 0 ? headSlots++ : headSlots

    const renderRow = (slots: number[], row: number, totalColumns: number, slotTypes: string[]) => {
        const items: JSX.Element[] = [];
        const center = (totalColumns + 1) / 2
        const columnPlacement: number[][] = slots.map(() => []);

        slots.forEach((sl, index) => {
            let prevMin = Math.min(...columnPlacement[index - 1])
            let prevMax = Math.max(...columnPlacement[index - 1])

            for (let j = 0; j < sl; j++) {
                index != 0 ?
                    j % 2 < 1 ?
                        columnPlacement[index].push(prevMin - 1)
                        :
                        columnPlacement[index].push(prevMax + 1)
                    :
                    j === 0 ?
                        columnPlacement[index].push(center)
                        :
                        columnPlacement[index][columnPlacement[index].length - 1] < center ?
                            columnPlacement[index].push(columnPlacement[index][columnPlacement[index].length - 1] - 1)
                            :
                            columnPlacement[index].push(columnPlacement[index][columnPlacement[index].length - 1] + 1)

                console.log(columnPlacement)
                items.push(
                    <button key={`${index}-${j}`}
                        style={{ gridRow: row, gridColumn: columnPlacement[index][j] }}
                        className={`grid-item`}
                        onClick={onClick}
                    >{slotTypes[index].at(4) + ` ${index},${j}`}</button>
                )
            }

        }
        )
        return (items)
    }

    return (

        <>
            <div className="inventory" style={{ width: '100%', gridTemplateColumns: `repeat(${headSlots}, 1fr)` }}>
                {
                    renderRow([character.slotHelm, character.slotEarings, character.slotCloak], 1, headSlots, ['slotHelm', 'slotEarings', 'slotCloak'])}
            </div>

        </>
    )
};

