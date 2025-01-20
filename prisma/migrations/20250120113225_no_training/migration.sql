/*
  Warnings:

  - You are about to drop the column `baseDmg` on the `atkdamage` table. All the data in the column will be lost.
  - You are about to drop the column `critDmg` on the `atkdamage` table. All the data in the column will be lost.
  - You are about to drop the column `elementSubtype` on the `atkdamage` table. All the data in the column will be lost.
  - You are about to drop the column `hermeticSubtype` on the `atkdamage` table. All the data in the column will be lost.
  - You are about to drop the column `magicalType` on the `atkdamage` table. All the data in the column will be lost.
  - You are about to drop the column `physicalType` on the `atkdamage` table. All the data in the column will be lost.
  - You are about to alter the column `agiScale` on the `atkdamage` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `strScale` on the `atkdamage` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to alter the column `mndScale` on the `atkdamage` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Double`.
  - You are about to drop the column `critOn` on the `attack` table. All the data in the column will be lost.
  - You are about to drop the column `hitOn` on the `attack` table. All the data in the column will be lost.
  - You are about to drop the column `tod` on the `campaign` table. All the data in the column will be lost.
  - The values [Helidai,Agredai,Oridai,Victadai] on the enum `campaign_weekDay` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `actions` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `poise` on the `character` table. All the data in the column will be lost.
  - The values [Adamantine,DragonBone,Iron,Silver,Steel,Wood,Leather,Padding,DragonScale] on the enum `character_armor_material` will be removed. If these variants are still used in the database, this will fail.
  - The values [Adamantine,DragonBone,Iron,Silver,Steel,Wood,Leather,Padding,DragonScale] on the enum `character_armor_material` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `trainingId` on the `weapon` table. All the data in the column will be lost.
  - You are about to drop the `character_training` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `path_training` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `training` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `damageType` to the `atkDamage` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeOfDay` to the `campaign` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `armor` DROP FOREIGN KEY `armor_trainingId_fkey`;

-- DropForeignKey
ALTER TABLE `character_training` DROP FOREIGN KEY `ct_ibfk_1`;

-- DropForeignKey
ALTER TABLE `character_training` DROP FOREIGN KEY `ct_ibfk_2`;

-- DropForeignKey
ALTER TABLE `path_training` DROP FOREIGN KEY `pt_ibfk_1`;

-- DropForeignKey
ALTER TABLE `path_training` DROP FOREIGN KEY `pt_ibfk_2`;

-- DropForeignKey
ALTER TABLE `weapon` DROP FOREIGN KEY `weapon_trainingId_fkey`;

-- DropIndex
DROP INDEX `armor_resistanceId_fkey` ON `armor`;

-- DropIndex
DROP INDEX `character_armor_resistanceId_fkey` ON `character_armor`;

-- AlterTable
ALTER TABLE `atkdamage` DROP COLUMN `baseDmg`,
    DROP COLUMN `critDmg`,
    DROP COLUMN `elementSubtype`,
    DROP COLUMN `hermeticSubtype`,
    DROP COLUMN `magicalType`,
    DROP COLUMN `physicalType`,
    ADD COLUMN `baseDie` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `damageType` ENUM('Impact', 'Pierce', 'Slash', 'Acid', 'Cold', 'Fire', 'Lightning', 'Arcane', 'Cosmic', 'Psychic', 'Profane', 'Sacred') NOT NULL,
    MODIFY `agiScale` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `strScale` DOUBLE NOT NULL DEFAULT 0,
    MODIFY `mndScale` DOUBLE NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `attack` DROP COLUMN `critOn`,
    DROP COLUMN `hitOn`,
    ADD COLUMN `critChance` INTEGER NOT NULL DEFAULT 6,
    ADD COLUMN `critMult` DOUBLE NOT NULL DEFAULT 2,
    ADD COLUMN `hitMod` INTEGER NOT NULL DEFAULT 0,
    MODIFY `charWeaponId` INTEGER NULL;

-- AlterTable
ALTER TABLE `campaign` DROP COLUMN `tod`,
    ADD COLUMN `timeOfDay` ENUM('Dawn', 'Day', 'Night', 'Dusk') NOT NULL,
    MODIFY `weekDay` ENUM('Aeteri', 'Silveri', 'Ulri', 'Auramari', 'Viveri', 'Justari', 'Exori') NOT NULL;

-- AlterTable
ALTER TABLE `character` DROP COLUMN `actions`,
    DROP COLUMN `poise`,
    ADD COLUMN `defense` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `character_armor` MODIFY `material` ENUM('Couro', 'Tecidos', 'Madeira', 'Bronze', 'Ferro', 'Aco', 'Prata', 'Ouro', 'Adamante', 'Draconico') NOT NULL;

-- AlterTable
ALTER TABLE `character_weapon` MODIFY `material` ENUM('Couro', 'Tecidos', 'Madeira', 'Bronze', 'Ferro', 'Aco', 'Prata', 'Ouro', 'Adamante', 'Draconico') NOT NULL;

-- AlterTable
ALTER TABLE `weapon` DROP COLUMN `trainingId`;

-- DropTable
DROP TABLE `character_training`;

-- DropTable
DROP TABLE `path_training`;

-- DropTable
DROP TABLE `training`;

-- CreateTable
CREATE TABLE `effect` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `targetId` INTEGER NOT NULL,
    `targetModel` ENUM('character', 'weapon', 'armor') NOT NULL,
    `targetField` VARCHAR(191) NOT NULL,
    `effectValue` DOUBLE NOT NULL,
    `operator` ENUM('Sum', 'Sub', 'Mult', 'Div') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
