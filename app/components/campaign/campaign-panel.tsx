import { campaign } from '@prisma/client'
import { CampaignCircle } from '~/components/campaign/campaign-circle'
import "~/styles.css";
import { DeleteConfirm } from '../delete-confirmation';
import { useState } from 'react';

export function CampaignPanel({ campaigns, isAuthor }: { campaigns: campaign[], isAuthor: boolean }) {
    const [selectedDelete, setSelectedDelete] = useState<number>(0);

    return (
        <div className='title-container'>
            {campaigns.map(campaign => (
                <CampaignCircle key={campaign.id} campaign={campaign} />
            ))}
            {isAuthor ?
                campaigns.map(campaign => (
                    <DeleteConfirm key={campaign.id} name={campaign.title} isHidden={selectedDelete === 0} onShow={() => setSelectedDelete(campaign.id)} onCancel={() => setSelectedDelete(0)} entity={"campaign"} id={String(campaign.id)} />
                ))
                :
                ''
            }

        </div>);
}
