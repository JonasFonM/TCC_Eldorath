import { campaign, character, scene, user } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData, useLocation } from "@remix-run/react";
import { prisma } from "~/utils/prisma.server";
import React, { useState } from "react";
import { SideBars } from "~/components/side-bars/side-bars";
import { useSidebar } from "~/components/side-bars/side-bar-context";
import { SceneCreator } from "~/components/campaign/scene-creator";
import { getUserIdFromSession } from "~/utils/auth.server";
import { getCharactersFromUser } from "~/utils/character.server";

export const loader: LoaderFunction = async ({ params, request }) => {
    const campaignId = Number(params.id);
    const userId = await getUserIdFromSession(request)

    const campaign = await prisma.campaign.findUnique({
        where: { id: campaignId },
        include: { scenes: true, characters: true, players: true },
    });

    const characters = await getCharactersFromUser(Number(userId))

    const isMaster = Number(userId) === Number(campaign?.masterId)

    const isPlayer = campaign?.players.some(player => Number(player.userId) === Number(userId)) ?? false;

    const campaignCharacter = campaign?.characters.find(cc => cc.campaignId == campaign.id && cc.authorId == userId)

    return ({ isMaster, isPlayer, campaignCharacter, characters, campaignId, campaign })
}

export default function CampaignRoute() {
    const { isMaster, isPlayer, campaignCharacter, characters, campaign } = useLoaderData<{ isMaster: boolean, isPlayer: boolean, campaignCharacter: character, characters: character[], campaign: (campaign & { scenes: scene[], characters: character[], players: user[] }) }>()
    const { isAllOpen, isHeaderOpen, isTempOpen } = useSidebar();
    const [showList, setShowList] = useState(0);
    const [showCreator, setShowCreator] = useState(0);
    const location = useLocation()
    const campaignId = String(campaign.id)

    const getCampaignAction = () => {
        if (isMaster) return (
            <React.Fragment>
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
                            <NavLink to={`/user/campaign/${campaignId}/scene/${sc.id}`}>
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
                tableHeaders={["Æra", "Ano", "Mês", "Dia", "Fase"]}
                tableDatas={[campaign.era, campaign.year, campaign.month, campaign.monthDay, campaign.timeOfDay]}
                tableExplain={[
                    "Æras são as maiores medidas de tempo usadas pelos Mortais em Æternida. A mudança de uma Æra só ocorre em eventos cataclismicos onde paradigmas importantes são afetados, como a morte de uma Divindade.",
                    "Os Anos em Æternida se passam a cada 360 dias.",
                    "Os Meses em Æternida possuem 30 dias exatos. Cada mês foi nomeado em homenagem a uma figura, evento ou símbolo importante na cultura geral do mundo.",
                    "Uma semana em Æternida tem 6 Dias e os nomes deles são uma representação da rotina dos povos originários Æternidenses.",
                    "Um Dia em Æternida é separado em Fases: A Madrugada que se inicia à meia-noite, a Alvorada, às 6 horas da manhã, a Tarde, ao meio-dia e a Noite, às 18 horas."
                ]}

                links={isMaster ? [`/user/campaign/${campaignId}/adv/timeOfDay`,`/user/campaign/${campaignId}/adv/monthDay`, `/user/campaign/${campaignId}/adv/month`, `/user/campaign/${campaignId}/adv/year`, `/user/campaign/${campaignId}/adv/era`] : []}
                linkNames={isMaster ? [`Avançar Fase`, `Avançar Dia`, `Avançar Mês`, `Avançar Ano`, `Avançar Æra`] : []}
                temp={
                    getCampaignAction()
                }

            />

            <div className="user" style={isAllOpen ? { marginLeft: '200px', marginRight: '200px' } : isHeaderOpen ?
                { marginLeft: '200px' } : isTempOpen ? { marginRight: '200px' } : {}}>

                <h1><NavLink className={'lineBtn'} to={`/user/campaign/${campaignId}`}>{campaign.title}</NavLink></h1>
                <SceneCreator isHidden={showCreator === 0} onCancel={() => setShowCreator(0)} campaignId={campaignId} />

                <div className="container" style={{ margin: '5%' }}>
                    <p style={{ textAlign: 'justify', display: location.pathname === `/user/campaign/${campaignId}` ? 'inherit' : 'none' }}>{campaign.description}</p>
                    <Outlet />
                </div>

            </div >
        </>
    );
}

