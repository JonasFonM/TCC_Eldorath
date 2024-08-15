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
  const exists = await prisma.character.count({ where: { name: character.name } })
  if (exists) {
    return json({ error: `Character already exists with that name` }, { status: 400 })
  }

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

export const createCharSkills = async (skillList: number[], characterId: any) => {
  const createPromises = skillList.map(skillId =>
    prisma.character_skill.create({
      data: { skillId, characterId }
    })
  );
  const newcharacterskills = await Promise.all(createPromises);
  return newcharacterskills;
};

export function addSkill(skillList: number[], skillId: number) {
  skillList.push(skillId)
  return(skillList)
}