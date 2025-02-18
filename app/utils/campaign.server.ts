/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CampaignForm } from './types.server'
import { prisma } from './prisma.server'
import { json } from '@remix-run/node'

//BASIC
export const createCampaign = async (campaign: CampaignForm) => {

  const newcampaign = await prisma.campaign.create({
    data: {
      title: campaign.title,
      masterId: campaign.masterId,
      snippet: campaign.snippet,
      theme: campaign.theme,
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
    snippet: campaign.snippet,
    theme: campaign.theme,
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
      snippet: campaign.snippet,
      theme: campaign.theme,

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
    snippet: campaign.snippet,
    theme: campaign.theme,
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

export const getCampaignsFromMaster = async (userId: number) => {
  return prisma.campaign.findMany({
    where: { masterId: userId },
    select: { id: true, title: true, masterId: true },
    orderBy: {
      createdAt: 'desc'
    }
  })
}


//SCENES
export const createScene = async (campaign: CampaignForm, campaignId: number, title: string) => {
  const newscene = await prisma.scene.create({
    data: {
      title: title,
      campaignId: campaignId,
      era: campaign.era,
      month: campaign.month,
      monthDay: campaign.monthDay,
      weekDay: campaign.weekDay,
      roundCount: 0,
      playerTurn: false
    },
  })
  return {
    id: newscene.id,
    title: title,
    campaignId: campaignId,
    era: campaign.era,
    month: campaign.month,
    monthDay: campaign.monthDay,
    weekDay: campaign.weekDay,
    roundCount: 0,
    playerTurn: false
  }
};

//PLAYERS
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

export const removePlayersFromCampaign = async (partyMemberList: number[], campaignId: number) => {

  if (partyMemberList) {
    await prisma.partyMembers.deleteMany({
      where: {
        userId: { in: partyMemberList },
        campaignId: campaignId
      }
    })
  }
  return;
};


//CHARACTERS
export const addCharacterToCampaign = async (characterList: number[], campaignId: number) => {
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

//LOGS
export const createLog = async (characterId: number, sceneId: number, round: number, turnType: string, targetIds: string) => {
  return await prisma.log.create({
    data: {
      sceneId: sceneId,
      actorId: characterId,
      round: round,
      turnType: turnType,
      targetIds: targetIds
    },
  });

};

export const createLogAction = async (logId: number, actionId: number) => {
  return await prisma.logAction.create({
    data: {
      logId: logId,
      actionId: actionId,
    },
  });
};

export const createLogEffect = async (logId: number, effectId: number, targetIds: string, targetType: any) => {
  return await prisma.logEffect.create({
    data: {
      logId: logId,
      effectId: effectId,
      targetIds: targetIds,
      targetType: targetType,
    },
  });
};

export const createDamageLogs = async (logId: number, actorId: number, targetIds: string, preMitigationDamage: number, critical: boolean) => {
  return await prisma.damageLog.create({
    data: {
      logId: logId,
      actorId: actorId,
      targetIds: targetIds,
      preMitigationDamage: preMitigationDamage,
      critical: critical
    },
  });
};