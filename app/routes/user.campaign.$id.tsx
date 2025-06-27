import { campaign, character, message, partyMembers,  user } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData, useNavigation } from "@remix-run/react";
import { prisma } from "~/utils/prisma.server";
import React, { useEffect, useRef } from "react";
import { SideBars } from "~/components/context-providers/side-bars";
import { getUserIdFromSession } from "~/utils/auth.server";
import { getAllCharactersFromUser } from "~/utils/character.server";
import { translateMonth, translateWeekDays } from "./user.campaign";
import { GeneralExplain } from "~/components/explanations/general-explain";
import { useShowRow } from "~/components/context-providers/showRowContext";
import MessageForm from "~/components/campaign/message-form";
import { MessageList } from "~/components/campaign/message-list";
import { useSidebar } from "~/components/context-providers/side-bar-context";
import { checkFriendshipStatus } from "~/utils/user.server";

export const loader: LoaderFunction = async ({ params, request }) => {
    const campaignId = Number(params.id);
    const userId = Number(await getUserIdFromSession(request))

    const campaign = await prisma.campaign.findUnique({
        where: { id: campaignId },
        include: { master: true, characters: true, players: true },
    });


    const party = await prisma.user.findMany({
        where:
            { id: { in: campaign?.players.map(pl => pl.userId) } }
    })

    const characters = await getAllCharactersFromUser(userId)

    const isMaster = Number(userId) === Number(campaign?.masterId)

    const isPlayer = campaign?.players.some(player => Number(player.userId) === Number(userId)) ?? false;


    const friendStatus = await checkFriendshipStatus(Number(userId), Number(campaign?.masterId))

    const isFriend = friendStatus === 'ACCEPTED'

    const campaignCharacter = campaign?.characters.find(cc => cc.campaignId == campaign.id && cc.authorId == userId)

    const messages = await prisma.message.findMany({
        where: {
            campaignId: campaignId
        },
        include: { user: true }
    });

    return ({ isMaster, isPlayer, isFriend, campaignCharacter, characters, campaign, party, campaignId, userId, messages })
}


