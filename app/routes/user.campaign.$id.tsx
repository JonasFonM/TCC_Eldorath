import { campaign, character, message, partyMembers, scene, user } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData, useLocation, useNavigation } from "@remix-run/react";
import { prisma } from "~/utils/prisma.server";
import React, { useEffect, useRef } from "react";
import { SideBars } from "~/components/context-providers/side-bars";
import { getUserIdFromSession } from "~/utils/auth.server";
import { getAllCharactersFromUser } from "~/utils/character.server";
import { translateMonth, translateWeekDays } from "./user.campaign";
import { GeneralExplain } from "~/components/explanations/general-explain";
import { useShowRow } from "~/components/context-providers/showRowContext";
import { UserPanel } from "~/components/user-panel";
import type { ActionFunction } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import MessageForm from "~/components/campaign/message-form";
import { MessageList } from "~/components/campaign/message-list";

export const loader: LoaderFunction = async ({ params, request }) => {
    const campaignId = Number(params.id);
    const userId = Number(await getUserIdFromSession(request))

    const campaign = await prisma.campaign.findUnique({
        where: { id: campaignId },
        include: { master: true, scenes: true, characters: true, players: true },
    });


    const party = await prisma.user.findMany({
        where:
            { id: { in: campaign?.players.map(pl => pl.userId) } }
    })

    const characters = await getAllCharactersFromUser(userId)

    const isMaster = Number(userId) === Number(campaign?.masterId)

    const isPlayer = campaign?.players.some(player => Number(player.userId) === Number(userId)) ?? false;

    const campaignCharacter = campaign?.characters.find(cc => cc.campaignId == campaign.id && cc.authorId == userId)

    const messages = await prisma.message.findMany({
        where: {
            campaignId: campaignId
        },
        include: { user: true }
    });

    return ({ isMaster, isPlayer, campaignCharacter, characters, campaign, party, campaignId, userId, messages })
}

export const action: ActionFunction = async ({ request }) => {
    const formData = await request.formData();
    const campaignId = Number(formData.get("campaignId"));
    const userId = Number(formData.get("userId"));
    const content = String(formData.get("content"));

    if (!content.trim() || isNaN(campaignId) || isNaN(userId)) {
        return new Response("Invalid input", { status: 400 });
    }

    await prisma.message.create({
        data: {
            content,
            campaignId,
            userId,
        },
    });

    return redirect(`/user/campaign/${campaignId}/`);
};



export default function CampaignRoute() {
    const { isMaster,
        isPlayer,
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
            campaignCharacter: character,
            characters: character[],
            campaign: (campaign & { master: user, scenes: scene[], characters: character[], players: partyMembers[] }),
            party: user[],
            campaignId: number,
            userId: number,
            messages: (message & { user: user })[]
        }>()
    const location = useLocation()
    const { showRow, isShown } = useShowRow()
    const timeIcons = [
        "/Night.png",
        "/Dawn.png",
        "/Day.png",
        "/Dusk.png"
    ]

    function displayTimeIcon(i: number) {
        return timeIcons[i - 1]
    }

    const getCampaignAction = () => {
        if (isMaster) return [''].concat(party.map(p => `/user/home/profile/${p.id}`));
        if (isPlayer && campaignCharacter) return [`/user/home/profile/${campaign.master.id}`, `/user/character/${campaignCharacter.id}/stats`, `/user/campaign/${campaignId}/remove/${campaignCharacter.id}`];
        return [`/user/home/profile/${campaign.master.id}`]
    }
    const getActionNames = () => {
        if (isMaster) return ['Jogadores'].concat((party.map(p => `${p.username}`)));
        if (isPlayer && campaignCharacter) return ['Mestre', `${campaignCharacter.name}`, `Remover Personagem`];
        return [`Mestre`]
    }
    const bottomRef = useRef<HTMLDivElement>(null);
    const transition = useNavigation();

    useEffect(() => {
        if (transition.state === "idle" && bottomRef.current) {
            bottomRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages.length, transition.state]);

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
                        <h1 style={{ position: 'sticky', top: '0', zIndex: '1', margin: '0', paddingTop: '6px', paddingBottom: '6px', backgroundColor: '#111', borderBottom: '2px solid gold' }}>Mensagens</h1>
                        {isMaster || isPlayer
                            ? <>
                                <MessageList messages={messages} masterId={campaign.masterId} />
                                <MessageForm campaignId={campaignId} userId={userId} />
                            </>
                            : ''
                        }
                        <div ref={bottomRef} />

                    </React.Fragment>

                }

            />

            <div className="user" >

                <h1 className="title-input" style={{ position: 'sticky', top: '64px' }}>{campaign.title}</h1>

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
                    <h2 className="col-12"><button onClick={() => showRow("EDia")} className="lineBtn">{translateWeekDays(campaign.monthDay)}</button>,
                        Dia {campaign.monthDay} de <button onClick={() => showRow("EMes")} className="lineBtn">{translateMonth(campaign.month)}</button> de {campaign.year} <button onClick={() => showRow("EEra")} className="lineBtn">E{campaign.era}</button></h2>

                </div>

                <GeneralExplain
                    title="Eras"
                    isHidden={!isShown("EEra")}
                    description="Eras são as maiores medidas de tempo usadas em Eldorath. A mudança de uma Era só ocorre em eventos cataclismicos onde paradigmas importantes da própria realidade são afetados. Como muitas espécies extremamente longevas compõem a demografia de Eldorath, a Era é mais importante que o Ano para determinar períodos históricos."
                    onCancel={() => showRow("EEra")}
                />
                <GeneralExplain
                    title="Meses"
                    isHidden={!isShown("EMes")}
                    description="Cada mês em Eldorath é carregado de simbologia, tradições e fenômenos que se repetem anualmente. Um ano em Eldorath dura 12 meses, e cada mês dura 5 semanas de 6 dias cada."
                    onCancel={() => showRow("EMes")}
                />
                <GeneralExplain
                    title="Dias"
                    isHidden={!isShown("EDia")}
                    description="Os dias da semana em Eldorath homenageiam divindades e forças ancestrais. Um Dia em Eldorath é separado em Fases: A Madrugada que se inicia à meia-noite, a Alvorada, às 6 horas da manhã, a Tarde, ao meio-dia e a Noite, às 18 horas."
                    onCancel={() => showRow("EDia")}
                />


                {isMaster
                    ? <h2><NavLink className={'lineBtn'} to={`/user/campaign/edit/${campaignId}/`}>Editar Descrição</NavLink></h2>
                    : ''
                }

                <div className="calendar-box container" style={{ justifyContent: 'center' }}>
                    <p style={{ textAlign: 'justify', overflowX: 'hidden', overflowY: 'auto', display: location.pathname === `/user/campaign/${campaignId}` ? 'inherit' : 'none' }}>{campaign.description}</p>
                </div>
                <Outlet context={{ isMaster, isPlayer, campaignCharacter, characters, campaign, party, campaignId }} />

            </div >
        </>
    );
}

