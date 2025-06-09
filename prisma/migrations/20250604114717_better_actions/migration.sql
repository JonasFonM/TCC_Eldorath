/*
  Warnings:

  - You are about to drop the column `attribute` on the `action` table. All the data in the column will be lost.
  - You are about to drop the column `useItem` on the `action` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `action` DROP COLUMN `attribute`,
    DROP COLUMN `useItem`,
    ADD COLUMN `baseAttribute` ENUM('agility', 'body', 'mind') NOT NULL DEFAULT 'body',
    ADD COLUMN `baseRange` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `targetedAttribute` VARCHAR(191) NOT NULL DEFAULT 'currentVitality',
    ADD COLUMN `useConsumable` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `useEquipedAccessory` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `useEquipedWeapon` BOOLEAN NOT NULL DEFAULT false;
