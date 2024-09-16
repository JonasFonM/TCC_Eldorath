/*
  Warnings:

  - You are about to drop the column `trainingId` on the `weapon` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `armor` DROP FOREIGN KEY `at_ibfk_2`;

-- DropForeignKey
ALTER TABLE `weapon` DROP FOREIGN KEY `weapon_trainingId_fkey`;

-- AlterTable
ALTER TABLE `weapon` DROP COLUMN `trainingId`;

-- CreateTable
CREATE TABLE `weapon_training` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `weaponId` INTEGER NOT NULL,
    `trainingId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `armor_training` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `armorId` INTEGER NOT NULL,
    `trainingId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `weapon_training` ADD CONSTRAINT `weapon_training_weaponId_fkey` FOREIGN KEY (`weaponId`) REFERENCES `weapon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `weapon_training` ADD CONSTRAINT `weapon_training_trainingId_fkey` FOREIGN KEY (`trainingId`) REFERENCES `training`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `armor_training` ADD CONSTRAINT `armor_training_armorId_fkey` FOREIGN KEY (`armorId`) REFERENCES `armor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `armor_training` ADD CONSTRAINT `armor_training_trainingId_fkey` FOREIGN KEY (`trainingId`) REFERENCES `training`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
