import { NavLink, useLoaderData } from "@remix-run/react";
import { json, LoaderFunction } from '@remix-run/node'
import { requireUserId } from '~/utils/auth.server'
import { CampaignPanel } from "~/components/campaign/campaign-panel";
import { getCampaignsFromUser } from "~/utils/campaign.server";
import { prisma } from "~/utils/prisma.server";
import { campaign, user } from "@prisma/client";
import { useRef, useState } from "react";
import React from "react";
import { useShowRow } from "~/components/context-providers/showRowContext";

export const loader: LoaderFunction = async ({ request }) => {
    const userId = await requireUserId(request)
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { sentRequests: true, receivedRequests: true }
    })

    const allFriendIds = user?.sentRequests.filter(rr => rr.status == 'ACCEPTED').map(af => af.user2Id).concat(user?.receivedRequests.filter(rr => rr.status == 'ACCEPTED').map(af => (af.user1Id)))

    const friends = await prisma.user.findMany(
        {
            where: { id: { in: allFriendIds } },
            include: { gmCampaigns: true }
        }
    )

    const campaigns = await getCampaignsFromUser(userId)
    return ({ campaigns, friends })
}


export default function CampaignsIndexRoute() {
    const { campaigns, friends } = useLoaderData<{ campaigns: campaign[], friends: (user & { gmCampaigns: campaign[] })[] }>()
    const { showRow, isShown } = useShowRow();


    return (<React.Fragment>

        <h1 id="Campanhas" className="title-input">
            <button className="lineBtn" onClick={() => showRow(-1)}>
                Suas Campanhas
            </button>
        </h1>

        <div className="container" style={isShown(-1) ? { display: 'none' } : {}}>
            <CampaignPanel isAuthor={true} campaigns={campaigns} />
            <h1 className="title-input"><NavLink className={'lineBtn'} to={`new`}>Criar Campanha</NavLink></h1>
        </div>

        {
            friends.map(
                fr =>
                    <React.Fragment key={fr.id}>

                        <h1 className="title-input">
                            <button className="lineBtn" onClick={() => showRow(fr.id)}>
                                Campanhas de {fr.username}
                            </button>
                        </h1>

                        <div className="container" style={isShown(fr.id) ? { display: 'none' } : {}}>
                            <CampaignPanel isAuthor={false} campaigns={fr.gmCampaigns} />
                        </div>

                    </React.Fragment>
            )

        }
    </React.Fragment>
    );
}
