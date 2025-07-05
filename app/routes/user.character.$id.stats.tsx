/* eslint-disable @typescript-eslint/no-explicit-any */
import { useOutletContext } from "@remix-run/react";
import { useState } from "react";
import { ResetConfirm } from "~/components/character-sheet/reset-confirm";
import { GeneralExplain } from "~/components/explanations/general-explain";

export default function StatsRoute() {
    const { character, isAuthor, handleRollDice } = useOutletContext<{ character: any, isAuthor: boolean, handleRollDice: (amount: number, diceType: number, attributeName: string, attributeMod: number) => void }>();
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
            <div style={{ position: "sticky", top: '64px', zIndex: '1' }} className="title-input">
                <h1 className="title-container">Atributos
                    <button onClick={() => setShowAtr(1)} className="question-button">?</button>

                    {isAuthor
                        ? <button id="reset" type="button" onClick={showReset} className="question-button">R</button>
                        : ''
                    }
                </h1>
            </div>

            <GeneralExplain title={'Atributos'} description="Atributos são os valores que representam seus limites e capacidades." isHidden={showAtr != 1} onCancel={() => setShowAtr(0)} />
            <ResetConfirm name={character.name} isHidden={selectReset === 0} onCancel={cancelReset} id={String(character.id)} />

            <div className="title-input">
                <h1 className="title-container">
                    Básicos
                    <button onClick={() => setShowAtr(2)} className="question-button">?</button>
                </h1>
            </div>

            <GeneralExplain title={'Básicos'} description="Atributos Básicos são os valores principais para determinar as suas aptidões. O Mestre pode pedir um Teste de Atributo quando você tomar uma ação com certa dificuldade ou resistência." isHidden={showAtr != 2} onCancel={() => setShowAtr(0)} />
            <GeneralExplain title={'Agilidade'} description="Agilidade é usada para Acertar Ataques Físicos, além de ser a base principal da sua Defesa. Testes de Agilidade podem envolver: executar uma acrobacia perigosa, andar em uma corda sem perder o equilíbrio, se esconder nas sombras, entre outros." isHidden={showAtr != 3} onCancel={() => setShowAtr(0)} />
            <GeneralExplain title={'Corpo'} description="Corpo é somado no Dano dos seus Ataques Físicos, além de ser uma base da sua Vitalidade, Vigor, Peso, Capacidade de Carga e Capacidade de Levantamento. Testes de Corpo podem envolver: empurrar algo ou alguém muito pesado, resistir a um empurrão, manter o fôlego durante uma longa corrida, entre outros." isHidden={showAtr != 4} onCancel={() => setShowAtr(0)} />
            <GeneralExplain title={'Mente'} description="Mente é usada para Acertar Ataques Mágicos, além de ser uma base do seu Vigor e do seu Poder. Testes de Mente podem envolver: procurar por pistas ou rastros, identificar um item mágico, lembrar de alguma informação importante, entre outros." isHidden={showAtr != 5} onCancel={() => setShowAtr(0)} />

            <div className="calendar-box">
                <button onClick={() => setShowAtr(3)} className="block">
                    <h1>{character.agility}</h1>
                    <p className="Atr">AGI</p>
                </button>

                <button onClick={() => setShowAtr(4)} className="block">
                    <h1>{character.body}</h1>
                    <p className="Atr">COR</p>
                </button>

                <button onClick={() => setShowAtr(4)} className="block">
                    <h1>{character.mind}</h1>
                    <p className="Atr">MEN</p>
                </button>

                <button style={isAuthor ? {} : { display: 'none' }} onClick={() => handleRollDice(1, 6, 'Agilidade', character.agility)} className="block">
                    <p className="Atr">Fazer Teste</p>
                </button>

                <button style={isAuthor ? {} : { display: 'none' }} onClick={() => handleRollDice(1, 6, 'Corpo', character.body)} className="block">
                    <p className="Atr">Fazer Teste</p>
                </button>

                <button style={isAuthor ? {} : { display: 'none' }} onClick={() => handleRollDice(1, 6, 'Mente', character.mind)} className="block">
                    <p className="Atr">Fazer Teste</p>
                </button>
            </div>


            <div className="title-input">
                <h1 className="title-container">
                    Recursos
                    <button onClick={() => setShowAtr(7)} className="question-button">?</button>
                </h1>
            </div>

            <GeneralExplain title={'Recursos'} description="Recursos são Atributos que: ou você gasta para fazer algumas Ações, ou você perde quando for Alvo de um Ataque ou Efeito." isHidden={showAtr != 7} onCancel={() => setShowAtr(0)} />


            <div className="calendar-box">

                <button onClick={() => setShowAtr(8)} className="block">
                    <h1>{character.currentVitality}/{character.vitality}</h1>
                    <p className="Atr">VIT</p>
                </button>
                <GeneralExplain title={'Vitalidade'} description="Vitalidade representa quantos pontos de Dano você pode sofrer antes de morrer. Ela é baseada no seu Corpo, Categoria, Tamanho Efetivo e suas escolhas de Caminho." isHidden={showAtr != 8} onCancel={() => setShowAtr(0)} />

                <button onClick={() => setShowAtr(9)} className="block">
                    <h1>{character.currentVigor}/{character.vigor}</h1>
                    <p className="Atr">VIG</p>
                </button>
                <GeneralExplain title={'Vigor'} description="Vigor limita quantas ações e/ou movimentos você pode fazer em um curto período de tempo como uma Cena ou um Turno. Ele é baseado no seu Nível, Corpo e Mente." isHidden={showAtr != 9} onCancel={() => setShowAtr(0)} />

                <button onClick={() => setShowAtr(10)} className="block">
                    <h1>{character.currentPower}/{character.power}</h1>
                    <p className="Atr">POD</p>
                </button>
                <GeneralExplain title={'Poder'} description="Poder limita quantas habilidades mágicas ou sobrenaturais você pode utilizar durante longos períodos de tempo sem Descansar, como um Dia inteiro. Ele é baseado na sua Mente, Categoria e suas escolhas de Caminho." isHidden={showAtr != 10} onCancel={() => setShowAtr(0)} />

            </div>

            <div className="title-input">
                <h1 className="title-container">
                    Combate
                    <button onClick={() => setShowAtr(11)} className="question-button">?</button>
                </h1>
            </div>

            <GeneralExplain title={'Combate'} description="Atributos usados principalmente em Combate." isHidden={showAtr != 11} onCancel={() => setShowAtr(0)} />


            <div className="calendar-box">

                <button onClick={() => setShowAtr(12)} className="block"><h1>{character.defense}</h1><p className="Atr">DF</p></button>
                <GeneralExplain title={'Defesa'} description="Defesa reduz o Dano Físico que você recebe em um valor fixo. Ela é baseada na sua Agilidade e Itens Equipados." isHidden={showAtr != 12} onCancel={() => setShowAtr(0)} />

                <button onClick={() => setShowAtr(13)} className="block"><h1>{character.magicDefense}</h1><p className="Atr">DM</p></button>
                <GeneralExplain title={'Defesa Mágica'} description="Defesa Mágica reduz o Dano Mágico que você recebe em um valor fixo. Ela é baseada na sua Mente e Itens Equipados." isHidden={showAtr != 13} onCancel={() => setShowAtr(0)} />

                <button onClick={() => setShowAtr(14)} className="block"><h1>{character.trueSize}</h1><p className="Atr">TR</p></button>
                <GeneralExplain title={'Tamanho Real'} description="Tamanho Real determina quantos Espaços você ocupa em um mapa. Ele também influencia no seu Peso e no Alcance dos seus Ataques" isHidden={showAtr != 14} onCancel={() => setShowAtr(0)} />

                <button onClick={() => setShowAtr(15)} className="block"><h1>{character.effectiveSize}</h1><p className="Atr">TE</p></button>
                <GeneralExplain title={'Tamanho Efetivo'} description="Tamanho Efetivo é usado para determinar se você é capaz de realizar feitos de força condizentes com o seu Tamanho Real, se você está acima da média ou até abaixo. Ele influencia na sua Capacidade de Carga, Capacidade de Levantamento e Vitalidade." isHidden={showAtr != 15} onCancel={() => setShowAtr(0)} />

            </div>

            <div className="title-input">
                <h1 className="title-container">
                    Carga
                    <button className="question-button" onClick={() => setShowAtr(16)}>?</button>
                </h1>
            </div>

            <GeneralExplain title={'Carga'} description="Cargas são unidades arbitrárias que representam uma combinação de volume e peso, a fim de simplificar o uso do Inventário." isHidden={showAtr != 16} onCancel={() => setShowAtr(0)} />

            <div className="calendar-box">

                <button onClick={() => setShowAtr(17)} className="block"><h1>{character.baseWeight}</h1><p className="Atr">PE</p></button>
                <GeneralExplain title={'Peso'} description="Peso representa quantas Cargas você ocupa em um Inventário caso alguém tente Carregar ou Levantar você." isHidden={showAtr != 17} onCancel={() => setShowAtr(0)} />

                <button onClick={() => setShowAtr(18)} className="block"><h1>{character.carryCap}</h1><p className="Atr">CC</p></button>
                <GeneralExplain title={'Capacidade de Carga'} description="Capacidade de Carga representa quantas Cargas você consegue ter passivamente no seu inventário antes de sofrer penalidades. Isso envolve itens vestidos, guardados em uma mochila, presos no cinto, entre outros." isHidden={showAtr != 18} onCancel={() => setShowAtr(0)} />

                <button onClick={() => setShowAtr(19)} className="block"><h1>{character.liftCap}</h1><p className="Atr">CL</p></button>
                <GeneralExplain title={'Capacidade de Levantamento'} description="Capacidade de Levantamento representa quanto peso em Cargas você consegue manter ativamente acima do solo. Isso envolve remover uma pedra grande do seu caminho ou segurar um inimigo dramáticamente pelo pescoço." isHidden={showAtr != 19} onCancel={() => setShowAtr(0)} />

            </div>

        </>

    )
}