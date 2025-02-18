import { NavLink, useLoaderData } from "@remix-run/react";
import { json, LoaderFunction } from '@remix-run/node'
import { requireUserId } from '~/utils/auth.server'
import { CampaignPanel } from "~/components/campaign-panel";
import { getCampaignsFromUser } from "~/utils/campaign.server";

export const loader: LoaderFunction = async ({ request }) => {
    const userId = await requireUserId(request)
    const campaigns = await getCampaignsFromUser(userId)
    return json({ campaigns })
}

export default function CampaignsIndexRoute() {
    const { campaigns } = useLoaderData<any>()

    return (<>
        <h1 className="title-container" style={{ fontSize: '2rem' }}>Suas Campanhas<NavLink style={{ color: 'blue' }} className="question-button" to={`new`}>+</NavLink></h1>
        <div className="container">
            <CampaignPanel campaigns={campaigns} />
        </div>
    </>);
}
