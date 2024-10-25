import { character, resistances } from "@prisma/client";
import { NavLink } from "@remix-run/react";

interface Props {
    character: character,
    resistances: resistances;
    stats: {
        id: number;
        createdAt: string;
        resistanceId: number;
        vitality: number;
        vigor: number;
        power: number;
        speed: number;
        defense: number;
        initiative: number;
        trueSize: number;
        relativeSize: number;
        baseWeight: number;
        carryCap: number;
        liftCap: number;
        characterId: number;
    },
}


export function StatsAndRes({ character, resistances, stats }: Props) {

    return (
        <div>
            <h1>Progression</h1>

            <div className="container">
                <div className="block"><h1>{character.level}</h1>Level</div>
                <div className="block"><h1>{character.tier}</h1>Tier</div>
                <div className="block"><h1>{character.experience}/{(character.level+1)*4*character.tier}</h1>Experience</div>
            </div>

            <h1>Attributes</h1>


            <div className="container">
                <div className="block"><h1>{character.agility}</h1>Agility</div>
                <div className="block"><h1>{character.body}</h1>Body</div>
                <div className="block"><h1>{character.mind}</h1>Mind</div>
            </div>
            <NavLink to={`/character/update/${String(character.id)}/basic`} className="button">Reasign Attributes</NavLink>


            <h1>Stats</h1>

            <div className="container">
                <div className="block"><h1>{stats.vitality}</h1>Vitality</div>
                <div className="block"><h1>{stats.vigor}</h1>Vigor</div>
                <div className="block"><h1>{stats.power}</h1>Power</div>
                <div className="block"><h1>{stats.speed}</h1>Speed</div>
                <div className="block"><h1>{stats.defense}</h1>Defense</div>
                <div className="block"><h1>{stats.initiative}</h1>Initiative</div>
                <div className="block"><h1>{stats.baseWeight}</h1>Weight</div>
                <div className="block"><h1>{stats.carryCap}</h1>Carry Capacity</div>
                <div className="block"><h1>{stats.liftCap}</h1>Lifting Capacity</div>
            </div>

            <h1>Resistances</h1>

            <h3>Physical Resistances</h3>

            <div className="container">
                <div className="block">Impact Damage Resistance:{resistances.impactRes}</div>
                <div className="block">Piercing Damage Resistance:{resistances.pierceRes}</div>
                <div className="block">Slashing Damage Resistance:{resistances.slashRes}</div>
            </div>

            <h3>Magical Resistances</h3>

            <div className="container">
                <div className="block">Acid Damage Resistance:{resistances.acidRes}</div>
                <div className="block">Cold Damage Resistance:{resistances.coldRes}</div>
                <div className="block">Fire Damage Resistance:{resistances.fireRes}</div>
                <div className="block">Lightning Damage Resistance:{resistances.lightningRes}</div>
                <div className="block">Arcane Damage Resistance:{resistances.arcaneRes}</div>
                <div className="block">Cosmic Damage Resistance:{resistances.cosmicRes}</div>
                <div className="block">Psychic Damage Resistance:{resistances.psychicRes}</div>
                <div className="block">Occult Damage Resistance:{resistances.occultRes}</div>
                <div className="block">Profane Damage Resistance:{resistances.profaneRes}</div>
                <div className="block">Sacred Damage Resistance:{resistances.sacredRes}</div>
            </div>
        </div>

    );
}