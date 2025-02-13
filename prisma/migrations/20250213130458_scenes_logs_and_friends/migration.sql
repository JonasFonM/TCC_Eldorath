/*
  Warnings:

  - You are about to drop the column `daysPassed` on the `campaign` table. All the data in the column will be lost.
  - You are about to alter the column `month` on the `campaign` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(3))` to `Enum(EnumId(1))`.
  - You are about to alter the column `weekDay` on the `campaign` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(7))` to `Enum(EnumId(0))`.
  - You are about to drop the column `effectValue` on the `effect` table. All the data in the column will be lost.
  - You are about to drop the column `targetField` on the `effect` table. All the data in the column will be lost.
  - You are about to drop the column `targetId` on the `effect` table. All the data in the column will be lost.
  - Added the required column `masterId` to the `campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `monthDay` to the `campaign` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `effect` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `effect` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `campaign` DROP COLUMN `daysPassed`,
    ADD COLUMN `era` VARCHAR(191) NOT NULL DEFAULT '7AE',
    ADD COLUMN `masterId` INTEGER NOT NULL,
    ADD COLUMN `monthDay` INTEGER NOT NULL,
    ADD COLUMN `public` BOOLEAN NOT NULL DEFAULT false,
    MODIFY `month` ENUM('Aeterna', 'Luxar', 'Vita', 'Lual', 'Agnus', 'Malkar', 'Magika', 'Kronica', 'Exora', 'Natura', 'Fortuna', 'Harmonia') NOT NULL DEFAULT 'Aeterna',
    MODIFY `weekDay` ENUM('Descanso', 'Preparo', 'Jornada', 'Batalha', 'Luto', 'Partilha') NOT NULL DEFAULT 'Preparo';

-- AlterTable
ALTER TABLE `character` ADD COLUMN `barrier` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `boss` BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN `campaignId` INTEGER NULL,
    ADD COLUMN `currentPower` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `currentVigor` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `currentVitality` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `npc` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `effect` DROP COLUMN `effectValue`,
    DROP COLUMN `targetField`,
    DROP COLUMN `targetId`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `scene` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `campaignId` INTEGER NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `title` TEXT NOT NULL,
    `roundCount` INTEGER NOT NULL,
    `playerTurn` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `characterScene` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `characterId` INTEGER NOT NULL,
    `sceneId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `log` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `sceneId` INTEGER NOT NULL,
    `round` INTEGER NOT NULL,
    `turnType` VARCHAR(191) NOT NULL DEFAULT 'player',
    `actorId` INTEGER NOT NULL,
    `targetIds` VARCHAR(191) NOT NULL,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `logAction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `logId` INTEGER NOT NULL,
    `actionId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `logEffect` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `logId` INTEGER NOT NULL,
    `effectId` INTEGER NOT NULL,
    `targetId` INTEGER NOT NULL,
    `targetType` ENUM('character', 'weapon', 'armor') NOT NULL,
    `previousValue` DOUBLE NOT NULL,
    `effectValue` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `effectApplication` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `effectId` INTEGER NOT NULL,
    `targetField` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `characterEffect` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `characterId` INTEGER NOT NULL,
    `effectId` INTEGER NOT NULL,
    `duration` INTEGER NULL,
    `isPermanent` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `damageLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `logId` INTEGER NOT NULL,
    `actorId` INTEGER NOT NULL,
    `targetId` INTEGER NOT NULL,
    `type` ENUM('Impact', 'Pierce', 'Slash', 'Acid', 'Cold', 'Fire', 'Lightning', 'Arcane', 'Cosmic', 'Psychic', 'Profane', 'Sacred') NOT NULL,
    `amount` INTEGER NOT NULL,
    `critical` BOOLEAN NOT NULL,
    `mitigated` BOOLEAN NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `action` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `actionType` ENUM('UnarmedATK', 'PhysicalMeleeATK', 'PhysicalRangedATK', 'MagicMeleeATK', 'MagicRangedATK', 'Movement', 'Interaction') NOT NULL,
    `vigorCost` INTEGER NOT NULL DEFAULT 0,
    `powerCost` INTEGER NOT NULL DEFAULT 0,
    `attack` BOOLEAN NOT NULL DEFAULT false,
    `requiresTest` BOOLEAN NOT NULL DEFAULT false,
    `useItem` BOOLEAN NOT NULL DEFAULT false,
    `reaction` BOOLEAN NOT NULL DEFAULT false,
    `baseRange` INTEGER NOT NULL DEFAULT 1,
    `baseAoERange` INTEGER NOT NULL DEFAULT 0,
    `skillId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `actionDie` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `actionId` INTEGER NOT NULL,
    `dieType` INTEGER NOT NULL DEFAULT 2,
    `count` INTEGER NOT NULL DEFAULT 1,
    `actionUpgradeId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `actionUpgrade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `actionId` INTEGER NOT NULL,
    `vigorCost` INTEGER NULL,
    `powerCost` INTEGER NULL,
    `newBaseRange` INTEGER NULL,
    `newBaseAoERange` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Friendship` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `user1Id` INTEGER NOT NULL,
    `user2Id` INTEGER NOT NULL,
    `status` ENUM('PENDING', 'ACCEPTED', 'BLOCKED') NOT NULL DEFAULT 'PENDING',

    UNIQUE INDEX `Friendship_user1Id_user2Id_key`(`user1Id`, `user2Id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `campaign` ADD CONSTRAINT `campaign_gmfk_1` FOREIGN KEY (`masterId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `scene` ADD CONSTRAINT `campaign_scfk_1` FOREIGN KEY (`campaignId`) REFERENCES `campaign`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `characterScene` ADD CONSTRAINT `characterScene_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `character`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `characterScene` ADD CONSTRAINT `characterScene_sceneId_fkey` FOREIGN KEY (`sceneId`) REFERENCES `scene`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `log` ADD CONSTRAINT `scene_scfk_1` FOREIGN KEY (`sceneId`) REFERENCES `scene`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `log` ADD CONSTRAINT `log_actorId_fkey` FOREIGN KEY (`actorId`) REFERENCES `character`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `logAction` ADD CONSTRAINT `logAction_logId_fkey` FOREIGN KEY (`logId`) REFERENCES `log`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `logAction` ADD CONSTRAINT `logAction_actionId_fkey` FOREIGN KEY (`actionId`) REFERENCES `action`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `logEffect` ADD CONSTRAINT `logEffect_logId_fkey` FOREIGN KEY (`logId`) REFERENCES `log`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `logEffect` ADD CONSTRAINT `logEffect_effectId_fkey` FOREIGN KEY (`effectId`) REFERENCES `effect`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `effectApplication` ADD CONSTRAINT `effectApplication_effectId_fkey` FOREIGN KEY (`effectId`) REFERENCES `effect`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `characterEffect` ADD CONSTRAINT `characterEffect_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `character`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `characterEffect` ADD CONSTRAINT `characterEffect_effectId_fkey` FOREIGN KEY (`effectId`) REFERENCES `effect`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `damageLog` ADD CONSTRAINT `damageLog_logId_fkey` FOREIGN KEY (`logId`) REFERENCES `log`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `damageLog` ADD CONSTRAINT `damageLog_actorId_fkey` FOREIGN KEY (`actorId`) REFERENCES `character`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `damageLog` ADD CONSTRAINT `damageLog_targetId_fkey` FOREIGN KEY (`targetId`) REFERENCES `character`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `action` ADD CONSTRAINT `action_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `skill`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `actionDie` ADD CONSTRAINT `actionDie_actionId_fkey` FOREIGN KEY (`actionId`) REFERENCES `action`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `actionDie` ADD CONSTRAINT `actionDie_actionUpgradeId_fkey` FOREIGN KEY (`actionUpgradeId`) REFERENCES `actionUpgrade`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `actionUpgrade` ADD CONSTRAINT `actionUpgrade_actionId_fkey` FOREIGN KEY (`actionId`) REFERENCES `action`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `character` ADD CONSTRAINT `character_campaignId_fkey` FOREIGN KEY (`campaignId`) REFERENCES `campaign`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Friendship` ADD CONSTRAINT `Friendship_user1Id_fkey` FOREIGN KEY (`user1Id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Friendship` ADD CONSTRAINT `Friendship_user2Id_fkey` FOREIGN KEY (`user2Id`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
