import { campaign } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { prisma } from "~/utils/prisma.server";
import { translateWeekDays } from "./user.campaign";

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
        <div>
            <h1>{campaign.title}</h1>
            <h2>{campaign.era}, {translateWeekDays(campaign.weekDay)} {campaign.monthDay}/{campaign.month}/{campaign.year} </h2>
            <p>{campaign.description}</p>
            <Outlet />
        </div>
    );
}

