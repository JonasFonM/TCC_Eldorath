import { character, item } from "@prisma/client";
import { ActionFunction, json, redirect } from "@remix-run/node";
import { useOutletContext } from "@remix-run/react";
import React, { useRef, useState } from "react";
import { TableHead } from "~/components/character-sheet/table-head";
import { submitStartingCharItems } from "~/utils/inventory.server";
import { translateSlotTypes } from "./user.character";
import { useShowRow } from "~/components/context-providers/showRowContext";

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

                <div className="items-grid">
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
                                <div
                                    key={item.id}
                                    className='container'
                                    style={{
                                        display: isShown(`TipoSlot-${index}`) ? '' : 'none',
                                        border: selectedItems.includes(item.id) ? '1px solid green' : '1px solid gray',
                                        borderRadius: '2%'
                                    }}>

                                    <div className="col-3">
                                        <button style={{ fontSize: '2rem' }} type="button" className="button" onClick={() => handleItemMinus(item.id, item.baseCost)}>-</button>
                                    </div>

                                    <div className="col-6">
                                        <div className="col-12">
                                            <h3 style={{ color: 'gold' }}>{item.name} {`(` + selectedItems.filter(i => i === item.id).length + `)`}</h3>
                                            <p>{item.description}</p>
                                        </div>
                                        <div className="col-4" >
                                            <h2 style={{ fontSize: "1.1rem" }}>Custo: </h2>
                                            <h1 style={{ fontSize: "1.1rem" }}>{item.baseCost}</h1>
                                        </div>
                                        <div className="col-4" >
                                            <h2 style={{ fontSize: "1.1rem" }}>Peso: </h2>
                                            <h1 style={{ fontSize: "1.1rem" }}>{item.baseWeight}</h1>
                                        </div>
                                        {item.type === 'slotWeapon'
                                            ? <div className="col-4" >
                                                <h2 style={{ fontSize: "1.1rem" }}>Alcance: </h2>
                                                <h1 style={{ fontSize: "1.1rem" }}>{item.baseReach}</h1>
                                            </div>
                                            : <div className="col-4" >
                                                <h2 style={{ fontSize: "1.1rem" }}>Defesa: </h2>
                                                <h1 style={{ fontSize: "1.1rem" }}>{item.baseDefense}</h1>
                                            </div>
                                        }
                                    </div>

                                    <div className="col-3">
                                        <button style={{ fontSize: '2rem' }} type="button" className="button" onClick={() => handleItemPlus(item.id, item.baseCost)}>+</button>
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

                <button type="submit" className="button">Avançar</button>

            </form>

        </>
    );
}