/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect, LoaderFunction } from "@remix-run/node";
import { rtnCampaignDay, rtnCampaignEra, rtnCampaignMonth, rtnCampaignTimeOfDay, rtnCampaignYear } from "~/utils/campaign.server";
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

    const timeSegment = String(params.timeSegment)


    const referer = request.headers.get("Referer") || `/user/campaign/${String(campaignId)}`;

    //SERVER
    const timeMap = new Map([
        ['timeOfDay', rtnCampaignTimeOfDay],
        ['monthDay', rtnCampaignDay],
        ['month', rtnCampaignMonth],
        ['year', rtnCampaignYear],
        ['era', rtnCampaignEra],
    ]);

    const rtnanceTime = timeMap.get(timeSegment);
    if (!rtnanceTime) {
        throw new Response("Segmento de tempo inválido", { status: 400 });
    }

    try {
        await rtnanceTime(campaignId);
    } catch (err) {
        console.error(`Erro ao voltar tempo: ${timeSegment}`, err);
        throw new Response("Erro ao voltar tempo", { status: 500 });
    }

    return redirect(referer);
};