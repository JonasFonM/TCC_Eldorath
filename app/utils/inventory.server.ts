import { prisma } from "./prisma.server";


export const submitCharWeapons = async (weaponList: number[], characterId: number) => {
    const existingWeapons = await prisma.character_weapon.findMany({
      where: {
        weaponId: { in: weaponList },
        characterId: characterId,
      },
    });
  
    const existingWeaponIds = existingWeapons.map(cs => cs.weaponId);
    
    const newWeapons = weaponList.filter(weaponId => !existingWeaponIds.includes(weaponId));
  
    if (newWeapons.length > 0) {
      await prisma.character_weapon.createMany({
        data: newWeapons.map(weaponId => ({
          weaponId: weaponId,
          characterId: characterId,
          material: 'Iron',
          craftTier: 1,

        })),
        skipDuplicates: true, 
      });
    }
  
    return;
  };

  export const submitCharArmors = async (armorList: number[], characterId: number) => {
    const existingArmors = await prisma.character_armor.findMany({
      where: {
        armorId: { in: armorList },
        characterId: characterId,
      },
    });
  
    const existingArmorIds = existingArmors.map(cs => cs.armorId);
    
    const newArmors = armorList.filter(armorId => !existingArmorIds.includes(armorId));
  
    if (newArmors.length > 0) {
      await prisma.character_armor.createMany({
        data: newArmors.map(armorId => ({
          armorId: armorId,
          characterId: characterId,
          material: 'Iron'
        })),
        skipDuplicates: true, 
      });
    }
  
    return;
  };