-- DropForeignKey
ALTER TABLE `character` DROP FOREIGN KEY `character_ibfk_1`;

-- DropForeignKey
ALTER TABLE `charstats` DROP FOREIGN KEY `c_ibfk_1`;

-- AddForeignKey
ALTER TABLE `character` ADD CONSTRAINT `character_ibfk_1` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `charStats` ADD CONSTRAINT `c_ibfk_1` FOREIGN KEY (`characterId`) REFERENCES `character`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
