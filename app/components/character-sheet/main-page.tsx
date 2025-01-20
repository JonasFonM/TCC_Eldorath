import { character } from "@prisma/client";
import { NavLink } from "@remix-run/react";

interface Props {
    character: character

}


export function CharacterSheet({ character }: Props) {

    return (
        <>


            <div className="title-container">
                <NavLink style={{ marginTop: '0', marginBottom: '0', padding: '0' }} to={`/user/character/update/${String(character.id)}/basic`}> <h1 style={{ marginTop: '0', marginBottom: '0', padding: '0' }}> Atributos </h1></NavLink>
                <NavLink className="question-button" to={`/user/home/atr/`}>?</NavLink>
            </div>


            <div className="container">
                <div className="block"><h1>{character.agility}</h1><p style={{ fontFamily: 'serif', fontSize: '1.35rem', fontWeight: 'bolder' }}>AGI</p></div>
                <div className="block"><h1>{character.body}</h1><p style={{ fontFamily: 'serif', fontSize: '1.35rem', fontWeight: 'bolder' }}>COR</p></div>
                <div className="block"><h1>{character.mind}</h1><p style={{ fontFamily: 'serif', fontSize: '1.35rem', fontWeight: 'bolder' }}>MEN</p></div>
            </div>


            <h1>Estatísticas</h1>
            <h2>Recursos</h2>

            <div className="container">

                <div className="block"><h1>{character.vitality}</h1>Vitalidade</div>
                <div className="block"><h1>{character.vigor}</h1>Vigor</div>
                <div className="block"><h1>{character.power}</h1>Poder</div>
            </div>
            <h2>Combate</h2>

            <div className="container">

                <div className="block"><h1>{character.defense}</h1>Defesa</div>
                <div className="block"><h1>{character.initiative}</h1>Iniciativa</div>
                <div className="block"><h1>{character.trueSize}</h1>Tamanho Real</div>
                <div className="block"><h1>{character.relativeSize}</h1>Tamanho Relativo</div>

            </div>
            <h2>Carga</h2>

            <div className="container">

                <div className="block"><h1>{character.baseWeight}</h1>Peso</div>
                <div className="block"><h1>{character.carryCap}</h1>Capacidade de Carga</div>
                <div className="block"><h1>{character.liftCap}</h1>Capacidade de Levantamento</div>

            </div>


            <h1>Resistências</h1>

            <h3>Resistência Total</h3>
            <div className="container">
                <div className="block">Total: {character.fullRes}</div>
            </div>

            <h3>Resistências Físicas</h3>

            <div className="container">
                <div className="block">Impacto: {character.impactRes}</div>
                <div className="block">Perfuração: {character.pierceRes}</div>
                <div className="block">Corte: {character.slashRes}</div>
            </div>

            <h3>Resistências Mágicas</h3>

            <div className="container">
                <div className="block">Ácida: {character.acidRes}</div>
                <div className="block">Gélida: {character.coldRes}</div>
                <div className="block">Flamejante: {character.fireRes}</div>
                <div className="block">Elétrica: {character.lightningRes}</div>
                <div className="block">Arcana: {character.arcaneRes}</div>
                <div className="block">Cósmica: {character.cosmicRes}</div>
                <div className="block">Psíquica: {character.psychicRes}</div>
                <div className="block">Profana: {character.profaneRes}</div>
                <div className="block">Sagrada: {character.sacredRes}</div>
            </div>
        </>

    );
}