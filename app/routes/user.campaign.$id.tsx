import { campaign, character, partyMembers, scene, user } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData, useLocation } from "@remix-run/react";
import { prisma } from "~/utils/prisma.server";
import React, { useRef, useState } from "react";
import { SideBars } from "~/components/context-providers/side-bars";
import { useSidebar } from "~/components/context-providers/side-bar-context";
import { SceneCreator } from "~/components/campaign/scene-creator";
import { getUserIdFromSession } from "~/utils/auth.server";
import { getCharactersFromUser } from "~/utils/character.server";
import { translateMonth, translateWeekDays } from "./user.campaign";
import { GeneralExplain } from "~/components/explanations/general-explain";
import { useShowRow } from "~/components/context-providers/showRowContext";

export const loader: LoaderFunction = async ({ params, request }) => {
    const campaignId = Number(params.id);
    const userId = await getUserIdFromSession(request)

    const campaign = await prisma.campaign.findUnique({
        where: { id: campaignId },
        include: { scenes: true, characters: true, players: true },
    });

    const party = await prisma.user.findMany({
        where:
            { id: { in: campaign?.players.map(pl => pl.userId) } }
    })


    const characters = await getCharactersFromUser(Number(userId))

    const isMaster = Number(userId) === Number(campaign?.masterId)

    const isPlayer = campaign?.players.some(player => Number(player.userId) === Number(userId)) ?? false;

    const campaignCharacter = campaign?.characters.find(cc => cc.campaignId == campaign.id && cc.authorId == userId)

    return ({ isMaster, isPlayer, campaignCharacter, characters, campaign, party, campaignId })
}

