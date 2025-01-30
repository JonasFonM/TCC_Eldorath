import { character, item } from "@prisma/client";
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { ItemCircle } from "~/components/item-circle";
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


    return json({ userId, items, character, characterId, referer });
}

export const action: ActionFunction = async ({ request, params }) => {
    const form = await request.formData();
    const selectedItems = form.getAll('items') as string[];
    const selectedItemIds = selectedItems.map(id => parseInt(id))
    const characterId = params.id


    try {
        await submitStartingCharItems(selectedItemIds, Number(characterId))
        return redirect(`/user/character/${characterId}/stats`);

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


    const handleItemClick = (itemId: number, cost: number) => {
        setSelectedItems((prevItems) => {
            const isSelected = prevItems.includes(itemId);
            let newCost = selectedCost;

            if (isSelected) {

                newCost -= cost;
                setSelectedCost(newCost);
                return prevItems.filter(id => id !== itemId);

            } else {

                if (newCost + cost > maxCost) {
                    setError("Você não pode pagar este item.");
                    return prevItems;

                } else {
                    newCost += cost;
                    setSelectedCost(newCost);
                    setError(null);
                    return [...prevItems, itemId];
                }
            }
        });
    };



    return (
        <form method="post">
            <h1 className="title-container">Inventário<NavLink style={{ color: 'red' }} className={'question-button'} to={referer}>X</NavLink></h1>
            <h1>Armas</h1>
            <div className="items-grid">
                {items.map(item => (
                    <ItemCircle
                        key={item.id}
                        item={item}
                        isSelected={selectedItems.includes(item.id)}
                        onClick={() => !isMaxSelected || selectedItems.includes(item.id) ? handleItemClick(item.id, item.baseCost) : null}
                    />
                ))}
            </div>
            {selectedItems.map(itemId => (
                <input type="hidden" key={itemId} name="items" value={itemId} />
            ))}

            <h1>Armaduras</h1>
            <div className="items-grid">
                {items.map(item => (
                    <ItemCircle
                        key={item.id}
                        item={item}
                        isSelected={selectedItems.includes(item.id)}
                        onClick={() => !isMaxSelected || selectedItems.includes(item.id) ? handleItemClick(item.id, item.baseCost) : null}
                    />
                ))}
            </div>
            {selectedItems.map(itemId => (
                <input type="hidden" key={itemId} name="items" value={itemId} />
            ))}
            <div className="dice-box">
                <h2>Auramares: {character.gold - selectedCost}</h2>
                {error && <p>{error}</p>}
                <button type="submit" className="button">Confirmar</button>
            </div>
        </form>
    );
}