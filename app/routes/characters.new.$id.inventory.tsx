import { character } from "@prisma/client";
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { WeaponCircle } from "~/components/weapon-circle";
import { ArmorCircle } from "~/components/armor-circle";
import { requireUserId } from "~/utils/auth.server";
import { submitCharWeapons, submitCharArmors } from "~/utils/inventory.server";
import { prisma } from "~/utils/prisma.server";
import { armorWithTraining, weaponWithTraining } from "~/utils/types.server";

export const loader: LoaderFunction = async ({ request, params }) => {
    const userId = await requireUserId(request)

    const characterId = Number(params.id)

    const character = await prisma.character.findUnique({
        where: { id: characterId },
    })

    const weapons = await prisma.weapon.findMany({
        where: {
            baseCost: { lte: 500 }
        },
        include: { training: true }
    })

    const armors = await prisma.armor.findMany({
        where: {
            baseCost: { lte: 500 }
        },
        include: { training: true }
    })


    return json({ userId, weapons, armors, character });
}

export const action: ActionFunction = async ({ request, params }) => {
    const form = await request.formData();
    const selectedWeapons = form.getAll('weapons') as string[];
    const selectedWeaponIds = selectedWeapons.map(id => parseInt(id))
    const selectedArmors = form.getAll('armors') as string[];
    const selectedArmorIds = selectedArmors.map(id => parseInt(id))
    const characterId = params.id

    try {
        await submitCharWeapons(selectedWeaponIds, Number(characterId))
        await submitCharArmors(selectedArmorIds, Number(characterId))
        await prisma.charStats.delete({
            where: { characterId: Number(characterId) }
        })
        return redirect(`/characters/${characterId}/`)
    } catch (error) {
        console.error(error);
        return json({ error: "Failed to save items." }, { status: 500 });
    }

}

export default function WeaponSelection() {
    const { weapons, armors, character } = useLoaderData<{ weapons: weaponWithTraining; armors: armorWithTraining; character: character }>();
    const [selectedWeapons, setSelectedWeapons] = useState<number[]>([]);
    const [selectedArmors, setSelectedArmors] = useState<number[]>([]);
    const [selectedCost, setSelectedCost] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);
    const maxCost = character.gold;


    const isMaxSelected = selectedCost >= maxCost;


    const handleWeaponClick = (weaponId: number, cost: number) => {
        setSelectedWeapons((prevWeapons) => {
            const isSelected = prevWeapons.includes(weaponId);
            let newCost = selectedCost;

            if (isSelected) {
                // If already selected, deselect and subtract cost
                newCost -= cost;
                setSelectedCost(newCost);
                return prevWeapons.filter(id => id !== weaponId);
            } else {
                // If not selected, check if adding this weapon exceeds the budget
                if (newCost + cost > maxCost) {
                    setError("You don't have enough gold.");
                    return prevWeapons; // No change
                } else {
                    newCost += cost;
                    setSelectedCost(newCost);
                    setError(null);
                    return [...prevWeapons, weaponId];
                }
            }
        });
    };

    const handleArmorClick = (armorId: number, cost: number) => {
        setSelectedArmors((prevArmors) => {
            const isSelected = prevArmors.includes(armorId);
            let newCost = selectedCost;

            if (isSelected) {
                // If already selected, deselect and subtract cost
                newCost -= cost;
                setSelectedCost(newCost);
                return prevArmors.filter(id => id !== armorId);
            } else {
                // If not selected, check if adding this armor exceeds the budget
                if (newCost + cost > maxCost) {
                    setError("You don't have enough gold.");
                    return prevArmors; // No change
                } else {
                    newCost += cost;
                    setSelectedCost(newCost);
                    setError(null);
                    return [...prevArmors, armorId];
                }
            }
        });
    };



    return (
        <form method="post">
            <h2>Gold:{character.gold - selectedCost}</h2>
            {error && <p>{error}</p>}

            <h1>Weapons</h1>
            <div className="weapons-grid">
                {weapons.map(weapon => (
                    <WeaponCircle
                        key={weapon.id}
                        weapon={weapon}
                        isSelected={selectedWeapons.includes(weapon.id)}
                        onClick={() => !isMaxSelected || selectedWeapons.includes(weapon.id) ? handleWeaponClick(weapon.id, weapon.baseCost) : null}
                    />
                ))}
            </div>
            {selectedWeapons.map(weaponId => (
                <input type="hidden" key={weaponId} name="weapons" value={weaponId} />
            ))}

            <h1>Armors</h1>
            <div className="armors-grid">
                {armors.map(armor => (
                    <ArmorCircle
                        key={armor.id}
                        armor={armor}
                        isSelected={selectedArmors.includes(armor.id)}
                        onClick={() => !isMaxSelected || selectedArmors.includes(armor.id) ? handleArmorClick(armor.id, armor.baseCost) : null}
                    />
                ))}
            </div>
            {selectedArmors.map(armorId => (
                <input type="hidden" key={armorId} name="armors" value={armorId} />
            ))}


            <button type="submit" className="button">Submit Items</button>
        </form>
    );
}