/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { campaign } from '@prisma/client'
import { NavLink, } from '@remix-run/react'
import { useState } from 'react';
import { DeleteConfirm } from '../delete-confirmation';


interface props {
    campaign: campaign
    isAuthor: boolean
}


export function CampaignCircle({ campaign, isAuthor }: props) {
    const [selectedDelete, setSelectedDelete] = useState<number>(0);

    return (
        <div className='container'>

            <NavLink className={'button col-12'}  style={{ width: '100%', marginBottom: '0' }} to={`/user/campaign/${campaign.id}`}>{campaign.title}</NavLink>
            {isAuthor ?
                <DeleteConfirm name={campaign.title} isHidden={selectedDelete != campaign.id} onShow={() => setSelectedDelete(campaign.id)} onCancel={() => setSelectedDelete(0)} entity={"campaign"} id={String(campaign.id)} />
                : ''
            }
        </div>

    )
}