export default function CampaignRoute() {
    const { isMaster, isPlayer, campaignCharacter, characters, campaign, party, campaignId } = useLoaderData<{ isMaster: boolean, isPlayer: boolean, campaignCharacter: character, characters: character[], campaign: (campaign & { scenes: scene[], characters: character[], players: partyMembers[] }), party: user[], campaignId: number }>()
    const { isAllOpen, isHeaderOpen, isTempOpen } = useSidebar();
    const [showList, setShowList] = useState(0);
    const [showCreator, setShowCreator] = useState(0);
    const [showPlayers, setShowPlayers] = useState(0);
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
        if (isMaster) return (
            <React.Fragment>
                <ul>
                    <li key={1}><NavLink to={`/user/campaign/${campaignId}/adv/timeOfDay`}>Avançar Fase</NavLink></li>
                    <li key={2}><NavLink to={`/user/campaign/${campaignId}/adv/monthDay`}>Avançar Dia</NavLink></li>
                    <li key={3}><NavLink to={`/user/campaign/${campaignId}/adv/month`}>Avançar Mês</NavLink></li>
                    <li key={4}><NavLink to={`/user/campaign/${campaignId}/adv/year`}>Avançar Ano</NavLink></li>
                    <li key={5}><NavLink to={`/user/campaign/${campaignId}/adv/era`}>Avançar Era</NavLink></li>
                </ul>

                <table>
                    <tbody>
                        <tr onClick={() => showList === 0 ? setShowList(1) : setShowList(0)}>
                            <th>Listar</th>
                            <td>Cenas</td>
                        </tr>
                    </tbody>
                </table>

                <ul style={showList === 0 ? { display: 'none' } : {}}>
                    {campaign.scenes.map(sc =>
                        <li key={sc.id}>
                            <NavLink to={`/user/scene/${sc.id}`}>
                                {sc.title}
                            </NavLink>
                        </li>

                    )}

                </ul>

                <table>
                    <tbody>
                        <tr onClick={() => setShowCreator(1)}>
                            <th>Criar</th>
                            <td>Cena</td>
                        </tr>
                    </tbody>
                </table>

            </React.Fragment>
        );
        if (isPlayer) {
            if (campaignCharacter) {

                return (
                    <React.Fragment>
                        <ul>
                            <li key={-5}><h3>Seu Personagem</h3></li>
                            <li key={1}>
                                <NavLink to={`/user/character/${campaignCharacter.id}/stats`}>
                                    {campaignCharacter.name}
                                </NavLink>
                            </li>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>NV</th>
                                        <td>{campaignCharacter.level}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>VIT</th>
                                        <td>{campaignCharacter.currentVitality}/{campaignCharacter.vitality}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>POD</th>
                                        <td>{campaignCharacter.currentPower}/{campaignCharacter.power}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <li key={2}>
                                <NavLink className='logout' to={`/user/campaign/${campaignId}/remove/${campaignCharacter.id}`}>
                                    Remover
                                </NavLink>
                            </li>
                        </ul>

                    </React.Fragment>
                );
            }

            return (
                <React.Fragment>
                    <ul>
                        <li key={-1}>
                            <button onClick={() => showList === 0 ? setShowList(1) : setShowList(0)}>Vincular Personagem</button>
                        </li>
                    </ul>

                    <ul style={showList === 0 ? { display: 'none' } : {}}>
                        {characters.map(cs =>
                            <li key={cs.id}>
                                <NavLink to={`/user/campaign/${campaignId}/bind/${cs.id}`}>
                                    {cs.name}
                                </NavLink>
                            </li>

                        )}
                    </ul>

                    <ul>
                        <li key={-2}>
                            <NavLink to={`/user/campaign/${campaignId}/quit`}>Sair da Campanha</NavLink>
                        </li>
                    </ul>


                </React.Fragment>);

        }
        return (
            <React.Fragment>
                <ul>
                    <li key={1}>
                        <NavLink to={`/user/campaign/${campaignId}/join/`}>
                            Juntar-se
                        </NavLink>
                    </li>
                </ul>
            </React.Fragment>);
    };

    return (
        <>
            <SideBars entity={campaign}
                title={campaign.title}
                subtitle=""
                tableHeaders={[]}
                tableDatas={[]}
                tableExplain={[]}

                links={isMaster ? [`/user/campaign/${campaignId}/rtn/timeOfDay`, `/user/campaign/${campaignId}/rtn/monthDay`, `/user/campaign/${campaignId}/rtn/month`, `/user/campaign/${campaignId}/rtn/year`, `/user/campaign/${campaignId}/rtn/era`] : []}
                linkNames={isMaster ? [`Voltar Fase`, `Voltar Dia`, `Voltar Mês`, `Voltar Ano`, `Voltar Era`] : []}
                temp={
                    <React.Fragment>

                        {getCampaignAction()}

                        <ul>

                            <li key={-3}>
                                <button onClick={showPlayers != 1 ? () => setShowPlayers(1) : () => setShowPlayers(0)}>Jogadores</button>
                            </li>

                        </ul>

                        <ul style={showPlayers != 1 ? { display: 'none' } : { display: "inherit" }}>
                            {party.map(
                                pl => <li key={pl.id}>
                                    <NavLink to={`/user/home/profile/${pl.id}`}>
                                        {pl.username}
                                    </NavLink>
                                </li>
                            )}
                        </ul>

                    </React.Fragment>

                }

            />

            <div className="user" >

                <h1 className="title-input" style={{ position: 'sticky', top: '64px' }}>{campaign.title}</h1>
                <SceneCreator isHidden={showCreator === 0} onCancel={() => setShowCreator(0)} campaignId={String(campaignId)} />



                <div className="calendar-box">
                    <div className="col-12">
                        <img alt={"Dia"}
                            style={{ animation: 'fadeIn 0.3s ease-in-out', transition: "fadeIn 0.3s ease-in-out", width: '100%' }}
                            src={displayTimeIcon(Number(campaign.timeOfDay))} />
                    </div>
                    <h2 className="col-12"><button onClick={() => showRow(-15)} className="lineBtn">{translateWeekDays(campaign.monthDay)}</button>,
                        Dia {campaign.monthDay} de <button onClick={() => showRow(-10)} className="lineBtn">{translateMonth(campaign.month)}</button> de {campaign.year} <button onClick={() => showRow(-5)} className="lineBtn">E{campaign.era}</button></h2>

                </div>

                <GeneralExplain
                    title="Eras"
                    isHidden={!isShown(-5)}
                    description="Eras são as maiores medidas de tempo usadas em Eldorath. A mudança de uma Era só ocorre em eventos cataclismicos onde paradigmas importantes da própria realidade são afetados. Como muitas espécies extremamente longevas compõem a demografia de Eldorath, a Era é mais importante que o Ano para determinar períodos históricos."
                    onCancel={() => showRow(-5)}
                />
                <GeneralExplain
                    title="Meses"
                    isHidden={!isShown(-10)}
                    description="Cada mês em Eldorath é carregado de simbologia, tradições e fenômenos que se repetem anualmente. Um ano em Eldorath dura 12 meses, e cada mês dura 5 semanas de 6 dias cada."
                    onCancel={() => showRow(-10)}
                />
                <GeneralExplain
                    title="Dias"
                    isHidden={!isShown(-15)}
                    description="Os dias da semana em Eldorath homenageiam divindades e forças ancestrais. Um Dia em Eldorath é separado em Fases: A Madrugada que se inicia à meia-noite, a Alvorada, às 6 horas da manhã, a Tarde, ao meio-dia e a Noite, às 18 horas."
                    onCancel={() => showRow(-15)}
                />

                <div className="container">

                    <div className="calendar-box" style={{ justifyContent: 'center' }}>

                        {isMaster
                            ? <h2><NavLink className={'lineBtn'} to={`/user/campaign/edit/${campaignId}/`}>Editar</NavLink></h2>
                            : ''
                        }
                        <p style={{ textAlign: 'justify', overflow: 'auto', display: location.pathname === `/user/campaign/${campaignId}` ? 'inherit' : 'none' }}>{campaign.description}</p>
                    </div>

                    <Outlet context={{ isMaster, isPlayer, campaignCharacter, characters, campaign, party, campaignId }} />
                </div>

            </div >
        </>
    );
}

