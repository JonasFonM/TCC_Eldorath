import { campaign, character, scene, user } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData, useLocation } from "@remix-run/react";
import { prisma } from "~/utils/prisma.server";
import React, { useState } from "react";
import { SideBars } from "~/components/side-bars/side-bars";
import { useSidebar } from "~/components/side-bars/side-bar-context";
import { SceneCreator } from "~/components/campaign/scene-creator";

export const loader: LoaderFunction = async ({ params }) => {
    const campaignId = Number(params.id);

    const campaign = await prisma.campaign.findUnique({
        where: { id: campaignId },
        include: { scenes: true, characters: true, players: true },
    });

    return ({ campaignId, campaign })
}

export default function CampaignRoute() {
    const { campaign } = useLoaderData<{ campaign: (campaign & { scenes: scene[], characters: character[], players: user[] }) }>()
    const { isAllOpen, isHeaderOpen, isTempOpen } = useSidebar();
    const [showScenes, setShowScenes] = useState(0);
    const [showCreator, setShowCreator] = useState(0);
    const location = useLocation()
    const campaignId = String(campaign.id)

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
                links={[]}
                linkNames={[]}
                temp={
                    <React.Fragment>
                        <table>
                            <tbody>
                                <tr onClick={() => showScenes === 0 ? setShowScenes(1) : setShowScenes(0)}>
                                    <th>Listar</th>
                                    <td>Cenas</td>
                                </tr>
                            </tbody>
                        </table>

                        <ul style={showScenes === 0 ? { display: 'none' } : {}}>
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
                }

            />

            <div className="user" style={isAllOpen ? { marginLeft: '200px', marginRight: '200px' } : isHeaderOpen ?
                { marginLeft: '200px' } : isTempOpen ? { marginRight: '200px' } : {}}>

                <h1>{campaign.title}</h1>
                <SceneCreator isHidden={showCreator === 0} onCancel={() => setShowCreator(0)} campaignId={campaignId} />

                <div className="container" style={{ margin: '5%' }}>
                    <p style={{ textAlign: 'justify', display: location.pathname === `/user/campaign/${campaignId}` ? 'inherit' : 'none' }}>{campaign.description}</p>
                    <Outlet />
                </div>

            </div >
        </>
    );
}

