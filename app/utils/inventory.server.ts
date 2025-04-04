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
    Potion: 'Alquímico',
    Oil: 'Alquímico',
    Bomb: 'Alquímico',
    lArmor: 'Algodão',
    Focus: 'Bronze',
    Jewel: 'Bronze'
  };

  // Count occurrences of each itemId in itemList
  const itemCountMap = itemList.reduce((acc, itemId) => {
    acc[itemId] = (acc[itemId] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);

  if (itemList.length > 0) {
    const characterItemsData = selectedItems.flatMap(i =>
      Array.from({ length: itemCountMap[i.id] }, () => ({
        characterId: characterId,
        itemId: i.id,
        craftTier: 1,
        material: materialMapping[i.subType] || 'Ferro',
        weight: i.baseWeight,
        cost: i.baseCost

      }))
    );

    await prisma.character_item.createMany({
      data: characterItemsData
    });

    await prisma.character.update({
      where: { id: characterId },
      data: {
        gold: {
          decrement: selectedItems
            .map(i => i.baseCost * itemCountMap[i.id])
            .reduce((acc, cost) => acc + cost, 0)
        }
      }
    });
  }

  return;
};
export const deleteItemById = async (id: number) => {
  await prisma.character_item.delete({
    where: { id: id }
  })
};

export const equipItemToSlot = async (character_itemId: number, slot: number) => {
  await prisma.character_item.update({
    where: { id: character_itemId },
    data: { equipped: slot }
  })
}

export const unequipItem = async (character_itemId: number) => {
  await prisma.character_item.update({
    where: { id: character_itemId },
    data: { equipped: -1 }
  })
}

export const twoHandWeapon = async (character_itemId: number, offslot: number) => {
  await prisma.character_item.update({
    where: { id: character_itemId },
    data: { twoHanded: offslot }
  })
}