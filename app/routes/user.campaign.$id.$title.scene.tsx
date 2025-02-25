/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect, LoaderFunction } from "@remix-run/node";
import { createScene } from "~/utils/campaign.server";
import { prisma } from "~/utils/prisma.server";
import { SceneForm } from "~/utils/types.server";

export const loader: LoaderFunction = async ({ params }) => {

    //FETCHING DATA
    const campaignId = Number(params.id);

    const title = String(params.title);

    const campaign = await prisma.campaign.findUnique({
        where: { id: campaignId },
    });

    if (!campaign) {
        throw new Response("Campaign not found", { status: 404 });
    }

    const campForm: SceneForm =
    {
        era: campaign.era,
        year: campaign.year,
        month: campaign.month,
        monthDay: campaign.monthDay,
        weekDay: campaign.weekDay,
    }

    const partyMembers = await prisma.character.findMany({
        where: { campaignId: campaignId }
    })

    const partyIdList = partyMembers.map(pm => pm.id)

    //

    createScene(campForm, campaignId, title)

    return redirect(`/user/campaign/${String(campaignId)}`);
};