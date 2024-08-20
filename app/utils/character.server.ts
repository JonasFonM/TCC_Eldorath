/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CharacterForm } from './types.server'
import { prisma } from './prisma.server'
import { json } from '@remix-run/node'
import { character, skill } from '@prisma/client'

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
export const createStats = async (char: { skills: skill[], character: character }) => {
  const { body, tier, level, mind, agility, id } = char.character;

  const vitality = body + tier + 1;
  const vigor = body + level + mind;
  const power = mind;
  const speed = agility;
  const defense = agility;
  const initiative = agility;
  const baseWeight = (5 * body) + 10;
  const carryCap = 5 + 10 + (5 * body);
  const liftCap = 10 + 10 + (10 * body);

  const newcharacterstat = await prisma.charStats.create({
    data: {
      vitality,
      vigor,
      power,
      speed,
      defense,
      initiative,
      size: 1,
      baseWeight,
      carryCap,
      liftCap,
      characterId: id,
    },
  });

  return newcharacterstat;
};

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