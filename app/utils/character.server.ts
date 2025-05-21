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
  const defense = character.agility;
  const magicdefense = character.mind;

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
      defense: defense,
      magicDefense: magicdefense,
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
    defense: defense,
    magicDefense: magicdefense,
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
  const defense = character.agility;
  const magicdefense = character.mind;


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
      defense: defense,
      magicDefense: magicdefense

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
    defense: defense,
    magicDefense: magicdefense,
    authorId: character.authorId
  }
}

export async function submitCharacter(character: CharacterForm) {
  const newcharacter = await createCharacter(character)
  if (!newcharacter) {

    return json(
      {
        error: `Houve um erro na criação de Personagem.`,
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
export const updateSkillPendencies = async (characterId: number, skillQuantity: number, pendingSkills: number) => {

  const newPendingSkills = pendingSkills - skillQuantity

  await prisma.character.update({
    where: { id: characterId },
    data: {
      pendingSkills: newPendingSkills
    }
  })
}

export const updateManeuverPendencies = async (characterId: number, skillQuantity: number, pendingManeuvers: number) => {

  const newPendingManeuvers = pendingManeuvers - skillQuantity

  await prisma.character.update({
    where: { id: characterId },
    data: {
      pendingManeuver: newPendingManeuvers
    }
  })
}

export const updateMagicPendencies = async (characterId: number, skillQuantity: number, pendingMagics: number) => {

  const newPendingMagics = pendingMagics - skillQuantity

  await prisma.character.update({
    where: { id: characterId },
    data: {
      pendingMagic: newPendingMagics
    }
  })
}

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
}

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

export const addPendingManeuverOrMagics = async (characterId: number, pathId: number) => {
  const path = await prisma.path.findUnique({
    where: { id: pathId }
  })

  const addMagics = path?.addMagics || 0
  const addManeuvers = path?.addManeuvers || 0

  if (addMagics > 0) {
    await prisma.character.update({
      where: { id: characterId },
      data: {
        pendingMagic: addMagics
      }
    })
  }

  if (addManeuvers > 0) {
    await prisma.character.update({
      where: { id: characterId },
      data: {
        pendingManeuver: addManeuvers
      }
    })
  }

}

export const addPathBasedSkills = async (characterId: number, pathId: number) => {
  const path = await prisma.path.findUnique({
    where: { id: pathId },
    include: { skills: true }
  })

  const skills = await prisma.skill.findMany({
    where: { id: { in: path?.skills.map(ps => ps.skillId) } }
  })

  if (skills.length > 0) {
    await prisma.character_skill.createMany({
      data: skills.map(sk => ({
        skillId: sk.id,
        characterId: characterId,
      })),
      skipDuplicates: true,
    });

  }
}

export const addPathBasedStats = async (characterId: number, pathId: number) => {
  const path = await prisma.path.findUnique({
    where: { id: pathId },
  })

  const addVitality = path?.vitality || 0
  const addPower = path?.power || 0

  if (addVitality > 0) {
    await prisma.character.update({
      where: { id: characterId },
      data: {
        vitality: { increment: addVitality },
        currentVitality: { increment: addVitality }
      }
    })
  }

  if (addPower > 0) {
    await prisma.character.update({
      where: { id: characterId },
      data: {
        power: { increment: addPower },
        currentPower: { increment: addPower }
      }
    })
  }
}

export const submitCharPaths = async (pathList: number[], characterId: number, pendingPaths: number, pathTiers: number) => {
  const existingPaths = await prisma.character_path.findMany({
    where: {
      pathId: { in: pathList },
      characterId: characterId,
    },
  });

  const existingSkillIds = existingPaths.map(cs => cs.pathId);

  const newPaths = pathList.filter(pathId => !existingSkillIds.includes(pathId));

  const newPendingPaths = pendingPaths - pathTiers;


  if (newPaths.length > 0) {
    await prisma.character_path.createMany({
      data: newPaths.map(pathId => ({
        pathId: pathId,
        characterId: characterId,
      })),
      skipDuplicates: true,
    });

    newPaths.map(np => addPendingManeuverOrMagics(characterId, np))

    newPaths.map(np => addPathBasedSkills(characterId, np))

    newPaths.map(np => addPathBasedStats(characterId, np))


    await prisma.character.update({
      where: { id: characterId },
      data: {
        pendingPath: newPendingPaths
      }
    })

  }

  return;
}