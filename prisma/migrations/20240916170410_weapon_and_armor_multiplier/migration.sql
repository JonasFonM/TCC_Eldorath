-- DropForeignKey
ALTER TABLE `weapon` DROP FOREIGN KEY `wt_ibfk_2`;

-- AddForeignKey
ALTER TABLE `weapon` ADD CONSTRAINT `weapon_trainingId_fkey` FOREIGN KEY (`trainingId`) REFERENCES `training`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
