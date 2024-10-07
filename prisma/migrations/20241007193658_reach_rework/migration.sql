/*
  Warnings:

  - You are about to drop the column `baseReach` on the `character_weapon` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `character_weapon` DROP COLUMN `baseReach`,
    ADD COLUMN `reach` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `weapon` ADD COLUMN `baseReach` INTEGER NOT NULL DEFAULT 1;
