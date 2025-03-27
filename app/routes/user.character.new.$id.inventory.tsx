import { character, item } from "@prisma/client";
import { ActionFunction, json, redirect } from "@remix-run/node";
import { NavLink, useOutletContext } from "@remix-run/react";
import { useState } from "react";
import { submitStartingCharItems } from "~/utils/inventory.server";

export const action: ActionFunction = async ({ request, params }) => {
    const form = await request.formData();
    const selectedItems = form.getAll('items') as string[];
    const selectedItemIds = selectedItems.map(id => parseInt(id))
    const characterId = params.id


    try {
        await submitStartingCharItems(selectedItemIds, Number(characterId))
        return redirect(`/user/character/${characterId}/inventory/`);

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
    const maxCost = 500;

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
        <form method="post">
            <h1 className="title-container">Inventário<NavLink style={{ color: 'red' }} className={'question-button'} to={`/user/character/${character.id}/inventory`}>X</NavLink></h1>
            <h2>Escolha seus itens iniciais</h2>
            <h2>Drakas : {character.gold - selectedCost}</h2>

            <div className="items-grid">

                {items.map(item => (
                    <div
                        key={item.id}
                        className='container'
                        style={{ border: selectedItems.includes(item.id) ? '1px solid green' : '1px solid gray', padding: '5%', borderRadius: '2%' }}>

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
                        {item.baseCost > maxCost - selectedCost ? error && <p className="form-error" >{error}</p> : ''}


                    </div >

                ))}
            </div>
            {selectedItems.map((itemId, index) => (
                <input type="hidden" key={`${index} ${itemId}`} name="items" value={itemId} />
            ))}

            <button type="submit" className="button">Confirmar</button>

        </form>
    );
}