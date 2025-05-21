/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CampaignForm, SceneForm } from './types.server'
import { prisma } from './prisma.server'
import { json } from '@remix-run/node'

//BASIC
export const createCampaign = async (campaign: CampaignForm) => {

  const newcampaign = await prisma.campaign.create({
    data: {
      title: campaign.title,
      masterId: campaign.masterId,
      description: campaign.description,
      era: campaign.era,
      year: campaign.year,
      month: campaign.month,
      monthDay: campaign.monthDay,
      weekDay: campaign.weekDay,
    },
  })
  return {
    id: newcampaign.id,
    title: campaign.title,
    masterId: campaign.masterId,
    description: campaign.description,
    era: campaign.era,
    year: campaign.year,
    month: campaign.month,
    monthDay: campaign.monthDay,
    weekDay: campaign.weekDay,
  }
}

export const updateCampaign = async (campaign: CampaignForm, campaignId: number) => {

  const updatedCampaign = await prisma.campaign.update({
    where: {
      id: campaignId
    }
    ,
    data: {
      title: campaign.title,
      masterId: campaign.masterId,
      era: campaign.era,
      year: campaign.year,
      month: campaign.month,
      monthDay: campaign.monthDay,
      weekDay: campaign.weekDay,
      description: campaign.description,

    },
  })
  return {
    id: updatedCampaign.id,
    title: campaign.title,
    masterId: campaign.masterId,
    era: campaign.era,
    year: campaign.year,
    month: campaign.month,
    monthDay: campaign.monthDay,
    weekDay: campaign.weekDay,
    description: campaign.description,
  }
}

export async function togglePublicCampaign(campaignId: number, isPublic: boolean) {
  const togglePublic = await prisma.campaign.update(
    {
      where: {
        id: campaignId
      },
      data: {
        public: !isPublic
      }
    }

  )
  return (togglePublic)
}

export async function submitCampaign(campaign: CampaignForm) {
  const newcampaign = await createCampaign(campaign)
  if (!newcampaign) {

    return json(
      {
        error: `Something went wrong trying to create a new campaign.`,
        fields: { title: campaign.title, era: campaign.era, year: campaign.year, month: campaign.month, monthDay: campaign.monthDay, weekDay: campaign.weekDay, masterId: campaign.masterId },
      },
      { status: 400 },
    )
  }

  console.log("Campanha criada com sucesso.")
  return (newcampaign.id)
}

export const getCampaignsFromUser = async (userId: number) => {
  return prisma.campaign.findMany({
    where: { masterId: userId },
    select: { id: true, title: true, masterId: true },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

//TIME CONTROL

export const advCampaignTimeOfDay = async (campaignId: number) => {
  return prisma.campaign.update({
    where: { id: campaignId },
    data: { timeOfDay: { increment: 1 } }
  })
}

export const advCampaignDay = async (campaignId: number) => {
  return prisma.campaign.update({
    where: { id: campaignId },
    data: { monthDay: { increment: 1 } }
  })
}

export const advCampaignMonth = async (campaignId: number) => {
  return prisma.campaign.update({
    where: { id: campaignId },
    data: { month: { increment: 1 } }
  })
}

export const advCampaignYear = async (campaignId: number) => {
  return prisma.campaign.update({
    where: { id: campaignId },
    data: { year: { increment: 1 } }
  })
}

export const advCampaignEra = async (campaignId: number) => {
  return prisma.campaign.update({
    where: { id: campaignId },
    data: { era: { increment: 1 } }
  })
}

export const rtnCampaignTimeOfDay = async (campaignId: number) => {
  return prisma.campaign.update({
    where: { id: campaignId },
    data: { timeOfDay: { decrement: 1 } }
  })
}

export const rtnCampaignDay = async (campaignId: number) => {
  return prisma.campaign.update({
    where: { id: campaignId },
    data: { monthDay: { decrement: 1 } }
  })
}

export const rtnCampaignMonth = async (campaignId: number) => {
  return prisma.campaign.update({
    where: { id: campaignId },
    data: { month: { decrement: 1 } }
  })
}

export const rtnCampaignYear = async (campaignId: number) => {
  return prisma.campaign.update({
    where: { id: campaignId },
    data: { year: { decrement: 1 } }
  })
}

export const rtnCampaignEra = async (campaignId: number) => {
  return prisma.campaign.update({
    where: { id: campaignId },
    data: { era: { decrement: 1 } }
  })
}


//SCENES
export const createScene = async (campaign: SceneForm, campaignId: number, title: string) => {
  const newscene = await prisma.scene.create({
    data: {
      title: title,
      campaignId: campaignId,
      era: campaign.era,
      month: campaign.month,
      monthDay: campaign.monthDay,
      weekDay: campaign.weekDay

    },
  })
  return {
    id: newscene.id,
    title: title,
    campaignId: campaignId,
    era: campaign.era,
    month: campaign.month,
    monthDay: campaign.monthDay,
    weekDay: campaign.weekDay
  }
};

//PLAYERS
export const addSinglePlayertoCampaign = async (playerId: number, campaignId: number) => {
  return await prisma.partyMembers.create({
    data: {
      userId: playerId,
      campaignId: campaignId,
    }
  });
};

export const addPlayerstoCampaign = async (partyMemberList: number[], campaignId: number) => {
  const existingPartyMembers = await prisma.partyMembers.findMany({
    where: {
      userId: { in: partyMemberList },
      campaignId: campaignId,
    },
  });

  const existingPartyIds = existingPartyMembers.map(cs => cs.userId);

  const newPartyMembers = partyMemberList.filter(partyMemberId => !existingPartyIds.includes(partyMemberId));

  if (newPartyMembers.length > 0) {
    await prisma.partyMembers.createMany({
      data: newPartyMembers.map(partyMemberId => ({
        userId: partyMemberId,
        campaignId: campaignId,
      })),
      skipDuplicates: true,
    });
  }
  return;
};

export const removeSinglePlayerFromCampaign = async (relationId: number) => {
  return await prisma.partyMembers.delete({
    where: {
      id: relationId
    }
  })
};

export const removeAllPlayersFromCampaign = async (campaignId: number) => {
  return await prisma.partyMembers.deleteMany({
    where: {
      campaignId: campaignId
    }
  })
};


//CHARACTERS
export const addSingleCharacterToCampaign = async (characterId: number, campaignId: number) => {
  return await prisma.character.update({
    where: {
      id: characterId
    },
    data: {
      campaignId: campaignId,
    },
  });
};

export const addCharactersToCampaign = async (characterList: number[], campaignId: number) => {
  const existingCharacters = await prisma.character.findMany({
    where: {
      id: { in: characterList },
      campaignId: campaignId,
    },
  });

  const existingCharacterIds = existingCharacters.map(cc => cc.id);

  const newCharacterIds = characterList.filter(id => !existingCharacterIds.includes(id));

  if (newCharacterIds.length > 0) {
    await prisma.character.updateMany({
      where: {
        id: { in: newCharacterIds }
      },
      data: {
        campaignId: campaignId,
      },
    });
  }
  return;
};

export const removeCharacterFromCampaign = async (characterId: number) => {
  return await prisma.character.update({
    where: { id: characterId },
    data: { campaignId: null },
  });
};

export const removeAllCharactersFromCampaign = async (campaignId: number) => {
  return await prisma.character.updateMany({
    where: { campaignId: campaignId },
    data: { campaignId: null },
  });
};