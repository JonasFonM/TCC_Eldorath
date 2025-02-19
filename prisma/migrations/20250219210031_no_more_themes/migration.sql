/*
  Warnings:

  - You are about to drop the column `snippet` on the `campaign` table. All the data in the column will be lost.
  - You are about to drop the column `theme` on the `campaign` table. All the data in the column will be lost.
  - Added the required column `description` to the `campaign` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `campaign` DROP COLUMN `snippet`,
    DROP COLUMN `theme`,
    ADD COLUMN `description` TEXT NOT NULL;
