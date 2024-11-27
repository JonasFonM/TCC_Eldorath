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
        <>
            <div className="col-12">

                <h1 className="title-container">Atributos<NavLink className="question-button" to={`/user/character/update/${String(character.id)}/basic`}>!</NavLink></h1>

                <div className="container">
                    <div className="block"><h1>{character.agility}</h1><p style={{ fontFamily: 'serif', fontSize: '1.35rem', fontWeight: 'bolder' }}>AGI</p></div>
                    <div className="block"><h1>{character.body}</h1><p style={{ fontFamily: 'serif', fontSize: '1.35rem', fontWeight: 'bolder' }}>COR</p></div>
                    <div className="block"><h1>{character.mind}</h1><p style={{ fontFamily: 'serif', fontSize: '1.35rem', fontWeight: 'bolder' }}>MEN</p></div>
                </div>

            </div>

            <h1>Estatísticas</h1>
            <h2>Recursos</h2>

            <div className="container">

                <div className="block"><h1>{stats.vitality}</h1>Vitalidade</div>
                <div className="block"><h1>{stats.vigor}</h1>Vigor</div>
                <div className="block"><h1>{stats.power}</h1>Poder</div>
            </div>
            <h2>Combate</h2>

            <div className="container">

                <div className="block"><h1>{stats.defense}</h1>Defesa</div>
                <div className="block"><h1>{stats.initiative}</h1>Iniciativa</div>
                <div className="block"><h1>{stats.speed}</h1>Velocidade</div>

            </div>
            <h2>Carga</h2>

            <div className="container">

                <div className="block"><h1>{stats.baseWeight}</h1>Peso</div>
                <div className="block"><h1>{stats.carryCap}</h1>Capacidade de Carga</div>
                <div className="block"><h1>{stats.liftCap}</h1>Capacidade de Levantamento</div>

            </div>


            <h1>Resistências</h1>

            <h3>Resistências Físicas</h3>

            <div className="container">
                <div className="block">Impacto: {resistances.impactRes}</div>
                <div className="block">Perfuração: {resistances.pierceRes}</div>
                <div className="block">Corte: {resistances.slashRes}</div>
            </div>

            <h3>Resistências Mágicas</h3>

            <div className="container">
                <div className="block">Ácida: {resistances.acidRes}</div>
                <div className="block">Gélida: {resistances.coldRes}</div>
                <div className="block">Flamejante: {resistances.fireRes}</div>
                <div className="block">Elétrica: {resistances.lightningRes}</div>
                <div className="block">Arcana: {resistances.arcaneRes}</div>
                <div className="block">Cósmica: {resistances.cosmicRes}</div>
                <div className="block">Psíquica: {resistances.psychicRes}</div>
                <div className="block">Maligna: {resistances.occultRes}</div>
                <div className="block">Profana: {resistances.profaneRes}</div>
                <div className="block">Sagrada: {resistances.sacredRes}</div>
            </div>
        </>

    );
}