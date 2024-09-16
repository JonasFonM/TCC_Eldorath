-- CreateTable
CREATE TABLE `charResistances` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `characterId` INTEGER NOT NULL,
    `impactRes` INTEGER NOT NULL DEFAULT 0,
    `pierceRes` INTEGER NOT NULL DEFAULT 0,
    `slashRes` INTEGER NOT NULL DEFAULT 0,
    `acidRes` INTEGER NOT NULL DEFAULT 0,
    `coldRes` INTEGER NOT NULL DEFAULT 0,
    `fireRes` INTEGER NOT NULL DEFAULT 0,
    `arcaneRes` INTEGER NOT NULL DEFAULT 0,
    `cosmicRes` INTEGER NOT NULL DEFAULT 0,
    `psychicRes` INTEGER NOT NULL DEFAULT 0,
    `occultRes` INTEGER NOT NULL DEFAULT 0,
    `profaneRes` INTEGER NOT NULL DEFAULT 0,
    `sacredRes` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `characterId`(`characterId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `weapon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `trainingId` INTEGER NOT NULL,
    `craftTier` INTEGER NOT NULL DEFAULT 1,
    `material` ENUM('Adamantine', 'Bronze', 'DragonBone', 'Iron', 'Silver', 'Steel', 'Wood', 'Leather', 'Padding', 'DragonScale') NOT NULL,
    `type` ENUM('Bow', 'Discreet', 'Thrown', 'Firearm', 'Polearm', 'Natural', 'Harpoon', 'Crossbow', 'Whip', 'Club', 'Chain', 'Unarmed', 'FieldSword', 'DuelingSword', 'Scythe', 'Lance', 'Axe', 'Hammer') NOT NULL,
    `weight` INTEGER NOT NULL DEFAULT 0,
    `cost` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `weapon_trainingId_key`(`trainingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attack` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `weaponId` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `hitOn` INTEGER NOT NULL DEFAULT 4,
    `critOn` INTEGER NOT NULL DEFAULT 6,
    `reach` INTEGER NOT NULL DEFAULT 1,
    `vigorCost` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `atkDamage` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `attackId` INTEGER NOT NULL,
    `physicalType` ENUM('Impact', 'Pierce', 'Slash') NOT NULL,
    `magicalType` ENUM('Elemental', 'Hermetic', 'Occult', 'Profane', 'Sacred') NULL,
    `elementSubtype` ENUM('Acid', 'Cold', 'Fire', 'Lightning') NULL,
    `hermeticSubtype` ENUM('Arcane', 'Cosmic', 'Psychic') NULL,
    `baseDmg` INTEGER NOT NULL DEFAULT 1,
    `critDmg` INTEGER NOT NULL DEFAULT 1,
    `agiScale` DOUBLE NOT NULL DEFAULT 0.5,
    `strScale` DOUBLE NOT NULL DEFAULT 0.5,

    UNIQUE INDEX `atkDamage_attackId_key`(`attackId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `character_weapon` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `characterId` INTEGER NOT NULL,
    `weaponId` INTEGER NOT NULL,
    `wielding` BOOLEAN NOT NULL DEFAULT false,
    `twoHanding` BOOLEAN NOT NULL DEFAULT false,
    `trained` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `armor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `trainingId` INTEGER NOT NULL,
    `craftTier` INTEGER NOT NULL DEFAULT 1,
    `material` ENUM('Adamantine', 'Bronze', 'DragonBone', 'Iron', 'Silver', 'Steel', 'Wood', 'Leather', 'Padding', 'DragonScale') NOT NULL,
    `defense` INTEGER NOT NULL DEFAULT 1,
    `weight` INTEGER NOT NULL DEFAULT 4,
    `cost` INTEGER NOT NULL DEFAULT 200,

    UNIQUE INDEX `armor_trainingId_key`(`trainingId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `character_armor` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `characterId` INTEGER NOT NULL,
    `armorId` INTEGER NOT NULL,
    `equipped` BOOLEAN NOT NULL DEFAULT false,
    `trained` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `armorResistances` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `armorId` INTEGER NOT NULL,
    `impactRes` INTEGER NOT NULL DEFAULT 0,
    `pierceRes` INTEGER NOT NULL DEFAULT 0,
    `slashRes` INTEGER NOT NULL DEFAULT 0,
    `acidRes` INTEGER NOT NULL DEFAULT 0,
    `coldRes` INTEGER NOT NULL DEFAULT 0,
    `fireRes` INTEGER NOT NULL DEFAULT 0,
    `arcaneRes` INTEGER NOT NULL DEFAULT 0,
    `cosmicRes` INTEGER NOT NULL DEFAULT 0,
    `psychicRes` INTEGER NOT NULL DEFAULT 0,
    `occultRes` INTEGER NOT NULL DEFAULT 0,
    `profaneRes` INTEGER NOT NULL DEFAULT 0,
    `sacredRes` INTEGER NOT NULL DEFAULT 0,

    UNIQUE INDEX `armorId`(`armorId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `charResistances` ADD CONSTRAINT `charResistances_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `character`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `weapon` ADD CONSTRAINT `wt_ibfk_2` FOREIGN KEY (`trainingId`) REFERENCES `training`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `attack` ADD CONSTRAINT `a_ibfk_1` FOREIGN KEY (`weaponId`) REFERENCES `weapon`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `atkDamage` ADD CONSTRAINT `dmg_ibfk_1` FOREIGN KEY (`attackId`) REFERENCES `attack`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `character_weapon` ADD CONSTRAINT `character_weapon_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `character`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `character_weapon` ADD CONSTRAINT `character_weapon_weaponId_fkey` FOREIGN KEY (`weaponId`) REFERENCES `weapon`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `armor` ADD CONSTRAINT `at_ibfk_2` FOREIGN KEY (`trainingId`) REFERENCES `training`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `character_armor` ADD CONSTRAINT `character_armor_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `character`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `character_armor` ADD CONSTRAINT `character_armor_armorId_fkey` FOREIGN KEY (`armorId`) REFERENCES `armor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `armorResistances` ADD CONSTRAINT `armorResistances_armorId_fkey` FOREIGN KEY (`armorId`) REFERENCES `armor`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
