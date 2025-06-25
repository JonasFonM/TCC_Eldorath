/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CharacterForm } from './types.server'
import { prisma } from './prisma.server'
import { json } from '@remix-run/node'

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
      authorId: character.authorId,
    },
  })
  return {
    id: newcharacter.id, name: character.name,
    tier: character.tier,
    agility: character.agility,
    body: character.body,
    mind: character.mind,
    authorId: character.authorId
  }
}

export const updateCharacter = async (character: CharacterForm, characterId: number) => {

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


    },
  })
  return {
    id: updatedCharacter.id,
    name: character.name,
    tier: character.tier,
    agility: character.agility,
    body: character.body,
    mind: character.mind,
    authorId: character.authorId
  }
}

export async function prepareCharacterStats(characterId: number) {
  const character = await prisma.character.findUnique({
    where: {
      id: characterId
    }
  })

  if (character === null) return;

  const vitality = (character.body + character.tier + character.effectiveSize) * (character.boss ? 2 : 1);
  const vigor = (character.level + character.body + character.mind) * (character.boss ? 2 : 1);
  const power = (character.tier + character.mind) * (character.boss ? 2 : 1);
  const carryCap = 10 + (5 * character.effectiveSize) + (5 * character.body);
  const liftCap = 10 + (10 * character.effectiveSize) + (10 * character.body);
  const weight = 5 + ((character.body * character.trueSize))
  const defense = character.agility;
  const magicdefense = character.mind;

  const updatedCharacter = await prisma.character.update({
    where: {
      id: characterId
    }
    ,
    data: {
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
      magicDefense: magicdefense

    },
  })
  return {
    id: updatedCharacter.id,
    vitality: vitality,
    vigor: vigor,
    power: power,
    carryCap: carryCap,
    liftCap: liftCap,
    baseWeight: weight,
    defense: defense,
    magicDefense: magicdefense,
  }

}

export async function characterResourceTotalRecovery(characterId: number) {
  const character = await prisma.character.findUnique({
    where: {
      id: characterId
    }
  })

  if (character === null) return;

  const updatedCharacter = await prisma.character.update({
    where: {
      id: characterId
    }
    ,
    data: {
      currentPower: character.power,
      currentVigor: character.vigor,
      currentVitality: character.vitality
    },
  })

  return {
    id: updatedCharacter.id,
    currentPower: updatedCharacter.currentPower,
    currentVigor: updatedCharacter.currentVigor,
    currentVitality: updatedCharacter.currentVitality
  }

}

export async function privatizeCharacter(characterId: number) {
  const character = await prisma.character.findUnique({
    where: {
      id: characterId
    }
  })

  if (character === null) return;

  return await prisma.character.update({
    where: { id: characterId },
    data: {
      public: false
    }
  })
}

export async function publishCharacter(characterId: number) {
  const character = await prisma.character.findUnique({
    where: {
      id: characterId
    }
  })

  if (character === null) return;

  return await prisma.character.update({
    where: { id: characterId },
    data: {
      public: true
    }
  })
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

export const getPublicCharactersFromUser = async (userId: number) => {
  return prisma.character.findMany({
    where: { authorId: userId, npc: false, public: true },
    select: { id: true, name: true, authorId: true },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export const getAllCharactersFromUser = async (userId: number) => {
  return prisma.character.findMany({
    where: { authorId: userId, npc: false },
    select: { id: true, name: true, authorId: true },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export const getNPCsFromUser = async (userId: number) => {
  return prisma.character.findMany({
    where: { authorId: userId, npc: true },
    select: { id: true, name: true, authorId: true },
    orderBy: {
      createdAt: 'desc'
    }
  })
}

export function tierByLevel(level: any) {
  if (level >= 17 && level > 16) {
    return '4';
  }
  if (level <= 16 && level > 10) {
    return '3';
  }
  if (level <= 10 && level > 4) {
    return '2';
  }
  if (level <= 4) {
    return '1';
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

export const addPathBasedStats = async (characterId: number, pathIds: number[]) => {
  const paths = await prisma.path.findMany({
    where: { id: { in: pathIds } },
  })

  const character = await prisma.character.findUnique({
    where: { id: characterId },
  })

  if (character === null) return

  const baseVitality = (character.body + character.tier + character.effectiveSize) * (character.boss ? 2 : 1);
  const basePower = (character.tier + character.mind) * (character.boss ? 2 : 1);
  const addVitality = paths.map(p => p.vitality).reduce((acc, cost) => acc + cost, 0)
  const addPower = paths.map(p => p.power).reduce((acc, cost) => acc + cost, 0)

  if (addVitality > 0) {
    await prisma.character.update({
      where: { id: characterId },
      data: {
        vitality: baseVitality + addVitality,
        currentVitality: baseVitality + addVitality
      }
    })
  }

  if (addPower > 0) {
    await prisma.character.update({
      where: { id: characterId },
      data: {
        power: basePower + addPower,
        currentPower: basePower + addPower
      }
    })
  }

  return;
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

    await prisma.character.update({
      where: { id: characterId },
      data: {
        pendingPath: newPendingPaths
      }
    })

  }

  return;
}