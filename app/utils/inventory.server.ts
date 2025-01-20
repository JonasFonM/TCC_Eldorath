import { prisma } from "./prisma.server";


export const submitCharWeapons = async (weaponList: number[], characterId: number) => {

  const selectedWeapons = await prisma.weapon.findMany({
    where: {
      id: { in: weaponList },
    },
  });

  if (weaponList.length > 0) {
    await prisma.character_weapon.createMany({
      data: selectedWeapons.map(w => ({
        weaponId: w.id,
        characterId: characterId,
        cost: w.baseCost,
        material: 'Ferro',
        craftTier: 1,
        weight: w.baseWeight,
        reach: w.baseReach,

      })),
      skipDuplicates: false,
    });

    await prisma.character.update({
      where: {
        id: characterId
      },
      data: {
        gold: { decrement: selectedWeapons.map(w => w.baseCost).reduce((accumulator, currentValue) => accumulator + currentValue, 0) }
      }
    })
  }

  return;
};

export const deleteWeaponById = async (id: number) => {
  await prisma.character_weapon.delete({
    where: { id: id }
  })
};



export const submitCharArmors = async (armorList: number[], characterId: number) => {
  const selectedArmors = await prisma.armor.findMany({
    where: {
      id: { in: armorList },
    },
  });



  if (armorList.length > 0) {
    await prisma.character_armor.createMany({
      data: selectedArmors.map(a => ({
        armorId: a.id,
        characterId: characterId,
        baseCost: a.baseCost,
        material: 'Ferro',
        craftTier: 1,
        defense: a.baseDefense,
        weight: a.weight,
        resistanceId: a.resistanceId,

      })),
      skipDuplicates: false,
    });

    await prisma.character.update({
      where: {
        id: characterId
      },
      data: {
        gold: { decrement: selectedArmors.map(a => a.baseCost).reduce((accumulator, currentValue) => accumulator + currentValue, 0) }
      }
    })

  }

  return;
};