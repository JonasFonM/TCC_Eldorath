/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CharacterForm } from './types.server'
import { prisma } from './prisma.server'
import { json } from '@remix-run/node'
import { character, path, skill } from '@prisma/client'

//BASIC
export const createCharacter = async (character: CharacterForm) => {
  const newcharacter = await prisma.character.create({
    data: {
      name: character.name,
      level: character.level,
      tier: character.tier,
      agility: character.agility,
      body: character.body,
      mind: character.mind,
      authorId: character.authorId
      },
  })
  return { id: newcharacter.id, name: character.name, tier: character.tier, agility: character.agility, body: character.body, mind: character.mind, authorId: character.authorId }
}

export async function submitCharacter(character: CharacterForm) {
  const newcharacter = await createCharacter(character)
  if (!newcharacter) {
    
    return json(
      {
        error: `Something went wrong trying to create a new character.`,
        fields: { name: character.name, tier: character.tier, agility: character.agility, body: character.body, mind: character.mind, authorId: character.authorId },
      },
      { status: 400 },
    )
  }
  return (String(newcharacter.id))
}

export const getCharactersFromUser = async (userId: number) => {
  return prisma.character.findMany({
    where: { authorId: userId },
    select: { id: true, name: true, authorId: true },
    orderBy:{
      createdAt: 'desc'
    }
  })
}

//STATS
export const createStats = async (char: { skills: skill[], character: character, paths: path[] }) => {
  const { body, tier, level, mind, agility, id } = char.character;
  const skillTrueSizes = char.skills.map(skill => skill.increaseTrueSize);
  const skillTrueSize = skillTrueSizes.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  const skillRelativeSizes = char.skills.map(skill => skill.increaseRelativeSize);
  const skillRelativeSize = skillRelativeSizes.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
  let pathsVit = 0
  char.paths.forEach(path => { pathsVit += path.vitality });
  let pathsPow = 0
  char.paths.forEach(path => { pathsPow += path.power });

  const vitality = body + tier + 1 + pathsVit;
  const vigor = body + level + mind;
  const power = mind + pathsPow;
  const speed = agility;
  const defense = agility;
  const initiative = agility;
  const trueSize = 1 + skillTrueSize;
  const relativeSize = 1 + skillRelativeSize;
  const baseWeight = (5 * body) + 10;
  const carryCap = 5 + 10 + (5 * body);
  const liftCap = 10 + 10 + (10 * body);

  const newcharacterstat = await prisma.charStats.upsert({
    create: {
      vitality,
      vigor,
      power,
      speed,
      defense,
      initiative,
      trueSize,
      relativeSize,
      baseWeight,
      carryCap,
      liftCap,
      characterId: id,
    },
    update: {
      vitality,
      vigor,
      power,
      speed,
      defense,
      initiative,
      trueSize,
      relativeSize,
      baseWeight,
      carryCap,
      liftCap,    },
    where: {
      characterId: char.character.id
    }
  });

  return newcharacterstat;
};

export function tierByLevel(level: any) {
  if (level < 5) {
    return '1';
  } else {
    if (level < 11) {
      return '2';
    } else {
      if (level < 17) {
        return '3';
      } else{
        if (level >= 17) {
          return '4';
        }
      }
    }
  }
}

//SKILLS
export const submitCharSkills = async (skillList: number[], characterId: number) => {
  const existingSkills = await prisma.character_skill.findMany({
    where: {
      skillId: { in: skillList },
      characterId: characterId,
    },
  });

  const existingSkillIds = existingSkills.map(cs => cs.skillId);
  
  const newSkills = skillList.filter(skillId => !existingSkillIds.includes(skillId));

  if (newSkills.length > 0) {
    await prisma.character_skill.createMany({
      data: newSkills.map(skillId => ({
        skillId: skillId,
        characterId: characterId,
      })),
      skipDuplicates: true, 
    });
  }

  return;
};

//LINEAGES
export const submitCharLineages = async (lineageList: number[], characterId: number, pure: boolean) => {
  const existingLineages = await prisma.character_lineage.findMany({
    where: {
      lineageId: { in: lineageList },
      characterId: characterId,
    },
  });

  const existingSkillIds = existingLineages.map(cs => cs.lineageId);
  
  const newLineages = lineageList.filter(lineageId => !existingSkillIds.includes(lineageId));

  if (newLineages.length > 0) {
    await prisma.character_lineage.createMany({
      data: newLineages.map(lineageId => ({
        lineageId: lineageId,
        characterId: characterId,
        pure: pure
      })),
      skipDuplicates: true, 
    });
  }

  return;
};

//PATHS

export const submitCharPaths = async (pathList: number[], characterId: number) => {
  const existingPaths = await prisma.character_path.findMany({
    where: {
      pathId: { in: pathList },
      characterId: characterId,
    },
  });

  const existingSkillIds = existingPaths.map(cs => cs.pathId);
  
  const newPaths = pathList.filter(pathId => !existingSkillIds.includes(pathId));

  if (newPaths.length > 0) {
    await prisma.character_path.createMany({
      data: newPaths.map(pathId => ({
        pathId: pathId,
        characterId: characterId,
      })),
      skipDuplicates: true, 
    });
  }

  return;
};

//TRAININGS

export const submitCharTrainings = async (trainingList: number[], characterId: number) => {
  const existingTrainings = await prisma.character_training.findMany({
    where: {
      trainingId: { in: trainingList },
      characterId: characterId,
    },
  });

  const existingTrainingIds = existingTrainings.map(ct => ct.trainingId);
  
  const newTrainings = trainingList.filter(trainingId => !existingTrainingIds.includes(trainingId));

  if (newTrainings.length > 0) {
    await prisma.character_training.createMany({
      data: newTrainings.map(trainingId => ({
        characterId: characterId,
        trainingId: trainingId,
      })),
      skipDuplicates: true, 
    });
  }

  return;
};