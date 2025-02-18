import { LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";

export const loader: LoaderFunction = async ({ params }) => {
    const campaignId = params.id;
    return (campaignId)
}

export default function CampaignRoute() {
    return (
        <div>
            <h1>Its alive!</h1>
            <Outlet />
        </div>
    );
}

