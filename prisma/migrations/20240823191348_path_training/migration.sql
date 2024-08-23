-- CreateTable
CREATE TABLE `path_training` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `pathId` INTEGER NOT NULL,
    `trainingId` INTEGER NOT NULL,
    `trainingTier` INTEGER NOT NULL,

    UNIQUE INDEX `path_training_pathId_trainingId_key`(`pathId`, `trainingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `path_training` ADD CONSTRAINT `pt_ibfk_1` FOREIGN KEY (`pathId`) REFERENCES `path`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `path_training` ADD CONSTRAINT `pt_ibfk_2` FOREIGN KEY (`trainingId`) REFERENCES `training`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
