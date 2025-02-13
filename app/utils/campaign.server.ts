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
      era: campaign.era,
      month: campaign.month,
      monthDay: campaign.monthDay,
      weekDay: campaign.weekDay,
      timeOfDay: campaign.timeOfDay,
      snippet: campaign.snippet,
      theme: campaign.theme,
      public: campaign.public

    },
  })
  return {
    id: newcampaign.id, title: campaign.title,
    masterId: campaign.masterId,
    era: campaign.era,
    month: campaign.month,
    monthDay: campaign.monthDay,
    weekDay: campaign.weekDay,
    timeOfDay: campaign.timeOfDay,
    snippet: campaign.snippet,
    theme: campaign.theme,
    public: campaign.public
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
      month: campaign.month,
      monthDay: campaign.monthDay,
      weekDay: campaign.weekDay,
      timeOfDay: campaign.timeOfDay,
      snippet: campaign.snippet,
      theme: campaign.theme,
      public: campaign.public

    },
  })
  return {
    title: campaign.title,
    masterId: campaign.masterId,
    era: campaign.era,
    month: campaign.month,
    monthDay: campaign.monthDay,
    weekDay: campaign.weekDay,
    timeOfDay: campaign.timeOfDay,
    snippet: campaign.snippet,
    theme: campaign.theme,
    public: campaign.public
  }
}

export async function submitCampaign(campaign: CampaignForm) {
  const newcampaign = await createCampaign(campaign)
  if (!newcampaign) {

    return json(
      {
        error: `Something went wrong trying to create a new campaign.`,
        fields: { title: campaign.title, month: campaign.month, monthDay: campaign.monthDay, weekDay: campaign.weekDay, timeOfDay: campaign.timeOfDay, masterId: campaign.masterId },
      },
      { status: 400 },
    )
  }
  return (String(newcampaign.id))
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
      timeOfDay: campaign.timeOfDay,
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
    timeOfDay: campaign.timeOfDay,
    roundCount: 0,
    playerTurn: false

  }
  return;
};

//LINEAGES
export const submitCharLineages = async (lineageList: number[], campaignId: number, pure: boolean) => {
  const existingLineages = await prisma.campaign_lineage.findMany({
    where: {
      lineageId: { in: lineageList },
      campaignId: campaignId,
    },
  });

  const existingSceneIds = existingLineages.map(cs => cs.lineageId);

  const newLineages = lineageList.filter(lineageId => !existingSceneIds.includes(lineageId));

  if (newLineages.length > 0) {
    await prisma.campaign_lineage.createMany({
      data: newLineages.map(lineageId => ({
        lineageId: lineageId,
        campaignId: campaignId,
        pure: pure
      })),
      skipDuplicates: true,
    });
    await prisma.campaign.update({
      where: { id: campaignId },
      data: {
        pendingLineages: 0
      }
    })
  }

  return;
};

//PATHS

export const submitCharPaths = async (pathList: number[], campaignId: number, pendingPaths: number) => {
  const existingPaths = await prisma.campaign_path.findMany({
    where: {
      pathId: { in: pathList },
      campaignId: campaignId,
    },
  });

  const existingSceneIds = existingPaths.map(cs => cs.pathId);

  const newPaths = pathList.filter(pathId => !existingSceneIds.includes(pathId));

  const newPendingPaths = pendingPaths - newPaths.length;


  if (newPaths.length > 0) {
    await prisma.campaign_path.createMany({
      data: newPaths.map(pathId => ({
        pathId: pathId,
        campaignId: campaignId,
      })),
      skipDuplicates: true,
    });
    await prisma.campaign.update({
      where: { id: campaignId },
      data: {
        pendingPath: newPendingPaths
      }
    })
  }

  return;
}