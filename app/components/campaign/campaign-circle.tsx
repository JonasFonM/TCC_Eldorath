/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { campaign } from '@prisma/client'
import { NavLink, } from '@remix-run/react'

interface props {
  campaign: campaign
  className?: string
}


export function CampaignCircle({ campaign }: props) {

  return (
    <NavLink style={{ textDecoration: 'none', color: 'white' }} to={`/user/campaign/${campaign.id}`}><h1 style={{ fontSize: '1.7rem' }}>{campaign.title}</h1></NavLink>
  )
}