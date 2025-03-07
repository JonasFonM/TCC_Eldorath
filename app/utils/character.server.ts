/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CharacterForm } from './types.server'
import { prisma } from './prisma.server'
import { json } from '@remix-run/node'

//BASIC
export const createCharacter = async (character: CharacterForm) => {
  const vitality = character.body + character.tier + 1;
  const vigor = character.level + character.body + character.mind;
  const power = character.tier + character.mind;
  const carryCap = 15 + (5 * character.body);
  const liftCap = 20 + (10 * character.body);
  const weight = 10 + (2 * character.body)
  const initiative = character.agility;
  const defense = character.agility;

  const newcharacter = await prisma.character.create({
    data: {
      name: character.name,
      level: character.level,
      tier: character.tier,
      agility: character.agility,
      body: character.body,
      mind: character.mind,
      authorId: character.authorId,
      vitality: vitality,
      vigor: vigor,
      power: power,
      currentVitality: vitality,
      currentVigor: vigor,
      currentPower: power,
      carryCap: carryCap,
      liftCap: liftCap,
      baseWeight: weight,
      initiative: initiative,
      defense: defense
    },
  })
  return {
    id: newcharacter.id, name: character.name,
    tier: character.tier,
    agility: character.agility,
    body: character.body,
    mind: character.mind,
    vitality: vitality,
    vigor: vigor,
    power: power,
    currentVitality: vitality,
    currentVigor: vigor,
    currentPower: power,
    carryCap: carryCap,
    liftCap: liftCap,
    baseWeight: weight,
    initiative: initiative,
    defense: defense,
    authorId: character.authorId
  }
}

export const updateCharacter = async (character: CharacterForm, characterId: number) => {
  const vitality = character.body + character.tier + 1;
  const vigor = character.level + character.body + character.mind;
  const power = character.tier + character.mind;
  const carryCap = 15 + (5 * character.body);
  const liftCap = 20 + (10 * character.body);
  const weight = 10 + (2 * character.body)
  const initiative = character.agility;
  const defense = character.agility;


  const updatedCharacter = await prisma.character.update({
    where: {
      id: characterId
    }
    ,
    data: {
      name: character.name,
      level: character.level,
      tier: character.tier,
      agility: character.agility,
      body: character.body,
      mind: character.mind,
      vitality: vitality,
      vigor: vigor,
      power: power,
      carryCap: carryCap,
      liftCap: liftCap,
      baseWeight: weight,
      initiative: initiative,
      defense: defense

    },
  })
  return {
    id: updatedCharacter.id,
    name: character.name,
    tier: character.tier,
    agility: character.agility,
    body: character.body,
    mind: character.mind,
    vitality: vitality,
    vigor: vigor,
    power: power,
    carryCap: carryCap,
    liftCap: liftCap,
    baseWeight: weight,
    initiative: initiative,
    defense: defense,
    authorId: character.authorId
  }
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
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export function tierByLevel(level: any) {
  if (level < 5) {
    return '1';
  } else {
    if (level < 11) {
      return '2';
    } else {
      if (level < 17) {
        return '3';
      } else {
        if (level >= 17) {
          return '4';
        }
      }
    }
  }
}

//SKILLS
export const submitCharSkills = async (skillList: number[], characterId: number, pendingSkills: number) => {
  const existingSkills = await prisma.character_skill.findMany({
    where: {
      skillId: { in: skillList },
      characterId: characterId,
    },
  });

  const existingSkillIds = existingSkills.map(cs => cs.skillId);

  const newSkills = skillList.filter(skillId => !existingSkillIds.includes(skillId));

  const newPendingSkills = pendingSkills - newSkills.length;



  if (newSkills.length > 0) {
    await prisma.character_skill.createMany({
      data: newSkills.map(skillId => ({
        skillId: skillId,
        characterId: characterId,
      })),
      skipDuplicates: true,
    });
    await prisma.character.update({
      where: { id: characterId },
      data: {
        pendingSkills: newPendingSkills
      }
    })
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
    await prisma.character.update({
      where: { id: characterId },
      data: {
        pendingLineages: 0
      }
    })
  }

  return;
};

//PATHS

export const submitCharPaths = async (pathList: number[], characterId: number, pendingPaths: number) => {
  const existingPaths = await prisma.character_path.findMany({
    where: {
      pathId: { in: pathList },
      characterId: characterId,
    },
  });

  const existingSkillIds = existingPaths.map(cs => cs.pathId);

  const newPaths = pathList.filter(pathId => !existingSkillIds.includes(pathId));

  const newPendingPaths = pendingPaths - newPaths.length;


  if (newPaths.length > 0) {
    await prisma.character_path.createMany({
      data: newPaths.map(pathId => ({
        pathId: pathId,
        characterId: characterId,
      })),
      skipDuplicates: true,
    });
    await prisma.character.update({
      where: { id: characterId },
      data: {
        pendingPath: newPendingPaths
      }
    })
  }

  return;
}