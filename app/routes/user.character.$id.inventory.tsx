/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink, useOutletContext } from "@remix-run/react";
import { armor, character_armor, character_weapon, weapon } from "@prisma/client";
import { CharacterWeaponCircle } from "~/components/c-weapon-circle";
import { CharacterArmorCircle } from "~/components/c-armor-circle";

export default function SkillsRoute() {
    const { weapons, armors, stats, character } = useOutletContext<{ character: any, stats: any, weapons: (character_weapon & { weapon: weapon })[], armors: (character_armor & { armor: armor })[] }>();
    const characterId = String(character?.id)

    return (
        <>
            <div className="col-12">
                <h1 className="title-container">Inventário<NavLink style={{ color: 'blue' }} className={'question-button'} to={`../../new/${characterId}/inventory/`}>+</NavLink></h1>
                <h3>Auramares: {character.gold}</h3>
                <h3>Peso Carregado: {weapons.map(weapons => weapons.weight).reduce((accumulator, currentValue) => accumulator + currentValue, 0)}/{stats.carryCap}</h3>
                <h1>Armas</h1>
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
                <h1>Armaduras</h1>
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
            </div>
        </>
    )
}
