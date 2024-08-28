/*
  Warnings:

  - You are about to drop the column `trainingTier` on the `character_training` table. All the data in the column will be lost.
  - You are about to drop the column `trainingTier` on the `path_training` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `character_training` DROP COLUMN `trainingTier`;

-- AlterTable
ALTER TABLE `path_training` DROP COLUMN `trainingTier`;
