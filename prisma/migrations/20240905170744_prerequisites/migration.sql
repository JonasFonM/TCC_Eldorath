/*
  Warnings:

  - You are about to drop the `prerequisite` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[successorId]` on the table `skill` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `prerequisite` DROP FOREIGN KEY `prerequisite_skillId_fkey`;

-- AlterTable
ALTER TABLE `skill` ADD COLUMN `agi` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `bdy` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `lvl` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `mnd` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `siz` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `successorId` INTEGER NULL;

-- DropTable
DROP TABLE `prerequisite`;

-- CreateIndex
CREATE UNIQUE INDEX `skill_successorId_key` ON `skill`(`successorId`);

-- AddForeignKey
ALTER TABLE `skill` ADD CONSTRAINT `skill_successorId_fkey` FOREIGN KEY (`successorId`) REFERENCES `skill`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
