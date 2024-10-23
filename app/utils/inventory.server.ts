import { prisma } from "./prisma.server";


export const checkWeaponTrainings = async (weaponList: number[], characterId: number) => {

  const selectedWeapons = await prisma.weapon.findMany({
    where: {
      id: { in: weaponList },
    },
  });

  const charTraining = await prisma.character_training.findMany({
    where: {
      characterId: characterId,
      trainingId: { in: selectedWeapons.map(w => w.trainingId) }
    },
  })
  const isTrained = charTraining.length > 0;

  await prisma.character_weapon.updateMany({
    where: {
      characterId: characterId,
      weaponId: { in: selectedWeapons.map(w => w.id) }
    },
    data: {
      trained: isTrained,
    }
  })
  return isTrained
};

export const submitCharWeapons = async (weaponList: number[], characterId: number) => {

  const selectedWeapons = await prisma.weapon.findMany({
    where: {
      id: { in: weaponList },
    },
  });

  const isTrained = await checkWeaponTrainings(weaponList, characterId);


  if (weaponList.length > 0) {
    await prisma.character_weapon.createMany({
      data: selectedWeapons.map(w => ({
        weaponId: w.id,
        characterId: characterId,
        cost: w.baseCost,
        material: 'Iron',
        craftTier: 1,
        weight: w.baseWeight,
        reach: w.baseReach,
        trained: isTrained,

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

  const charTraining = await prisma.character_training.findMany({
    where: {
      characterId: characterId,
      trainingId: { in: selectedArmors.map(a => a.trainingId) }
    }
  })


  if (armorList.length > 0) {
    await prisma.character_armor.createMany({
      data: selectedArmors.map(a => ({
        armorId: a.id,
        characterId: characterId,
        baseCost: a.baseCost,
        material: 'Iron',
        craftTier: 1,
        defense: a.baseDefense,
        weight: a.weight,
        resistanceId: a.resistanceId,
        trained: charTraining ? true : false,

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