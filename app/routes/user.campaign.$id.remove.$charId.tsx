/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect, LoaderFunction } from "@remix-run/node";
import { getUserIdFromSession } from "~/utils/auth.server";
import { addSingleCharacterToCampaign, removeCharacterFromCampaign } from "~/utils/campaign.server";
import { prisma } from "~/utils/prisma.server";

export const loader: LoaderFunction = async ({ params, request }) => {

    //FETCHING DATA
    const campaignId = Number(params.id);

    const campaign = await prisma.campaign.findUnique({
        where: { id: campaignId },
    });

    if (!campaign) {
        throw new Response("Campanha não encontrada", { status: 404 });
    }

    const playerId = await getUserIdFromSession(request);

    const player = await prisma.user.findUnique({
        where: { id: Number(playerId) }
    })

    if (!player) {
        throw new Response("Usuário não encontrado", { status: 404 });
    }

    const characterId = Number(params.charId)

    const referer = request.headers.get("Referer") || `/user/campaign/${String(campaignId)}`;

    //SERVER

    await removeCharacterFromCampaign(characterId)

    return redirect(referer);
};