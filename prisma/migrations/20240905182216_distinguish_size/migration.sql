/*
  Warnings:

  - You are about to drop the column `size` on the `charstats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `charstats` DROP COLUMN `size`,
    ADD COLUMN `relativeSize` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `trueSize` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `skill` ADD COLUMN `increaseRelativeSize` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `increaseTrueSize` INTEGER NOT NULL DEFAULT 0;
