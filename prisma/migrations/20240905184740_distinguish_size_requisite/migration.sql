/*
  Warnings:

  - You are about to drop the column `siz` on the `skill` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `skill` DROP COLUMN `siz`,
    ADD COLUMN `rlSiz` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `trSiz` INTEGER NOT NULL DEFAULT 0;
