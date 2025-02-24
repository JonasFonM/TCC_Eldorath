import { campaign } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { prisma } from "~/utils/prisma.server";
import { translateWeekDays } from "./user.campaign";
import { useState } from "react";
import { SideBars } from "~/components/side-bars";

export const loader: LoaderFunction = async ({ params }) => {
    const campaignId = Number(params.id);

    const campaign = await prisma.campaign.findUnique({
        where: { id: campaignId },
        include: { scenes: true, characters: true, players: true },
    });

    return ({ campaignId, campaign })
}

export default function CampaignRoute() {
    const { campaign } = useLoaderData<{ campaign: campaign }>()



    return (
        <>
            <SideBars entity={campaign} title={campaign.title}
                tableHeaders={["Æra", "Ano", "Mês", "Dia"]}
                tableDatas={[campaign.era, campaign.year, campaign.month, campaign.monthDay]}
                tableExplain={[
                    "Æras são as maiores medidas de tempo usadas pelos Mortais em Æternida. A mudança de uma Æra só ocorre em eventos cataclismicos onde paradigmas importantes são afetados, como a morte de uma Divindade.",
                    "Os Anos em Æternida se passam a cada 360 dias exatos.",
                    "Os Meses em Æternida possuem 30 dias exatos. Cada mês foi nomeado em homenagem a uma figura, evento ou símbolo importante na cultura geral do mundo.",
                    "Os Dias em Æternida são divididos em quatro Fases de 6 horas para questões de jogabilidade. Cada semana tem 6 Dias exatos, e os nomes deles são uma representação da rotina do povo Æternidense."
                ]}
                links={[]}
                linkNames={[]

                }


            />


            <div className="character-sheet">
                <div className="container">
                    <p>{campaign.description}</p>
                </div>
            </div>
            <Outlet />
        </>
    );
}

