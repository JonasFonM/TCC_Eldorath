/* eslint-disable @typescript-eslint/no-unused-vars */
import { weapon, armor, training } from "@prisma/client";
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { WeaponCircle } from "~/components/weapon-circle";
import { ArmorCircle } from "~/components/armor-circle";
import { requireUserId } from "~/utils/auth.server";
import { submitCharWeapons, submitCharArmors } from "~/utils/inventory.server";
import { prisma } from "~/utils/prisma.server";
import { armorWithTraining, weaponWithTraining } from "~/utils/types.server";

export const loader: LoaderFunction = async ({ request }) => {
    const userId = await requireUserId(request)

    const weapons = await prisma.weapon.findMany()

    const armors = await prisma.armor.findMany()


    return json({ userId, weapons, armors });
}

export const action: ActionFunction = async ({ request, params }) => {
    const form = await request.formData();
    const selectedWeapons = form.getAll('weapons') as string[];
    const selectedWeaponIds = selectedWeapons.map(id => parseInt(id))
    const characterId = params.id

    if (!selectedWeapons || selectedWeapons.length === 0) {
        return json({ error: "You must select at least one weapon." }, { status: 400 });
    }
    try {
        await submitCharWeapons(selectedWeaponIds, Number(characterId))
        await prisma.charStats.delete({
            where: { characterId: Number(characterId) }
        })
        return redirect(`/characters/${characterId}/`)
    } catch (error) {
        console.error(error);
        return json({ error: "Failed to save weapons." }, { status: 500 });
    }

}

export default function WeaponSelection() {
    const { weapons, armors } = useLoaderData<{ weapons: weaponWithTraining; armors: armorWithTraining }>();
    const [selectedWeapons, setSelectedWeapons] = useState<number[]>([]);
    const [selectedArmors, setSelectedArmors] = useState<number[]>([]);
    const [error, setError] = useState<string | null>(null);
    const maxSelectable = 1;


    const isMaxSelected = selectedWeapons.length >= maxSelectable;


    const handleWeaponClick = (weaponId: number) => {
        setSelectedWeapons((prevWeapons) => {
            const isSelected = prevWeapons.includes(weaponId);

            const newSelectedWeapons = isSelected
                ? prevWeapons.filter(id => id !== weaponId)
                : [...prevWeapons, weaponId];

            if (newSelectedWeapons.length > 1) {
                setError("You can select only 1 weapon.");
                return prevWeapons;
            } else {
                setError(null);
            }

            return newSelectedWeapons;
        });
    };

    const handleArmorClick = (armorId: number) => {
        setSelectedArmors((prevArmors) => {
            const isSelected = prevArmors.includes(armorId);

            const newSelectedArmors = isSelected
                ? prevArmors.filter(id => id !== armorId)
                : [...prevArmors, armorId];

            if (newSelectedArmors.length > 1) {
                setError("You can select only 1 armor.");
                return prevArmors;
            } else {
                setError(null);
            }

            return newSelectedArmors;
        });
    };




    return (
        <form method="post">
            <div className="weapons-grid">
                {weapons.map(weapon => (
                    <WeaponCircle
                        key={weapon.id}
                        weapon={weapon}
                        isSelected={selectedWeapons.includes(weapon.id)}
                        onClick={() => !isMaxSelected || selectedWeapons.includes(weapon.id) ? handleWeaponClick(weapon.id) : null}
                    />
                ))}
            </div>
            {selectedWeapons.map(weaponId => (
                <input type="hidden" key={weaponId} name="weapons" value={weaponId} />
            ))}

            <div className="armors-grid">
                {armors.map(armor => (
                    <ArmorCircle
                        key={armor.id}
                        armor={armor}
                        training={armor.training}
                        isSelected={selectedArmors.includes(armor.id)}
                        onClick={() => !isMaxSelected || selectedArmors.includes(armor.id) ? handleArmorClick(armor.id) : null}
                    />
                ))}
            </div>
            {selectedArmors.map(armorId => (
                <input type="hidden" key={armorId} name="armors" value={armorId} />
            ))}

            {error && <p>{error}</p>}

            {error && <p>{error}</p>}

            <button type="submit" className="submit-button">Submit Items</button>
        </form>
    );
}