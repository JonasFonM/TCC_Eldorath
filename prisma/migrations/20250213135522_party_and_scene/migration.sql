/*
  Warnings:

  - Added the required column `snippet` to the `campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `theme` to the `campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthDay` to the `scene` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timeOfDay` to the `scene` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `campaign` DROP FOREIGN KEY `campaign_gmfk_1`;

-- DropForeignKey
ALTER TABLE `character` DROP FOREIGN KEY `character_ibfk_1`;

-- DropForeignKey
ALTER TABLE `friendship` DROP FOREIGN KEY `Friendship_user1Id_fkey`;

-- DropForeignKey
ALTER TABLE `friendship` DROP FOREIGN KEY `Friendship_user2Id_fkey`;

-- DropForeignKey
ALTER TABLE `scene` DROP FOREIGN KEY `campaign_scfk_1`;

-- AlterTable
ALTER TABLE `campaign` ADD COLUMN `snippet` TEXT NOT NULL,
    ADD COLUMN `theme` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `scene` ADD COLUMN `era` VARCHAR(191) NOT NULL DEFAULT '7AE',
    ADD COLUMN `month` ENUM('Aeterna', 'Luxar', 'Vita', 'Lual', 'Agnus', 'Malkar', 'Magika', 'Kronica', 'Exora', 'Natura', 'Fortuna', 'Harmonia') NOT NULL DEFAULT 'Aeterna',
    ADD COLUMN `monthDay` INTEGER NOT NULL,
    ADD COLUMN `timeOfDay` ENUM('Dawn', 'Day', 'Night', 'Dusk') NOT NULL,
    ADD COLUMN `weekDay` ENUM('Descanso', 'Preparo', 'Jornada', 'Batalha', 'Luto', 'Partilha') NOT NULL DEFAULT 'Preparo';

-- CreateTable
CREATE TABLE `partyMembers` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `userId` INTEGER NOT NULL,
    `campaignId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `campaign` ADD CONSTRAINT `campaign_masterId_fkey` FOREIGN KEY (`masterId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `scene` ADD CONSTRAINT `scene_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `character` ADD CONSTRAINT `character_authorId_fkey` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `friendship` ADD CONSTRAINT `friendship_user1Id_fkey` FOREIGN KEY (`user1Id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `friendship` ADD CONSTRAINT `friendship_user2Id_fkey` FOREIGN KEY (`user2Id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `partyMembers` ADD CONSTRAINT `partyMembers_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `partyMembers` ADD CONSTRAINT `partyMembers_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- RenameIndex
ALTER TABLE `friendship` RENAME INDEX `Friendship_user1Id_user2Id_key` TO `friendship_user1Id_user2Id_key`;
