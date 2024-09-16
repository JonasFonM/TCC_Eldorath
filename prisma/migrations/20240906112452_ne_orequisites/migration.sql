/*
  Warnings:

  - You are about to drop the column `successorId` on the `skill` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[prerequisiteId]` on the table `skill` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[prerequisiteId]` on the table `training` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `skill` DROP FOREIGN KEY `skill_successorId_fkey`;

-- AlterTable
ALTER TABLE `skill` DROP COLUMN `successorId`,
    ADD COLUMN `prerequisiteId` INTEGER NULL;

-- AlterTable
ALTER TABLE `training` ADD COLUMN `prerequisiteId` INTEGER NULL,
    ADD COLUMN `type` ENUM('ARMOR', 'SHIELD', 'WEAPONS') NOT NULL DEFAULT 'ARMOR',
    ADD COLUMN `weightClass` INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX `skill_prerequisiteId_key` ON `skill`(`prerequisiteId`);

-- CreateIndex
CREATE UNIQUE INDEX `training_prerequisiteId_key` ON `training`(`prerequisiteId`);

-- AddForeignKey
ALTER TABLE `skill` ADD CONSTRAINT `skill_prerequisiteId_fkey` FOREIGN KEY (`prerequisiteId`) REFERENCES `skill`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `training` ADD CONSTRAINT `training_prerequisiteId_fkey` FOREIGN KEY (`prerequisiteId`) REFERENCES `training`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
