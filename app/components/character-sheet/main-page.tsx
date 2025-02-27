import { character } from "@prisma/client";
import { NavLink } from "@remix-run/react";
import { GeneralExplain } from "../explanations/general-explain";
import { useState } from "react";
import { ResetConfirm } from "./reset-confirm";

interface Props {
    character: character,
    isAuthor: boolean
}

export function CharacterSheet({ character, isAuthor }: Props) {
    const [showAtr, setShowAtr] = useState<number>();
    const [selectReset, setReset] = useState<number>(0);

    const showReset = () => {
        setReset(() => {
            return character.id;
        });
    };

    const cancelReset = () => {
        setReset(() => {
            return 0
        });
    };

    return (
        <>
            <h1 className="title-container">
                {isAuthor ?
                    <NavLink to={`/user/character/update/${String(character.id)}/basic`} className={'lineBtn'}>Atributos</NavLink>
                    :
                    'Atributos'
                }

                <button onClick={() => setShowAtr(1)} className="question-button">?</button>

                {isAuthor ?
                    <ResetConfirm name={character.name} isHidden={selectReset === 0} onShow={showReset} onCancel={cancelReset} id={String(character.id)} />
                    :
                    ''
                }
            </h1>

            <GeneralExplain style={'linear-gradient(to bottom, white, gold)'} color={'black'} title={'Atributos'} description="Atributos são os valores que representam seus limites e capacidades." isHidden={showAtr != 1} onCancel={() => setShowAtr(0)} />

            <h1 className="title-container">Básicos<button onClick={() => setShowAtr(2)} className="question-button">?</button></h1>
            <GeneralExplain style={'linear-gradient(to bottom, white, grey)'} color={'black'} title={'Básicos'} description="Atributos Básicos são os valores principais para determinar as suas aptidões. Eles afetam seus Atributos Derivados e cada um tem funções especiais." isHidden={showAtr != 2} onCancel={() => setShowAtr(0)} />

            <div className="container">
                <button onClick={() => setShowAtr(3)} className="block"><h1>{character.agility}</h1><p className="Atr">AGI</p></button>
                <GeneralExplain style={'linear-gradient(to bottom, white, #07bc5d)'} color={'black'} title={'Agilidade'} description="Agilidade é usada para Acertar Ataques Físicos, além de ser a base principal da sua Iniciativa e da sua Esquiva." isHidden={showAtr != 3} onCancel={() => setShowAtr(0)} />

                <button onClick={() => setShowAtr(4)} className="block"><h1>{character.body}</h1><p className="Atr">COR</p></button>
                <GeneralExplain style={'linear-gradient(to bottom, white, #ec4010)'} color={'black'} title={'Corpo'} description="Corpo é somado no Dano dos seus Ataques Físicos, além de ser uma base da sua Vitalidade, Vigor, Peso, Capacidade de Carga e Capacidade de Levantamento" isHidden={showAtr != 4} onCancel={() => setShowAtr(0)} />

                <button onClick={() => setShowAtr(5)} className="block"><h1>{character.mind}</h1><p className="Atr">MEN</p></button>
                <GeneralExplain style={'linear-gradient(to bottom, white, #1004e7)'} color={'white'} title={'Mente'} description="Mente é usada para Acertar Ataques Mágicos, além de ser uma base do seu Vigor e do seu Poder" isHidden={showAtr != 5} onCancel={() => setShowAtr(0)} />

            </div>


            <h1 className="title-container">Derivados<button onClick={() => setShowAtr(6)} className="question-button">?</button></h1>
            <GeneralExplain style={'linear-gradient(to bottom, white, grey)'} color={'black'} title={'Derivados'} description="Atributos Derivados são valores secundários. Eles são calculados a partir dos seus Atributos Básicos e podem ser afetados por outros fatores." isHidden={showAtr != 6} onCancel={() => setShowAtr(0)} />



            <h2 className="title-container">Recursos<button onClick={() => setShowAtr(7)} className="question-button">?</button></h2>
            <GeneralExplain style={'linear-gradient(to bottom, white, gold)'} color={'black'} title={'Recursos'} description="Atributos Derivados são valores secundários. Eles são calculados a partir dos seus Atributos Básicos e podem ser afetados por outros fatores." isHidden={showAtr != 7} onCancel={() => setShowAtr(0)} />


            <div className="container">

                <button onClick={() => setShowAtr(8)} className="block"><h1>{character.vitality}</h1><p className="Atr">VIT</p></button>
                <GeneralExplain style={'linear-gradient(to bottom, white, #ec4010)'} color={'black'} title={'Vitalidade'} description="Vitalidade representa quantos pontos de Dano você pode sofrer antes de morrer. Ela é baseada no seu Corpo, Categoria, Tamanho Efetivo e suas escolhas de Caminho." isHidden={showAtr != 8} onCancel={() => setShowAtr(0)} />

                <button onClick={() => setShowAtr(9)} className="block"><h1>{character.vigor}</h1><p className="Atr">VIG</p></button>
                <GeneralExplain style={'linear-gradient(to bottom, white, #07bc5d)'} color={'black'} title={'Vigor'} description="Vigor limita quantas ações e/ou movimentos você pode fazer em um curto período de tempo como uma Cena ou um Turno. Ele é baseado no seu Nível, Corpo e Mente." isHidden={showAtr != 9} onCancel={() => setShowAtr(0)} />

                <button onClick={() => setShowAtr(10)} className="block"><h1>{character.vitality}</h1><p className="Atr">POD</p></button>
                <GeneralExplain style={'linear-gradient(to bottom, white, #1004e7)'} color={'white'} title={'Poder'} description="Poder limita quantas habilidades mágicas ou sobrenaturais você pode utilizar durante longos períodos de tempo sem Descansar, como um Dia inteiro. Ele é baseado na sua Mente, Categoria e suas escolhas de Caminho." isHidden={showAtr != 10} onCancel={() => setShowAtr(0)} />

            </div>

            <h2 className="title-container">Combate<button onClick={() => setShowAtr(11)} className="question-button">?</button></h2>
            <GeneralExplain style={'linear-gradient(to bottom, white, #ec4010)'} color={'black'} title={'Combate'} description="Atributos usados principalmente em Combate." isHidden={showAtr != 11} onCancel={() => setShowAtr(0)} />


            <div className="container">

                <button onClick={() => setShowAtr(12)} className="block"><h1>{character.defense}</h1><p className="Atr">EV</p></button>
                <GeneralExplain style={'linear-gradient(to bottom, white, #07bc5d)'} color={'black'} title={'Esquiva'} description="Esquiva representa a dificuldade de Acertar um Ataque em você. Ela é baseada na sua Agilidade e Equipamentos." isHidden={showAtr != 12} onCancel={() => setShowAtr(0)} />

                <button onClick={() => setShowAtr(13)} className="block"><h1>{character.initiative}</h1><p className="Atr">IN</p></button>
                <GeneralExplain style={'linear-gradient(to bottom, white, #07bc5d)'} color={'black'} title={'Iniciativa'} description="Iniciativa determina quando você age em combate, quanto maior sua Iniciativa, mais cedo você age em comparação aos outros. Ela é baseada na sua Agilidade." isHidden={showAtr != 13} onCancel={() => setShowAtr(0)} />

                <button onClick={() => setShowAtr(14)} className="block"><h1>{character.trueSize}</h1><p className="Atr">TR</p></button>
                <GeneralExplain style={'linear-gradient(to bottom, white, #ec4010)'} color={'black'} title={'Tamanho Real'} description="Tamanho Real determina quantos Espaços você ocupa em um mapa. Ele também influencia no seu Peso e no Alcance dos seus Ataques" isHidden={showAtr != 14} onCancel={() => setShowAtr(0)} />

                <button onClick={() => setShowAtr(15)} className="block"><h1>{character.relativeSize}</h1><p className="Atr">TE</p></button>
                <GeneralExplain style={'linear-gradient(to bottom, white, #ec4010)'} color={'black'} title={'Tamanho Efetivo'} description="Tamanho Efetivo é usado para determinar se você é capaz de realizar feitos de força condizentes com o seu Tamanho Real, se você está acima da média ou até abaixo. Ele influencia na sua Capacidade de Carga, Capacidade de Levantamento e Vitalidade." isHidden={showAtr != 15} onCancel={() => setShowAtr(0)} />

            </div>

            <h1 className="title-container">Carga<button className="question-button" onClick={() => setShowAtr(16)}>?</button></h1>

            <GeneralExplain style={'linear-gradient(to bottom, white, #ec4010)'} color={'black'} title={'Carga'} description="Cargas são unidades arbitrárias que representam uma combinação de volume e peso, a fim de simplificar o uso do Inventário." isHidden={showAtr != 16} onCancel={() => setShowAtr(0)} />

            <div className="container">

                <button onClick={() => setShowAtr(17)} className="block"><h1>{character.baseWeight}</h1><p className="Atr">PE</p></button>
                <GeneralExplain style={'linear-gradient(to bottom, white, #ec4010)'} color={'black'} title={'Peso'} description="Peso representa quantas Cargas você ocupa em um Inventário caso alguém tente Carregar ou Levantar você." isHidden={showAtr != 17} onCancel={() => setShowAtr(0)} />

                <button onClick={() => setShowAtr(18)} className="block"><h1>{character.carryCap}</h1><p className="Atr">CC</p></button>
                <GeneralExplain style={'linear-gradient(to bottom, white, #ec4010)'} color={'black'} title={'Capacidade de Carga'} description="Capacidade de Carga representa quantas Cargas você consegue ter passivamente no seu inventário antes de sofrer penalidades. Isso envolve itens vestidos, guardados em uma mochila, presos no cinto, entre outros." isHidden={showAtr != 18} onCancel={() => setShowAtr(0)} />

                <button onClick={() => setShowAtr(19)} className="block"><h1>{character.liftCap}</h1><p className="Atr">CL</p></button>
                <GeneralExplain style={'linear-gradient(to bottom, white, #ec4010)'} color={'black'} title={'Capacidade de Levantamento'} description="Capacidade de Levantamento representa quanto peso em Cargas você consegue manter ativamente acima do solo. Isso envolve remover uma pedra grande do seu caminho ou segurar um inimigo dramáticamente pelo pescoço." isHidden={showAtr != 19} onCancel={() => setShowAtr(0)} />

            </div>


            <h1 className="title-container">Defesas<button className="question-button" onClick={() => setShowAtr(20)}>?</button></h1>

            <GeneralExplain style={'linear-gradient(to bottom, white, white)'} color={'black'} title={'Defesas'} description="Defesas reduzem o Dano que você recebe em um valor fixo. Cada Defesa é aplicada para o seu Tipo de Dano específico." isHidden={showAtr != 20} onCancel={() => setShowAtr(0)} />


            <h3>Físicas</h3>

            <div className="container">
                <div className="block">Impacto: {character.impactRes}</div>
                <div className="block">Perfuração: {character.pierceRes}</div>
                <div className="block">Corte: {character.slashRes}</div>
            </div>

            <h3>Defesas Mágicas</h3>

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

            <h3 className="title-container">Total<button className="question-button" onClick={() => setShowAtr(21)}>?</button></h3>
            <GeneralExplain style={'linear-gradient(to bottom, white, gold)'} color={'black'} title={'Defesa Total'} description="Defesa Total é aplicada em cada Tipo de Dano que você sofrer, além da Defesa específica. Isto significa que um Ataque com dois tipos de Dano será reduzido pela sua Defesa Total 2 vezes!" isHidden={showAtr != 21} onCancel={() => setShowAtr(0)} />

            <div className="container">
                <div className="block">Total: {character.fullRes}</div>
            </div>
        </>

    );
}