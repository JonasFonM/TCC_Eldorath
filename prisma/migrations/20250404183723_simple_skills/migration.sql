/*
  Warnings:

  - You are about to drop the column `pendingMagics` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `pendingManeuvers` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `pendingOaths` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `pendingTechniques` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `pendingTricks` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `addOaths` on the `path` table. All the data in the column will be lost.
  - You are about to drop the column `addTechniques` on the `path` table. All the data in the column will be lost.
  - You are about to drop the column `addTricks` on the `path` table. All the data in the column will be lost.
  - You are about to drop the column `reqOaths` on the `path` table. All the data in the column will be lost.
  - You are about to drop the column `reqTechniques` on the `path` table. All the data in the column will be lost.
  - You are about to drop the column `reqTricks` on the `path` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `character` DROP COLUMN `pendingMagics`,
    DROP COLUMN `pendingManeuvers`,
    DROP COLUMN `pendingOaths`,
    DROP COLUMN `pendingTechniques`,
    DROP COLUMN `pendingTricks`,
    ADD COLUMN `pendingMagic` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `pendingManeuver` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `path` DROP COLUMN `addOaths`,
    DROP COLUMN `addTechniques`,
    DROP COLUMN `addTricks`,
    DROP COLUMN `reqOaths`,
    DROP COLUMN `reqTechniques`,
    DROP COLUMN `reqTricks`;
