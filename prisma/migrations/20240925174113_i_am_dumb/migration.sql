/*
  Warnings:

  - You are about to drop the `charresistances` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `charresistances` DROP FOREIGN KEY `charResistances_characterId_fkey`;

-- DropTable
DROP TABLE `charresistances`;
