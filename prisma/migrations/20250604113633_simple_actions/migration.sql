/*
  Warnings:

  - You are about to drop the column `actionType` on the `action` table. All the data in the column will be lost.
  - You are about to drop the column `baseAoERange` on the `action` table. All the data in the column will be lost.
  - You are about to drop the column `baseMovement` on the `action` table. All the data in the column will be lost.
  - You are about to drop the column `baseRange` on the `action` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `action` table. All the data in the column will be lost.
  - You are about to drop the column `direction` on the `action` table. All the data in the column will be lost.
  - You are about to drop the column `rangeType` on the `action` table. All the data in the column will be lost.
  - You are about to drop the column `reaction` on the `action` table. All the data in the column will be lost.
  - You are about to drop the column `requiresTest` on the `action` table. All the data in the column will be lost.
  - You are about to drop the column `newAoERange` on the `actionupgrade` table. All the data in the column will be lost.
  - You are about to drop the column `newDirection` on the `actionupgrade` table. All the data in the column will be lost.
  - You are about to drop the column `newMovement` on the `actionupgrade` table. All the data in the column will be lost.
  - You are about to drop the column `newRange` on the `actionupgrade` table. All the data in the column will be lost.
  - You are about to drop the `actiondie` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `actiondie` DROP FOREIGN KEY `actionDie_actionId_fkey`;

-- DropForeignKey
ALTER TABLE `actiondie` DROP FOREIGN KEY `actionDie_actionUpgradeId_fkey`;

-- AlterTable
ALTER TABLE `action` DROP COLUMN `actionType`,
    DROP COLUMN `baseAoERange`,
    DROP COLUMN `baseMovement`,
    DROP COLUMN `baseRange`,
    DROP COLUMN `description`,
    DROP COLUMN `direction`,
    DROP COLUMN `rangeType`,
    DROP COLUMN `reaction`,
    DROP COLUMN `requiresTest`,
    ADD COLUMN `attribute` ENUM('agility', 'body', 'mind') NOT NULL DEFAULT 'body',
    ADD COLUMN `baseTargetAmount` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `minDieAmount` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `minDieType` INTEGER NOT NULL DEFAULT 4,
    ADD COLUMN `targetType` ENUM('Aliado', 'Inimigo') NOT NULL DEFAULT 'Inimigo',
    MODIFY `vigorCost` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `actionupgrade` DROP COLUMN `newAoERange`,
    DROP COLUMN `newDirection`,
    DROP COLUMN `newMovement`,
    DROP COLUMN `newRange`,
    ADD COLUMN `newTargetAmount` INTEGER NULL;

-- DropTable
DROP TABLE `actiondie`;
