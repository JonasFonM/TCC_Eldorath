-- CreateTable
CREATE TABLE `character` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `name` TEXT NOT NULL,
    `level` INTEGER NOT NULL,
    `tier` INTEGER NOT NULL,
    `agility` INTEGER NOT NULL,
    `body` INTEGER NOT NULL,
    `mind` INTEGER NOT NULL,
    `public` BOOLEAN NOT NULL DEFAULT false,
    `authorId` INTEGER NOT NULL,

    INDEX `authorId`(`authorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `charStats` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `vitality` INTEGER NOT NULL,
    `vigor` INTEGER NOT NULL,
    `power` INTEGER NOT NULL,
    `speed` INTEGER NOT NULL,
    `defense` INTEGER NOT NULL,
    `initiative` INTEGER NOT NULL,
    `size` INTEGER NOT NULL,
    `baseWeight` INTEGER NOT NULL,
    `carryCap` INTEGER NOT NULL,
    `liftCap` INTEGER NOT NULL,
    `characterId` INTEGER NOT NULL,

    UNIQUE INDEX `characterId`(`characterId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lineage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` TEXT NULL,
    `pure` BOOLEAN NOT NULL DEFAULT false,
    `description` TEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `character_lineage` (
    `characterId` INTEGER NOT NULL,
    `lineageId` INTEGER NOT NULL,

    UNIQUE INDEX `characterId`(`characterId`),
    UNIQUE INDEX `lineageId`(`lineageId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `skill` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` TEXT NULL,
    `description` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `character_skill` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `characterId` INTEGER NOT NULL,
    `skillId` INTEGER NOT NULL,

    UNIQUE INDEX `character_skill_characterId_skillId_key`(`characterId`, `skillId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `lineage_skill` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lineageId` INTEGER NOT NULL,
    `skillId` INTEGER NOT NULL,

    UNIQUE INDEX `lineageId`(`lineageId`),
    UNIQUE INDEX `skillId`(`skillId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `user_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `character` ADD CONSTRAINT `character_ibfk_1` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `charStats` ADD CONSTRAINT `c_ibfk_1` FOREIGN KEY (`characterId`) REFERENCES `character`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `character_lineage` ADD CONSTRAINT `cl_ibfk_1` FOREIGN KEY (`characterId`) REFERENCES `character`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `character_lineage` ADD CONSTRAINT `cl_ibfk_2` FOREIGN KEY (`lineageId`) REFERENCES `lineage`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `character_skill` ADD CONSTRAINT `character_skill_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `character`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `character_skill` ADD CONSTRAINT `character_skill_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `skill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lineage_skill` ADD CONSTRAINT `ls_ibfk_1` FOREIGN KEY (`lineageId`) REFERENCES `lineage`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `lineage_skill` ADD CONSTRAINT `ls_ibfk_2` FOREIGN KEY (`skillId`) REFERENCES `skill`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