export default function CampaignRoute() {
    const { isMaster,
        isPlayer,
        isFriend,
        campaignCharacter,
        characters,
        campaign,
        party,
        campaignId,
        userId,
        messages
    } =
        useLoaderData<{
            isMaster: boolean,
            isPlayer: boolean,
            isFriend: boolean,
            campaignCharacter: character,
            characters: character[],
            campaign: (campaign & { master: user, characters: character[], players: partyMembers[] }),
            party: user[],
            campaignId: number,
            userId: number,
            messages: (message & { user: user })[]
        }>()
    const { showRow, isShown } = useShowRow()
    const timeIcons = [
        "/Night.png",
        "/Dawn.png",
        "/Day.png",
        "/Dusk.png"
    ]
    const { isAllOpen, isHeaderOpen, isTempOpen } = useSidebar();

    function displayTimeIcon(i: number) {
        return timeIcons[i - 1]
    }

    const getCampaignAction = () => {
        if (isMaster) return [''].concat(party.map(p => `/user/home/profile/${p.id}`));
        if (isFriend && !isPlayer) return [`/user/campaign/${campaign.id}/join`];
        if (isPlayer && campaignCharacter) return [`/user/home/profile/${campaign.master.id}`, `/user/character/${campaignCharacter.id}/stats`, `/user/campaign/${campaignId}/remove/${campaignCharacter.id}`];
        if (isPlayer && !campaignCharacter) return [`/user/home/profile/${campaign.master.id}`, `/user/campaign/${campaignId}/quit/`];
        return [`/user/home/profile/${campaign.master.id}`]
    }
    const getActionNames = () => {
        if (isMaster) return ['Jogadores'].concat((party.map(p => `${p.username}`)));
        if (isFriend && !isPlayer) return [`Entrar na Campanha`];
        if (isPlayer && campaignCharacter) return ['Mestre', `${campaignCharacter.name}`, `Remover Personagem`];
        if (isPlayer && !campaignCharacter) return ['Mestre', `Sair da Campanha`];

        return [`Mestre`]
    }
    const bottomRef = useRef<HTMLDivElement>(null);
    const transition = useNavigation();

    useEffect(() => {
        if (transition.state === "idle" && bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages.length, transition.state]);

    const getStyle = () => {
        if (isAllOpen) {
            return { marginLeft: '20VW', marginRight: '20VW' }
        }
        if (isHeaderOpen) {
            return { marginRight: '20VW' }
        }
        if (isTempOpen) {
            return { marginLeft: '20VW' }
        }

    }

    return (
        <>
            <SideBars entity={campaign}
                title={campaign.title}
                subtitle={`Por ${campaign.master.username}`}
                tableHeaders={[]}
                tableDatas={[]}
                tableExplain={[]}
                footer={null}
                links={getCampaignAction()}
                linkNames={getActionNames()}
                temp={
                    <React.Fragment>
                        {isMaster || isPlayer
                            ?
                            <>
                                <h1 style={{ position: 'sticky', top: '0', zIndex: '1', margin: '0', paddingTop: '6px', paddingBottom: '6px', backgroundColor: '#111', borderBottom: '2px solid gold' }}>Mensagens</h1>

                                <MessageList messages={messages} masterId={campaign.masterId} />
                                <MessageForm campaignId={campaignId} userId={userId} />
                            </>
                            : ''
                        }
                        <div ref={bottomRef} />

                    </React.Fragment>

                }

            />

            <div className="user" style={getStyle()}>
                <h1 className="title-input" style={{ position: 'sticky', top: '64px' }}>{campaign.title}
                    {isShown('Calendario')
                        ? <h3 style={{ fontSize: '1.3rem' }}><button className="lineBtn" onClick={() => showRow('Calendario')}>Mostrar Descrição</button></h3>
                        : <h3 style={{ fontSize: '1.3rem' }}><button className="lineBtn" onClick={() => showRow('Calendario')}>Mostrar Calendário</button></h3>
                    }
                </h1>


                <div style={isShown('Calendario') ? {} : { display: 'none' }}>
                    <h2 className="title-input" style={{ color: "inherit" }}><button onClick={() => showRow("EDia")} className="lineBtn">{translateWeekDays(campaign.monthDay)}</button>,
                        Dia {campaign.monthDay} de <button onClick={() => showRow("EMes")} className="lineBtn">{translateMonth(campaign.month)}</button> de <button onClick={() => showRow("EAno")} className="lineBtn">{campaign.year}</button> - <button onClick={() => showRow("EEra")} className="lineBtn">E{campaign.era}</button></h2>

                    <div className="calendar-box container">


                        <div className="col-12">
                            <img alt={"Dia"}
                                style={{
                                    animation: 'fadeIn 0.3s ease-in-out',
                                    boxShadow: '0 0 8px 5px gold',
                                    transition: "fadeIn 0.3s ease-in-out",
                                    width: '100%',
                                    maxWidth: '550px'
                                }}
                                src={displayTimeIcon(Number(campaign.timeOfDay))} />
                        </div>
                        {isMaster
                            ?
                            <>
                                <NavLink to={`/user/campaign/${campaignId}/rtn/timeOfDay`} className={'col-6 button'}>Voltar Fase do Dia</NavLink>
                                <NavLink to={`/user/campaign/${campaignId}/adv/timeOfDay`} className={'col-6 button'}>Avançar Fase do Dia</NavLink>
                            </>
                            : ''
                        }
                    </div>

                    {isMaster
                        ? <>
                            <h1 className="title-input title-container">Controle do Dia <button className='question-button' onClick={() => showRow("EDia")}>?</button></h1>

                            <div className="calendar-box container">
                                <NavLink to={`/user/campaign/${campaignId}/rtn/monthDay`} className={'col-6 button'}>Voltar Dia</NavLink>
                                <NavLink to={`/user/campaign/${campaignId}/adv/monthDay`} className={'col-6 button'}>Avançar Dia</NavLink>
                            </div>

                            <h1 className="title-input title-container">Controle do Mês <button className='question-button' onClick={() => showRow("EMes")}>?</button></h1>

                            <div className="calendar-box container">
                                <NavLink to={`/user/campaign/${campaignId}/rtn/month`} className={'col-6 button'}>Voltar Mês</NavLink>
                                <NavLink to={`/user/campaign/${campaignId}/adv/month`} className={'col-6 button'}>Avançar Mês</NavLink>
                            </div>

                            <h1 className="title-input title-container">Controle do Ano <button className='question-button' onClick={() => showRow("EAno")}>?</button></h1>

                            <div className="calendar-box container">
                                <NavLink to={`/user/campaign/${campaignId}/rtn/year`} className={'col-6 button'}>Voltar Ano</NavLink>
                                <NavLink to={`/user/campaign/${campaignId}/adv/year`} className={'col-6 button'}>Avançar Ano</NavLink>
                            </div>

                            <h1 className="title-input title-container">Controle da Era <button className='question-button' onClick={() => showRow("EEra")}>?</button></h1>

                            <div className="calendar-box container">
                                <NavLink to={`/user/campaign/${campaignId}/rtn/era`} className={'col-6 button'}>Voltar Era</NavLink>
                                <NavLink to={`/user/campaign/${campaignId}/adv/era`} className={'col-6 button'}>Avançar Era</NavLink>
                            </div>
                        </>
                        : ''
                    }

                </div>

                <h2 style={isShown('Calendario') ? { display: 'none' } : { color: 'white' }} className="title-input title-container">A História até então...
                    <button style={isMaster ? {} : { display: 'none' }} onClick={() => showRow('EDescricao')} className="question-button">?</button>
                </h2>
                {isMaster && !isShown('Calendario')
                    ? <h2><NavLink className={'lineBtn'} to={`/user/campaign/${campaignId}/edit/`}>Editar Descrição</NavLink></h2>
                    : ''
                }
                <div className="calendar-box container" style={isShown('Calendario') ? { display: 'none' } : { justifyContent: 'center' }}>

                    <p style={{
                        textAlign: 'center',
                        wordBreak: 'break-word',
                        overflowX: 'hidden',
                        overflowY: 'auto',
                        fontSize: '1.1rem'
                    }}>{campaign.description}</p>
                </div>

                <GeneralExplain
                    title="Eras"
                    isHidden={!isShown("EEra")}
                    description="Eras são as maiores medidas de tempo usadas em Eldorath. A mudança de uma Era só ocorre em eventos cataclismicos onde paradigmas importantes da própria realidade são afetados. Como muitas espécies extremamente longevas compõem a demografia de Eldorath, a Era é mais importante que o Ano para determinar períodos históricos."
                    onCancel={() => showRow("EEra")}
                />
                <GeneralExplain
                    title="Anos"
                    isHidden={!isShown("EAno")}
                    description="Os anos em Eldorath duram exatamente 360 dias, e eles são divididos em quatro estações, cada uma durando 90 dias. O ano inicia no Verão, passa pelo Outono, depois o Inverno e por fim a Primavera."
                    onCancel={() => showRow("EAno")}
                />
                <GeneralExplain
                    title="Meses"
                    isHidden={!isShown("EMes")}
                    description="Cada mês em Eldorath é carregado de simbologia, tradições e fenômenos que se repetem anualmente. Há 12 meses por ano, e cada mês dura 5 semanas com 6 dias cada."
                    onCancel={() => showRow("EMes")}
                />
                <GeneralExplain
                    title="Dias"
                    isHidden={!isShown("EDia")}
                    description="Os dias da semana em Eldorath homenageiam divindades e forças ancestrais. Um Dia em Eldorath é separado em Fases: A Madrugada que se inicia à meia-noite, a Alvorada, às 6 horas da manhã, a Tarde, ao meio-dia e a Noite, às 18 horas."
                    onCancel={() => showRow("EDia")}
                />

                <GeneralExplain
                    title="Sua História"
                    isHidden={!isShown("EDescricao")}
                    description="Como Mestre, você tem a liberdade de criar lugares, pessoas, facções, monstros e muito mais. Aproveite o espaço da Descrição da sua Campanha para manter suas anotações sobre o seu jogo sempre em dia, ou use de outra forma se preferir."
                    onCancel={() => showRow("EDescricao")}
                />

                <Outlet context={{ isMaster, isPlayer, campaignCharacter, characters, campaign, party, campaignId }} />

            </div >
        </>
    );
}

