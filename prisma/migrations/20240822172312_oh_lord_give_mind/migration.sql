/*
  Warnings:

  - Added the required column `pureSkill` to the `lineage_skill` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `lineage_skill` ADD COLUMN `pureSkill` BOOLEAN NOT NULL;
