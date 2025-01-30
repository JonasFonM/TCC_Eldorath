/*
  Warnings:

  - You are about to drop the column `slotTassets` on the `character` table. All the data in the column will be lost.
  - You are about to drop the `armor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `atkdamage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `attack` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `character_armor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `character_weapon` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `weapon` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `atkdamage` DROP FOREIGN KEY `dmg_ibfk_1`;

-- DropForeignKey
ALTER TABLE `attack` DROP FOREIGN KEY `a_ibfk_1`;

-- DropForeignKey
ALTER TABLE `character_armor` DROP FOREIGN KEY `character_armor_armorId_fkey`;

-- DropForeignKey
ALTER TABLE `character_armor` DROP FOREIGN KEY `character_armor_characterId_fkey`;

-- DropForeignKey
ALTER TABLE `character_weapon` DROP FOREIGN KEY `character_weapon_characterId_fkey`;

-- DropForeignKey
ALTER TABLE `character_weapon` DROP FOREIGN KEY `character_weapon_weaponId_fkey`;

-- AlterTable
ALTER TABLE `character` DROP COLUMN `slotTassets`,
    ADD COLUMN `slotUpperLegs` INTEGER NOT NULL DEFAULT 1;

-- DropTable
DROP TABLE `armor`;

-- DropTable
DROP TABLE `atkdamage`;

-- DropTable
DROP TABLE `attack`;

-- DropTable
DROP TABLE `character_armor`;

-- DropTable
DROP TABLE `character_weapon`;

-- DropTable
DROP TABLE `weapon`;

-- CreateTable
CREATE TABLE `item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `type` ENUM('slotAmulet', 'slotBelt', 'slotCloak', 'slotCuirass', 'slotEarings', 'slotGauntlet', 'slotGreaves', 'slotHelm', 'slotPauldron', 'slotRings', 'slotUpperLegs', 'slotWeapon', 'consumable') NOT NULL DEFAULT 'slotWeapon',
    `subType` ENUM('Bow', 'Discreet', 'Thrown', 'Firearm', 'Polearm', 'Natural', 'Harpoon', 'Crossbow', 'Whip', 'Club', 'Chain', 'Unarmed', 'FieldSword', 'DuelingSword', 'Scythe', 'Lance', 'Axe', 'Hammer', 'lArmor', 'mArmor', 'hArmor', 'lShield', 'mShield', 'hShield', 'Catalyst', 'Focus', 'Potion', 'Oil', 'Bomb') NOT NULL DEFAULT 'Bow',
    `baseWeight` INTEGER NOT NULL DEFAULT 1,
    `baseCost` INTEGER NOT NULL DEFAULT 10,
    `baseReach` INTEGER NULL,
    `baseDefense` INTEGER NULL,
    `impact` INTEGER NOT NULL DEFAULT 0,
    `pierce` INTEGER NOT NULL DEFAULT 0,
    `slash` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `character_item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `characterId` INTEGER NOT NULL,
    `itemId` INTEGER NOT NULL,
    `craftTier` INTEGER NOT NULL DEFAULT 1,
    `material` ENUM('Couro', 'Tecidos', 'Madeira', 'Bronze', 'Ferro', 'Aco', 'Prata', 'Ouro', 'Adamante', 'Draconico', 'Alquimico') NOT NULL DEFAULT 'Ferro',
    `weight` INTEGER NOT NULL DEFAULT 0,
    `cost` INTEGER NOT NULL DEFAULT 0,
    `equipped` BOOLEAN NOT NULL DEFAULT false,
    `reach` INTEGER NULL,
    `hitMod` INTEGER NULL,
    `defense` INTEGER NULL,
    `impact` INTEGER NOT NULL DEFAULT 0,
    `pierce` INTEGER NOT NULL DEFAULT 0,
    `slash` INTEGER NOT NULL DEFAULT 0,
    `acid` INTEGER NOT NULL DEFAULT 0,
    `cold` INTEGER NOT NULL DEFAULT 0,
    `fire` INTEGER NOT NULL DEFAULT 0,
    `lightning` INTEGER NOT NULL DEFAULT 0,
    `arcane` INTEGER NOT NULL DEFAULT 0,
    `cosmic` INTEGER NOT NULL DEFAULT 0,
    `psychic` INTEGER NOT NULL DEFAULT 0,
    `profane` INTEGER NOT NULL DEFAULT 0,
    `sacred` INTEGER NOT NULL DEFAULT 0,
    `full` INTEGER NOT NULL DEFAULT 0,
    `critDmgMod` INTEGER NOT NULL DEFAULT 0,
    `critChanceMod` INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `character_item` ADD CONSTRAINT `character_item_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `character`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `character_item` ADD CONSTRAINT `character_item_itemId_fkey` FOREIGN KEY (`itemId`) REFERENCES `item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
