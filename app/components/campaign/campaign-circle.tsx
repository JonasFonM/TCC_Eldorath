/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { campaign } from '@prisma/client'
import { NavLink, } from '@remix-run/react'
import { DeleteConfirm } from '../delete-confirmation'
import { useState } from 'react'


interface props {
  campaign: campaign
  className?: string
}


export function CampaignCircle({ campaign }: props) {

  const [selectedDelete, setSelectedDelete] = useState<number>(0);

  const showDelete = () => {
    setSelectedDelete(() => {
      return campaign.id;
    });
  };

  const cancelDelete = () => {
    setSelectedDelete(() => {
      return 0
    });
  };

  return (
    <div className='title-container'>

      <NavLink style={{ textDecoration: 'none', color: 'white' }} to={`/user/campaign/${campaign.id}`}><h1 style={{ fontSize: '1.7rem' }}>{campaign.title}</h1></NavLink>

      <DeleteConfirm name={campaign.title} isHidden={selectedDelete === 0} onShow={showDelete} onCancel={cancelDelete} entity={"campaign"} id={String(campaign.id)} />

    </div>
  )
}