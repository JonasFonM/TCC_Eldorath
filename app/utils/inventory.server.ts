import { prisma } from "./prisma.server";

export const submitStartingCharItems = async (itemList: number[], characterId: number) => {

  const selectedItems = await prisma.item.findMany({
    where: {
      id: { in: itemList },
    },
  });

  const materialMapping: { [key: string]: any } = {
    Arco: 'Madeira',
    Leve: 'Tecido',
    Traje: 'Tecido',
    Joalheria: 'Bronze',
  };

  const itemCountMap = itemList.reduce((acc, itemId) => {
    acc[itemId] = (acc[itemId] || 0) + 1;
    return acc;
  }, {} as Record<number, number>);


  if (itemList.length > 0) {

    const selectedItemsWithMaterial = selectedItems.filter(si => si.type !== 'consumable' && si.subType !== 'Disparo' && si.subType !== 'Natural')
    const selectedItemsWithoutMaterial = selectedItems.filter(si => !selectedItemsWithMaterial.includes(si))

    const selectedItemsWithMaterialData = selectedItemsWithMaterial.flatMap(i =>
      Array.from({ length: itemCountMap[i.id] }, () => ({
        characterId: characterId,
        itemId: i.id,
        craftTier: 1,
        material: materialMapping[i.subType] || 'Ferro',
        weight: i.baseWeight,
        cost: i.baseCost

      }))
    )

    const selectedItemsWithoutMaterialData = (selectedItemsWithoutMaterial.flatMap(i =>
      Array.from({ length: itemCountMap[i.id] }, () => ({
        characterId: characterId,
        itemId: i.id,
        craftTier: 1,
        weight: i.baseWeight,
        cost: i.baseCost
      }))
    ));

    await prisma.character_item.createMany({
      data: selectedItemsWithMaterialData
    });

    await prisma.character_item.createMany({
      data: selectedItemsWithoutMaterialData
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