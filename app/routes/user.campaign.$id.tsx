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

            <SideBars entity={campaign} title={campaign.title} tableHeaders={["Æra", "Ano", "Mês", "Dia"]} tableDatas={[campaign.era, campaign.year, campaign.month, campaign.monthDay]} />


            <div className="character-sheet">
                <div className="container">
                    <p>{campaign.description}</p>
                </div>
            </div>
            <Outlet />
        </>
    );
}

