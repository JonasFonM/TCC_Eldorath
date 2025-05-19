import { character, item } from "@prisma/client";
import { ActionFunction, json, redirect } from "@remix-run/node";
import { useOutletContext } from "@remix-run/react";
import React, { useRef, useState } from "react";
import { TableHead } from "~/components/character-sheet/general-table";
import { submitStartingCharItems } from "~/utils/inventory.server";
import { translateSlotTypes } from "./user.character";

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
    const show = useRef<number[]>([]);

    const forceUpdate = useState(0)[1];

    const showRow = (n: number) => {
        if (show.current.includes(n)) {
            const newShow = show.current.filter(ns => ns != n)
            show.current = newShow
            return forceUpdate(n => n + 1);
        }
        show.current.push(n);
        return forceUpdate(n => n + 1);

    }

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
            <form method="post">
                <h1 className="title-container">Itens Iniciais</h1>
                <h2>Escolha seus itens iniciais</h2>
                <h3>*Drakas não gastos podem ser usados em jogo</h3>
                <h2>Drakas : {character.gold - selectedCost}</h2>

                <div className="items-grid">
                    {slotTypes.map((st, index) =>
                        <React.Fragment key={st}>
                            <table>
                                <TableHead
                                    tableTitles={[translateSlotTypes[st]]}
                                    onClick={() => showRow(index)}
                                    open={show.current.includes(index)}
                                />
                            </table>
                            {items.filter(i => i.type === st).map(item => (
                                <div
                                    key={item.id}
                                    className='container'
                                    style={{
                                        display: show.current.includes(index) ? '' : 'none',
                                        border: selectedItems.includes(item.id) ? '1px solid green' : '1px solid gray',
                                        borderRadius: '2%'
                                    }}>

                                    <div className="col-12">
                                        <h3 style={{ color: 'gold' }}>{item.name}</h3>
                                        <p>{item.description}</p>
                                    </div>

                                    <div className='col-12'>
                                        <p>Custo: {item.baseCost}</p>
                                        <p>Peso: {item.baseWeight}</p>
                                        {item.type === 'slotWeapon'
                                            ? <p>Alcance: {item.baseReach}</p>
                                            : <p>Defesa: {item.baseDefense}</p>
                                        }
                                    </div>

                                    <div className="col-5">
                                        <button type="button" className="button" onClick={() => handleItemMinus(item.id, item.baseCost)}>-</button>
                                    </div>

                                    <div className="col-2">
                                        {selectedItems.filter(i => i === item.id).length || 0}
                                    </div>

                                    <div className="col-5">
                                        <button type="button" className="button" onClick={() => handleItemPlus(item.id, item.baseCost)}>+</button>
                                    </div>
                                    {item.baseCost > maxCost - selectedCost ? error && <p className="error" >{error}</p> : ''}


                                </div >

                            ))}
                        </React.Fragment>

                    )}

                </div >
                {
                    selectedItems.map((itemId, index) => (
                        <input type="hidden" key={`${index} ${itemId}`} name="items" value={itemId} />
                    ))
                }

                <button type="submit" className="button"> Próximo</button>

            </form>

        </>
    );
}