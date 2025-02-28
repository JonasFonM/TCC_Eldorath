import { campaign } from '@prisma/client'
import "~/styles.css";
import { CampaignCircle } from './campaign-circle';

export function CampaignPanel({ campaigns, isAuthor }: { campaigns: campaign[], isAuthor: boolean }) {

    return (
        <div className='col-12'>

            {campaigns.map(campaign => (
                <CampaignCircle key={campaign.id} isAuthor={isAuthor} campaign={campaign} />
            ))}

        </div>
    )
}
