/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect, LoaderFunction } from "@remix-run/node";
import { getUserIdFromSession } from "~/utils/auth.server";
import { removeSinglePlayerFromCampaign } from "~/utils/campaign.server";
import { prisma } from "~/utils/prisma.server";

export const loader: LoaderFunction = async ({ params, request }) => {

    //FETCHING DATA
    const campaignId = Number(params.id);

    const playerId = await getUserIdFromSession(request);

    const referer = request.headers.get("Referer") || `/user/campaign/${String(campaignId)}`;


    const player = await prisma.user.findUnique({
        where: { id: Number(playerId) }
    })

    if (!player) {
        throw new Response("Usuário não encontrado", { status: 404 });
    }

    const campaign = await prisma.campaign.findUnique({
        where: { id: campaignId },
    });

    if (!campaign) {
        throw new Response("Campanha não encontrada", { status: 404 });
    }

    const alreadyPlayer = await prisma.partyMembers.findFirst({
        where: {
            userId: Number(playerId),
            campaignId: campaignId
        }
    })

    //SERVER
    if (alreadyPlayer) {
        await removeSinglePlayerFromCampaign(Number(alreadyPlayer.id))

    }

    return redirect(referer);
};