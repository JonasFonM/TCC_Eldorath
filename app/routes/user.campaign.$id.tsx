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
                tableHeaders={["Era", "Ano", "Mês", "Dia", "Fase"]}
                tableDatas={[campaign.era, campaign.year, campaign.month, campaign.monthDay, campaign.timeOfDay]}
                tableExplain={[
                    "Eras são as maiores medidas de tempo usadas em Eldorath. A mudança de uma Era só ocorre em eventos cataclismicos onde paradigmas importantes da própria realidade são afetados.",
                    "Eldorath segue um calendário solar de 360 dias, dividido em 12 meses de 30 dias cada.",
                    "Cada mês em Eldorath é carregado de simbologia e ligado às tradições e fenômenos que ocorrem no seu decorrer.",
                    "Uma semana em Eldorath tem 6 Dias. Os dias da semana são nomeados em honra a divindades e forças ancestrais.",
                    "Um Dia em Eldorath é separado em Fases: A Madrugada que se inicia à meia-noite, a Alvorada, às 6 horas da manhã, a Tarde, ao meio-dia e a Noite, às 18 horas."
                ]}

                links={isMaster ? [`/user/campaign/${campaignId}/rtn/timeOfDay`, `/user/campaign/${campaignId}/rtn/monthDay`, `/user/campaign/${campaignId}/rtn/month`, `/user/campaign/${campaignId}/rtn/year`, `/user/campaign/${campaignId}/rtn/era`] : []}
                linkNames={isMaster ? [`Voltar Fase`, `Voltar Dia`, `Voltar Mês`, `Voltar Ano`, `Voltar Era`] : []}
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

