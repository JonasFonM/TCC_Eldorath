/*
  Warnings:

  - You are about to drop the column `cost` on the `armor` table. All the data in the column will be lost.
  - You are about to drop the column `craftTier` on the `armor` table. All the data in the column will be lost.
  - You are about to drop the column `defense` on the `armor` table. All the data in the column will be lost.
  - You are about to drop the column `material` on the `armor` table. All the data in the column will be lost.
  - You are about to drop the column `weaponId` on the `attack` table. All the data in the column will be lost.
  - You are about to drop the column `cost` on the `weapon` table. All the data in the column will be lost.
  - You are about to drop the column `craftTier` on the `weapon` table. All the data in the column will be lost.
  - You are about to drop the column `material` on the `weapon` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `weapon` table. All the data in the column will be lost.
  - You are about to drop the `armorresistances` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `charWeaponId` to the `attack` table without a default value. This is not possible if the table is not empty.
  - Added the required column `material` to the `character_armor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `material` to the `character_weapon` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `armorresistances` DROP FOREIGN KEY `armorResistances_armorId_fkey`;

-- DropForeignKey
ALTER TABLE `attack` DROP FOREIGN KEY `a_ibfk_1`;

-- AlterTable
ALTER TABLE `armor` DROP COLUMN `cost`,
    DROP COLUMN `craftTier`,
    DROP COLUMN `defense`,
    DROP COLUMN `material`,
    ADD COLUMN `baseCost` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `baseDefense` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `resistanceId` INTEGER NOT NULL DEFAULT 1,
    MODIFY `weight` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `atkdamage` ADD COLUMN `mndScale` INTEGER NOT NULL DEFAULT 0,
    MODIFY `physicalType` ENUM('Impact', 'Pierce', 'Slash') NULL,
    MODIFY `agiScale` INTEGER NOT NULL DEFAULT 0,
    MODIFY `strScale` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `attack` DROP COLUMN `weaponId`,
    ADD COLUMN `charWeaponId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `character_armor` ADD COLUMN `baseCost` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `craftTier` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `defense` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `material` ENUM('Adamantine', 'Bronze', 'DragonBone', 'Iron', 'Silver', 'Steel', 'Wood', 'Leather', 'Padding', 'DragonScale') NOT NULL,
    ADD COLUMN `resistanceId` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `weight` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `character_weapon` ADD COLUMN `baseReach` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `cost` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `craftTier` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `material` ENUM('Adamantine', 'Bronze', 'DragonBone', 'Iron', 'Silver', 'Steel', 'Wood', 'Leather', 'Padding', 'DragonScale') NOT NULL,
    ADD COLUMN `weight` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `charstats` ADD COLUMN `resistanceId` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `weapon` DROP COLUMN `cost`,
    DROP COLUMN `craftTier`,
    DROP COLUMN `material`,
    DROP COLUMN `weight`,
    ADD COLUMN `baseCost` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `baseWeight` INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE `armorresistances`;

-- CreateTable
CREATE TABLE `resistances` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `impactRes` INTEGER NOT NULL DEFAULT 0,
    `pierceRes` INTEGER NOT NULL DEFAULT 0,
    `slashRes` INTEGER NOT NULL DEFAULT 0,
    `acidRes` INTEGER NOT NULL DEFAULT 0,
    `coldRes` INTEGER NOT NULL DEFAULT 0,
    `fireRes` INTEGER NOT NULL DEFAULT 0,
    `arcaneRes` INTEGER NOT NULL DEFAULT 0,
    `cosmicRes` INTEGER NOT NULL DEFAULT 0,
    `psychicRes` INTEGER NOT NULL DEFAULT 0,
    `occultRes` INTEGER NOT NULL DEFAULT 0,
    `profaneRes` INTEGER NOT NULL DEFAULT 0,
    `sacredRes` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `charStats` ADD CONSTRAINT `charStats_resistanceId_fkey` FOREIGN KEY (`resistanceId`) REFERENCES `resistances`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attack` ADD CONSTRAINT `a_ibfk_1` FOREIGN KEY (`charWeaponId`) REFERENCES `character_weapon`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `armor` ADD CONSTRAINT `armor_resistanceId_fkey` FOREIGN KEY (`resistanceId`) REFERENCES `resistances`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `character_armor` ADD CONSTRAINT `character_armor_resistanceId_fkey` FOREIGN KEY (`resistanceId`) REFERENCES `resistances`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
