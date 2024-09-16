/*
  Warnings:

  - A unique constraint covering the columns `[prerequisiteId]` on the table `path` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `path` ADD COLUMN `addMagics` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `addManeuvers` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `addOaths` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `addTechniques` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `addTricks` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `prerequisiteId` INTEGER NULL,
    ADD COLUMN `reqMagics` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `reqManeuvers` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `reqOaths` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `reqTechniques` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `reqTricks` INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX `path_prerequisiteId_key` ON `path`(`prerequisiteId`);

-- AddForeignKey
ALTER TABLE `path` ADD CONSTRAINT `path_prerequisiteId_fkey` FOREIGN KEY (`prerequisiteId`) REFERENCES `path`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
