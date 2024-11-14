-- CreateTable
CREATE TABLE `campaign` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `createdAt` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `title` TEXT NOT NULL,
    `daysPassed` INTEGER NOT NULL,
    `month` ENUM('Vivenerius', 'Iudelo', 'Auramo', 'Taxidinas', 'Ipnas', 'Malkan', 'Fengarinas', 'Belliurus', 'Hermicus', 'Artemino', 'Irinias', 'Krona') NOT NULL DEFAULT 'Vivenerius',
    `weekDay` ENUM('Helidai', 'Agredai', 'Oridai', 'Victadai') NOT NULL,
    `tod` ENUM('Dawn', 'Day', 'Night', 'Dusk') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
