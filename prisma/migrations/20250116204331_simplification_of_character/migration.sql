/*
  Warnings:

  - You are about to drop the `charstats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `resistances` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `armor` DROP FOREIGN KEY `armor_resistanceId_fkey`;

-- DropForeignKey
ALTER TABLE `character_armor` DROP FOREIGN KEY `character_armor_resistanceId_fkey`;

-- DropForeignKey
ALTER TABLE `charstats` DROP FOREIGN KEY `c_ibfk_1`;

-- DropForeignKey
ALTER TABLE `charstats` DROP FOREIGN KEY `charStats_resistanceId_fkey`;

-- AlterTable
ALTER TABLE `character` ADD COLUMN `acidRes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `actions` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `arcaneRes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `baseWeight` INTEGER NOT NULL DEFAULT 10,
    ADD COLUMN `carryCap` INTEGER NOT NULL DEFAULT 10,
    ADD COLUMN `coldRes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `cosmicRes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `fireRes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `fullRes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `impactRes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `initiative` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `liftCap` INTEGER NOT NULL DEFAULT 15,
    ADD COLUMN `lightningRes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `pierceRes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `poise` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `power` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `profaneRes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `psychicRes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `relativeSize` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `sacredRes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `slashRes` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `slotAmulet` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `slotBelt` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `slotCloak` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `slotCuirass` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `slotEarings` INTEGER NOT NULL DEFAULT 2,
    ADD COLUMN `slotGauntlet` INTEGER NOT NULL DEFAULT 2,
    ADD COLUMN `slotGreaves` INTEGER NOT NULL DEFAULT 2,
    ADD COLUMN `slotHelm` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `slotPauldron` INTEGER NOT NULL DEFAULT 2,
    ADD COLUMN `slotRings` INTEGER NOT NULL DEFAULT 10,
    ADD COLUMN `slotTassets` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `slotWeapon` INTEGER NOT NULL DEFAULT 2,
    ADD COLUMN `trueSize` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `vigor` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `vitality` INTEGER NOT NULL DEFAULT 1,
    MODIFY `level` INTEGER NOT NULL DEFAULT 1,
    MODIFY `tier` INTEGER NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE `charstats`;

-- DropTable
DROP TABLE `resistances`;
