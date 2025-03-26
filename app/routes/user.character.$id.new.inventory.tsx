import { character, item } from "@prisma/client";
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { requireUserId } from "~/utils/auth.server";
import { submitStartingCharItems } from "~/utils/inventory.server";
import { prisma } from "~/utils/prisma.server";

export const loader: LoaderFunction = async ({ request, params }) => {
    const userId = await requireUserId(request)


    const referer = request.headers.get("Referer") || "/";

    const characterId = Number(params.id)

    const character = await prisma.character.findUnique({
        where: { id: characterId },
    })

    const items = await prisma.item.findMany({
        where: {
            baseCost: { lte: 500 }
        },
    })

    const isAuthor = userId === character?.authorId;
    return isAuthor ? ({ userId, items, character, characterId, referer }) :
        redirect(`/user/character/${characterId}/inventory`);
}

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
    const { items, character, referer } = useLoaderData<{ items: item[]; character: character, referer: string }>();
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectedCost, setSelectedCost] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const maxCost = character.gold;

    const isMaxSelected = selectedCost >= maxCost;


    const handleItemPlus = (itemId: number, cost: number) => {
        setSelectedItems((prevItems) => {
            let newCost = selectedCost;

            if (newCost + cost > maxCost) {
                setError("Você não pode pagar este item.");
                return prevItems;

            }
            newCost += cost;
            setSelectedCost(newCost);
            setError(null);
            console.log([...prevItems, itemId])
            return [...prevItems, itemId];

        });
    }
    const handleItemMinus = (itemId: number, cost: number) => {
        setSelectedItems((prevItems) => {
            const isSelected = prevItems.includes(itemId);
            let newCost = selectedCost;


            if (isSelected) {
                newCost -= cost;
                setSelectedCost(newCost);
                const sameIdItems = prevItems.filter(i => i === itemId)
                const differentIdItems = prevItems.filter(i => i !== itemId)

                const index = sameIdItems.lastIndexOf(itemId)

                const newItemList = differentIdItems.concat(sameIdItems.slice(0, index))
                console.log(newItemList)

                return newItemList;

            }

            if (newCost + cost > maxCost) {
                setError("Você não pode pagar este item.");
                return prevItems;

            }

            return prevItems;

        });
    }


    return (
        <form method="post">
            <h1 className="title-container">Inventário<NavLink style={{ color: 'red' }} className={'question-button'} to={referer}>X</NavLink></h1>
            <h2>Escolha seus itens iniciais</h2>
            <h2>Drakas : {character.gold - selectedCost}</h2>
            {error && <p>{error}</p>}

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

                        <div className="col-4">
                            <button type="button" className="button" onClick={() => handleItemMinus(item.id, item.baseCost)}>-</button>
                        </div>

                        <div className="col-4">
                            <p>{selectedItems.filter(i => i === item.id).length || 0}</p>
                        </div>

                        <div className="col-4">
                            <button type="button" className="button" onClick={() => handleItemPlus(item.id, item.baseCost)}>+</button>
                        </div>


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