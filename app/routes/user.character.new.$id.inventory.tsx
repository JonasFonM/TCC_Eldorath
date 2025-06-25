import { character, item, itemType } from "@prisma/client";
import { ActionFunction, json, redirect } from "@remix-run/node";
import { useOutletContext } from "@remix-run/react";
import React, { useRef, useState } from "react";
import { TableHead } from "~/components/character-sheet/table-head";
import { submitStartingCharItems } from "~/utils/inventory.server";
import { translateSlotTypes } from "./user.character";
import { useShowRow } from "~/components/context-providers/showRowContext";
import { SpecialFooter } from "~/components/special-footer";
import { ItemHandler } from "~/components/character-sheet/item-handler";

export const action: ActionFunction = async ({ request, params }) => {
    const form = await request.formData();
    const selectedItems = form.getAll('items') as string[];
    const selectedItemIds = selectedItems.map(id => parseInt(id))
    const characterId = params.id


    try {
        await submitStartingCharItems(selectedItemIds, Number(characterId))
        return redirect(`/user/character/new/${characterId}/end/`);

    } catch (error) {
        console.error(error);
        return json({ error: "Failed to save items." }, { status: 500 });
    }

}

export default function ItemSelection() {
    const { items, character } = useOutletContext<{ items: item[]; character: character }>();
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectedCost, setSelectedCost] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const maxCost = character.gold;
    const { showRow, isShown } = useShowRow();


    const slotTypes = [
        'slotAccessory',
        'slotArmor',
        'slotWeapon',
        'consumable'
    ]

    const handleItemPlus = (itemId: number, cost: number) => {
        setSelectedItems((prevItems) => {
            let newCost = selectedCost;

            if (newCost + cost > maxCost) {
                setError("Você não pode pagar este item.");
                return prevItems;

            }
            newCost += cost;
            setSelectedCost(newCost);
            return [...prevItems, itemId];

        });
    }

    const handleItemMinus = (itemId: number, cost: number) => {

        setSelectedItems((prevItems) => {
            const index = prevItems.lastIndexOf(itemId);
            if (index === -1) return prevItems;

            let newCost = selectedCost - cost;
            setSelectedCost(newCost)

            const newItemList = [...prevItems.slice(0, index), ...prevItems.slice(index + 1)];

            return newItemList;
        });
    };


    return (
        <>
            <h1 className="title-input" style={{ position: 'sticky', top: '64px', backgroundColor: 'black' }}>Itens Iniciais</h1>
            <div className="container" style={{ position: 'sticky', top: '139px', backgroundColor: 'black', borderBottom: '1px solid gold' }}>
                <h3 className="col-12" style={{ margin: "2px" }}>Drakas : {character.gold - selectedCost}</h3>
                <h3 className="col-12" style={{ margin: "2px" }}>*Drakas não gastos podem ser usados em jogo</h3>
            </div>
            <form method="post">

                <div style={isShown(`TipoSlot-${3}`)
                    ? { paddingBottom: '200px' }
                    : {}
                }>
                    {slotTypes.map((st, index) =>
                        <React.Fragment key={st}>
                            <table>
                                <TableHead
                                    tableTitles={[translateSlotTypes[st]]}
                                    onClick={() => showRow(`TipoSlot-${index}`)}
                                    open={isShown(`TipoSlot-${index}`)}
                                    error={false}
                                />
                            </table>
                            {items.filter(i => i.type === st).map(item => (
                                <ItemHandler
                                    key={item.id}
                                    title={item.name}
                                    itemName={item.name}
                                    open={isShown(`TipoSlot-${index}`)}
                                    typeBasedStat={item.type === 'slotWeapon'
                                        ? 'Dano'
                                        : 'Defesa'
                                    }
                                    itemCost={item.baseCost}
                                    itemWeight={item.baseWeight}
                                    itemStat={item.type === 'slotWeapon'
                                        ? `${item.baseDamageDieCount}-${Number(item.baseDamageDieCount) * Number(item.baseDamageDie)}`
                                        : `${item.baseDefense}`
                                    }
                                    itemQuantity={selectedItems.filter(i => i === item.id).length}
                                    onPlus={() => handleItemPlus(item.id, item.baseCost)}
                                    onMinus={() => handleItemMinus(item.id, item.baseCost)}
                                />
                            ))}
                        </React.Fragment>

                    )}

                </div >

                {selectedItems.map((itemId, index) => (
                    <input type="hidden" key={`${index} ${itemId}`} name="items" value={itemId} />
                ))}

                <SpecialFooter
                    backBtnName={'Talentos'}
                    backLink={`/user/character/new/${character.id}/skills`}
                    advBtnName={selectedItems.length < 1
                        ? `Resumo`
                        : 'Confirmar'}
                    advLink={
                        selectedItems.length < 1
                            ? `/user/character/new/${character.id}/end/`
                            : null
                    }
                    showAdv={true}
                />
            </form>

        </>
    );
}