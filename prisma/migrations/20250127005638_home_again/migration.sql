/*
  Warnings:

  - You are about to drop the column `trainingId` on the `armor` table. All the data in the column will be lost.
  - You are about to drop the column `pendingTrainings` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `trained` on the `character_armor` table. All the data in the column will be lost.
  - You are about to drop the column `trained` on the `character_weapon` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `armor` DROP COLUMN `trainingId`;

-- AlterTable
ALTER TABLE `character` DROP COLUMN `pendingTrainings`;

-- AlterTable
ALTER TABLE `character_armor` DROP COLUMN `trained`;

-- AlterTable
ALTER TABLE `character_weapon` DROP COLUMN `trained`;
