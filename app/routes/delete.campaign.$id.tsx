/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect, LoaderFunction } from "@remix-run/node";
import { removeAllCharactersFromCampaign, removeAllPlayersFromCampaign } from "~/utils/campaign.server";
import { prisma } from "~/utils/prisma.server";

export const loader: LoaderFunction = async ({ params }) => {

    //FETCHING DATA
    const campaignId = Number(params.id);

    const campaign = await prisma.campaign.findUnique({
        where: { id: campaignId },
    });

    if (!campaign) {
        throw new Response("Campaign not found", { status: 404 });
    }

    const scenes = await prisma.scene.findMany({
        where: { campaignId: campaignId }
    })

    const sceneIdList = scenes.map(sc => sc.id)

    //DELETES


    await prisma.characterScene.deleteMany({
        where: {
            sceneId: { in: sceneIdList },
        },
    });

    await prisma.scene.deleteMany({
        where: { campaignId: campaignId },
    });

    await removeAllCharactersFromCampaign(campaignId)

    await removeAllPlayersFromCampaign(campaignId)

    await prisma.campaign.delete({
        where: { id: campaignId },
    });

    return redirect('/user/home/profile/');

};