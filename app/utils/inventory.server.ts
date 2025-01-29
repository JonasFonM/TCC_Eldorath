/* eslint-disable @typescript-eslint/no-explicit-any */
import { prisma } from "./prisma.server";


export const submitStartingCharItems = async (itemList: number[], characterId: number) => {

  const selectedItems = await prisma.item.findMany({
    where: {
      id: { in: itemList },
    },
  });

  const materialMapping: { [key: string]: any } = {
    Bow: 'Madeira',
    Club: 'Madeira',
    Whip: 'Couro',
    Catalyst: 'Madeira',
    Potion: 'Alquimico',
    Oil: 'Alquimico',
    Bomb: 'Alquimico'
  };

  const weaponMapping: { [key: string]: any} = {
    slotWeapon: 0  
  }

  if (itemList.length > 0) {

    await prisma.character_item.createMany({
      data: selectedItems.map(i => (
        {
        characterId: characterId,
        itemId: i.id,
        craftTier: 1,
        material: materialMapping[i.itemSubtype] || 'Ferro',
        weight: i.baseWeight,
        cost: i.baseCost,        

        reach: i.baseReach || null,
        hitMod: weaponMapping[i.itemType] || null,

        defense: i.baseDefense || null,
        
        impact: i.impact,
        pierce: i.pierce,
        slash: i.slash

      })),
      skipDuplicates: false,
    });

    await prisma.character.update({
      where: {
        id: characterId
      },
      data: {
        gold: { decrement: selectedItems.map(i => i.baseCost).reduce((accumulator, currentValue) => accumulator + currentValue, 0) }
      }
    })
  }

  return;
};

export const deleteItemById = async (id: number) => {
  await prisma.character_item.delete({
    where: { id: id }
  })
};
