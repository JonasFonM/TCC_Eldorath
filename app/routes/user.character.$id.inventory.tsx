/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink, useOutletContext } from "@remix-run/react";
import { armor, character_armor, character_weapon, weapon } from "@prisma/client";
import { CharacterWeaponCircle } from "~/components/c-weapon-circle";
import { CharacterArmorCircle } from "~/components/c-armor-circle";

export default function SkillsRoute() {
    const { weapons, armors, character } = useOutletContext<{ character: any, weapons: (character_weapon & { weapon: weapon })[], armors: (character_armor & { armor: armor })[] }>();

    const { setChildData } = useOutletContext<{ setChildData: (data: any) => void }>();


    return (
        <>
            {setChildData([`Auramares: ${character.gold}`,
            `Peso Carregado: ${weapons.map(weapons => weapons.weight).reduce((accumulator, currentValue) => accumulator + currentValue, 0)}/${character.carryCap}`])}


            <div className="title-container">
                <NavLink to={`../new/inventory`}> <h1 style={{ marginTop: '0', marginBottom: '0', padding: '0' }}>Inventário</h1></NavLink>
                <NavLink className="question-button" to={`/user/home/atr/`}>?</NavLink>
            </div>


            <div className="title-container">
                <NavLink to={`../new/inventory/`}> <h1 style={{ marginTop: '0', marginBottom: '0', padding: '0' }}>Armas</h1></NavLink>
                <NavLink className="question-button" to={`/user/home/atr/`}>?</NavLink>
            </div>

            <div className="weapons-grid">
                {weapons.map(weapon => (
                    <CharacterWeaponCircle
                        key={weapon.id}
                        weapon={weapon}
                        isSelected={false}
                        onClick={() => null}
                    />
                ))}
            </div>

            <div className="title-container">
                <NavLink to={`../new/inventory/`}> <h1 style={{ marginTop: '0', marginBottom: '0', padding: '0' }}>Armaduras</h1></NavLink>
                <NavLink className="question-button" to={`/user/home/atr/`}>?</NavLink>
            </div>

            <div className="armors-grid">
                {armors.map(armor => (
                    <CharacterArmorCircle
                        key={armor.id}
                        armor={armor}
                        isSelected={false}
                        onClick={() => null}
                    />
                ))}
            </div>
        </>
    )
}
