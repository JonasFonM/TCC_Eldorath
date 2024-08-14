import type { CharacterForm } from './types.server'
import { prisma } from './prisma.server'
import { json } from '@remix-run/node'

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


