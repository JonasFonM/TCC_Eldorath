import { NavLink, useLoaderData } from "@remix-run/react";
import { json, LoaderFunction } from '@remix-run/node'
import { requireUserId } from '~/utils/auth.server'
import { CampaignPanel } from "~/components/campaign/campaign-panel";
import { getCampaignsFromUser } from "~/utils/campaign.server";
import { prisma } from "~/utils/prisma.server";
import { campaign, user } from "@prisma/client";
import { useState } from "react";

export const loader: LoaderFunction = async ({ request }) => {
    const userId = await requireUserId(request)
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: { sentRequests: true, receivedRequests: true }
    })

    const allFriendIds = user?.sentRequests.filter(sr => sr.status == 'ACCEPTED').map(af => af.user2Id).concat(user?.receivedRequests.filter(rr => rr.status == 'ACCEPTED').map(af => (af.user1Id)))

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
    const [showCreations, setShowCreations] = useState<number>(0)

    return (<>
        <h1 className="title-container" style={{ fontSize: '2rem' }}>Suas Campanhas<NavLink style={{ color: 'blue' }} className="question-button" to={`new`}>+</NavLink></h1>
        <div className="container">
            <CampaignPanel isAuthor={true} campaigns={campaigns} />
        </div>

        <h1 id="Campanhas" className="title-input">
            <button className="lineBtn" onClick={showCreations != 1 ? () => setShowCreations(1) : () => setShowCreations(0)}>
                Suas Campanhas
            </button>
        </h1>

        <div className="container" style={showCreations != 1 ? { display: 'none' } : {}}>
            <CampaignPanel isAuthor={true} campaigns={campaigns} />
        </div>
    </>);
}
