/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CharacterForm } from './types.server'
import { prisma } from './prisma.server'
import { json } from '@remix-run/node'
import { character } from '@prisma/client'

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
  const newcharacterstat = await createCharacterStats(newcharacter)
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
export const createCharacterStats = async (character: any) => {

  const newcharacterstat = await prisma.charStats.create({
    data: {
      vitality: (character.body + character.tier + 1),
      vigor: (character.body + character.level + character.mind),
      power: character.mind,
      speed: character.agility,
      defense: character.agility,
      iniciative: character.agility,
      size: 1,
      baseWeight: (5 * character.body) + 10,
      carryCap: 5 + 10 + (5 * character.body),
      liftCap: 10 + 10 + (10 * character.body),
      characterId: character.id
      },
  })
  return { id: newcharacterstat.id, vitality: (character.body + character.tier + 1),
    vigor: (character.body + character.level + character.mind),
    power: character.mind,
    speed: character.agility,
    defense: character.agility,
    iniciative: character.agility,
    size: 1,
    baseWeight: (5 * character.body) + 10,
    carryCap: 5 + 10 + (5 * character.body),
    liftCap: 10 + 10 + (10 * character.body),
    characterId: character.id }
}