/*
  Warnings:

  - You are about to drop the column `prerequisiteId` on the `training` table. All the data in the column will be lost.
  - You are about to drop the column `weightClass` on the `training` table. All the data in the column will be lost.
  - You are about to drop the `armor_training` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `weapon_training` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `trainingId` to the `weapon` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `armor_training` DROP FOREIGN KEY `armor_training_armorId_fkey`;

-- DropForeignKey
ALTER TABLE `armor_training` DROP FOREIGN KEY `armor_training_trainingId_fkey`;

-- DropForeignKey
ALTER TABLE `training` DROP FOREIGN KEY `training_prerequisiteId_fkey`;

-- DropForeignKey
ALTER TABLE `weapon_training` DROP FOREIGN KEY `weapon_training_trainingId_fkey`;

-- DropForeignKey
ALTER TABLE `weapon_training` DROP FOREIGN KEY `weapon_training_weaponId_fkey`;

-- DropIndex
DROP INDEX `armor_trainingId_key` ON `armor`;

-- AlterTable
ALTER TABLE `training` DROP COLUMN `prerequisiteId`,
    DROP COLUMN `weightClass`,
    ADD COLUMN `tier` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `weapon` ADD COLUMN `trainingId` INTEGER NOT NULL;

-- DropTable
DROP TABLE `armor_training`;

-- DropTable
DROP TABLE `weapon_training`;

-- AddForeignKey
ALTER TABLE `weapon` ADD CONSTRAINT `weapon_trainingId_fkey` FOREIGN KEY (`trainingId`) REFERENCES `training`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `armor` ADD CONSTRAINT `armor_trainingId_fkey` FOREIGN KEY (`trainingId`) REFERENCES `training`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
