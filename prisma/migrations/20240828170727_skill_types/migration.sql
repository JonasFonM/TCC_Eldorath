-- AlterTable
ALTER TABLE `character_skill` ADD COLUMN `level` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `skill` ADD COLUMN `techniqueSubtype` ENUM('MANEUVER', 'OATH', 'TRICK') NULL,
    ADD COLUMN `type` ENUM('CHARACTERISTIC', 'MAGIC', 'TECHNIQUE') NOT NULL DEFAULT 'CHARACTERISTIC';

-- CreateTable
CREATE TABLE `prerequisite` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(191) NOT NULL,
    `value` VARCHAR(191) NOT NULL,
    `skillId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `prerequisite` ADD CONSTRAINT `prerequisite_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `skill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
