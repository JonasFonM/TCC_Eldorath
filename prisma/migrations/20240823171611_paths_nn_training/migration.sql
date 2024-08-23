-- CreateTable
CREATE TABLE `path` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `description` TEXT NOT NULL,
    `pathTier` INTEGER NOT NULL,
    `vitality` INTEGER NOT NULL,
    `power` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `character_path` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `characterId` INTEGER NOT NULL,
    `pathId` INTEGER NOT NULL,

    UNIQUE INDEX `character_path_characterId_pathId_key`(`characterId`, `pathId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `path_skill` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pathId` INTEGER NOT NULL,
    `skillId` INTEGER NOT NULL,

    UNIQUE INDEX `path_skill_pathId_skillId_key`(`pathId`, `skillId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `training` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` TEXT NOT NULL,
    `description` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `character_training` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `characterId` INTEGER NOT NULL,
    `trainingId` INTEGER NOT NULL,
    `trainingTier` INTEGER NOT NULL,

    UNIQUE INDEX `character_training_characterId_trainingId_key`(`characterId`, `trainingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `character_path` ADD CONSTRAINT `pc_ibfk_1` FOREIGN KEY (`characterId`) REFERENCES `character`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `character_path` ADD CONSTRAINT `pc_ibfk_2` FOREIGN KEY (`pathId`) REFERENCES `path`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `path_skill` ADD CONSTRAINT `path_skill_pathId_fkey` FOREIGN KEY (`pathId`) REFERENCES `path`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `path_skill` ADD CONSTRAINT `path_skill_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `skill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `character_training` ADD CONSTRAINT `ct_ibfk_1` FOREIGN KEY (`characterId`) REFERENCES `character`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `character_training` ADD CONSTRAINT `ct_ibfk_2` FOREIGN KEY (`trainingId`) REFERENCES `training`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
