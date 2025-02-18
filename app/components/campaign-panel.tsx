import { campaign } from '@prisma/client'
import { CampaignCircle } from '~/components/campaign-circle'
import "~/styles.css";

export function CampaignPanel({ campaigns }: { campaigns: campaign[] }) {
    return (
        <div>
                {campaigns.map(campaign => (
                    <CampaignCircle key={campaign.id} campaign={campaign} />
                ))}
        </div>
    )
}
