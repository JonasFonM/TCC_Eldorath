/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect, LoaderFunction } from "@remix-run/node";
import { privatizeCampaign } from "~/utils/campaign.server";
import { prisma } from "~/utils/prisma.server";

export const loader: LoaderFunction = async ({ params, request }) => {
    const campaignId = Number(params.id);

    const campaign = await prisma.campaign.findUnique({
        where: { id: campaignId },
    });

    if (!campaign) {
        throw new Response("Campaign not found", { status: 404 });
    }

    await privatizeCampaign(campaignId);

    const referer = request.headers.get("Referer") || "/";

    return redirect(referer);

};