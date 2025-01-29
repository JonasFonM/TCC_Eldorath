/*
  Warnings:

  - You are about to drop the column `resistanceId` on the `armor` table. All the data in the column will be lost.
  - You are about to drop the column `resistanceId` on the `character_armor` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `armor` DROP COLUMN `resistanceId`,
    ADD COLUMN `acidRes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `arcaneRes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `coldRes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `cosmicRes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `fireRes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `fullRes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `impactRes` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `lightningRes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `pierceRes` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `profaneRes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `psychicRes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `sacredRes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `slashRes` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `slotType` ENUM('slotWeapon', 'slotHelm', 'slotPauldron', 'slotGauntlet', 'slotCuirass', 'slotTassets', 'slotGreaves', 'slotCloak', 'slotAmulet', 'slotBelt', 'slotRings', 'slotEarings') NOT NULL DEFAULT 'slotCuirass';

-- AlterTable
ALTER TABLE `character_armor` DROP COLUMN `resistanceId`,
    ADD COLUMN `acidRes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `arcaneRes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `coldRes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `cosmicRes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `fireRes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `fullRes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `impactRes` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `lightningRes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `pierceRes` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `profaneRes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `psychicRes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `sacredRes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `slashRes` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `slotType` ENUM('slotWeapon', 'slotHelm', 'slotPauldron', 'slotGauntlet', 'slotCuirass', 'slotTassets', 'slotGreaves', 'slotCloak', 'slotAmulet', 'slotBelt', 'slotRings', 'slotEarings') NOT NULL DEFAULT 'slotCuirass';

-- AlterTable
ALTER TABLE `character_weapon` ADD COLUMN `slotType` ENUM('slotWeapon', 'slotHelm', 'slotPauldron', 'slotGauntlet', 'slotCuirass', 'slotTassets', 'slotGreaves', 'slotCloak', 'slotAmulet', 'slotBelt', 'slotRings', 'slotEarings') NOT NULL DEFAULT 'slotWeapon';
