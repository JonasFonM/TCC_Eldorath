import { character, character_item, item } from "@prisma/client";


interface Props {
    character: character,
    items: (character_item & { item: item })[],
    onClick: () => void
}

export function ItemDisplay({ character, items, onClick }: Props) {

    let totalSlots = Math.max(character.slotAmulet, character.slotBelt, character.slotCloak, character.slotCuirass, character.slotEarings, character.slotGauntlet, character.slotGreaves, character.slotHelm, character.slotPauldron, character.slotRings, character.slotUpperLegs, character.slotWeapon)
    totalSlots % 2 === 0 ? totalSlots++ : totalSlots

    const renderRow = (slots: number[], row: number, totalColumns: number, slotTypes: string[]) => {
        const items: JSX.Element[] = [];
        const center = (totalColumns + 1) / 2
        const columnPlacement: number[][] = slots.map(() => []);
        let prevMin = center
        let prevMax = center

        slots.forEach((sl, index) => {


            if (index != 0) {
                prevMin = Math.min(...columnPlacement[index - 1])
                prevMax = Math.max(...columnPlacement[index - 1])
            }

            for (let j = 0; j < sl; j++) {
                index != 0 ?
                    j % 2 < 1 ?
                        columnPlacement[index].push(prevMin - 1)
                        :
                        columnPlacement[index].push(prevMax + 1)
                    :
                    sl > 1 ?
                        j % 2 < 1 ?
                            columnPlacement[index].push(center - (Math.floor(j / 2) + 1))
                            :
                            columnPlacement[index].push(center + (Math.floor(j / 2) + 1))
                        :
                        columnPlacement[index].push(center)

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
            <div className="inventory"
                style={{ width: '100%', gridTemplateColumns: `repeat(${totalSlots}, 1fr)` }}>

                {renderRow([character.slotHelm, character.slotEarings], 1, totalSlots, ['slotHelm', 'slotEarings'])}

                {renderRow([character.slotCuirass, character.slotPauldron, character.slotCloak], 2, totalSlots, ['slotCuirass', 'slotPauldron', 'slotCloak ',])}

                {renderRow([character.slotAmulet, character.slotGauntlet,], 3, totalSlots, ['slotAmulet', 'slotGauntlet'])}

                {renderRow([character.slotRings], 4, totalSlots, ['slotRings'])}

                {renderRow([character.slotWeapon], 5, totalSlots, ['slotWeapon'])}

                {renderRow([character.slotBelt], 6, totalSlots, ['slotBelt'])}

                {renderRow([character.slotUpperLegs, character.slotGreaves], 7, totalSlots, ['slotUpperLegs', 'slotGreaves'])}

            </div>

        </>
    )
};

