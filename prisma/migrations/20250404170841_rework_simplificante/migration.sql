/*
  Warnings:

  - You are about to drop the column `attack` on the `action` table. All the data in the column will be lost.
  - You are about to drop the column `newBaseAoERange` on the `actionupgrade` table. All the data in the column will be lost.
  - You are about to drop the column `newBaseRange` on the `actionupgrade` table. All the data in the column will be lost.
  - You are about to drop the column `acidRes` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `arcaneRes` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `barrier` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `coldRes` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `cosmicRes` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `fireRes` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `fullRes` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `impactRes` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `initiative` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `lightningRes` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `pierceRes` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `profaneRes` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `psychicRes` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `relativeSize` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `sacredRes` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `slashRes` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `slotAmulet` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `slotBelt` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `slotCloak` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `slotCuirass` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `slotEarings` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `slotGauntlet` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `slotGreaves` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `slotHelm` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `slotPauldron` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `slotRings` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `slotUpperLegs` on the `character` table. All the data in the column will be lost.
  - You are about to drop the column `acid` on the `character_item` table. All the data in the column will be lost.
  - You are about to drop the column `arcane` on the `character_item` table. All the data in the column will be lost.
  - You are about to drop the column `cold` on the `character_item` table. All the data in the column will be lost.
  - You are about to drop the column `cosmic` on the `character_item` table. All the data in the column will be lost.
  - You are about to drop the column `critChanceMod` on the `character_item` table. All the data in the column will be lost.
  - You are about to drop the column `defense` on the `character_item` table. All the data in the column will be lost.
  - You are about to drop the column `fire` on the `character_item` table. All the data in the column will be lost.
  - You are about to drop the column `full` on the `character_item` table. All the data in the column will be lost.
  - You are about to drop the column `hitMod` on the `character_item` table. All the data in the column will be lost.
  - You are about to drop the column `impact` on the `character_item` table. All the data in the column will be lost.
  - You are about to drop the column `lightning` on the `character_item` table. All the data in the column will be lost.
  - You are about to drop the column `pierce` on the `character_item` table. All the data in the column will be lost.
  - You are about to drop the column `profane` on the `character_item` table. All the data in the column will be lost.
  - You are about to drop the column `psychic` on the `character_item` table. All the data in the column will be lost.
  - You are about to drop the column `reach` on the `character_item` table. All the data in the column will be lost.
  - You are about to drop the column `sacred` on the `character_item` table. All the data in the column will be lost.
  - You are about to drop the column `slash` on the `character_item` table. All the data in the column will be lost.
  - You are about to alter the column `material` on the `character_item` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(5))` to `VarChar(191)`.
  - You are about to drop the column `targetModel` on the `effectapplication` table. All the data in the column will be lost.
  - You are about to drop the column `impact` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `pierce` on the `item` table. All the data in the column will be lost.
  - You are about to drop the column `slash` on the `item` table. All the data in the column will be lost.
  - You are about to alter the column `type` on the `item` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(2))` to `Enum(EnumId(4))`.
  - You are about to drop the column `roundCount` on the `scene` table. All the data in the column will be lost.
  - You are about to drop the column `increaseRelativeSize` on the `skill` table. All the data in the column will be lost.
  - You are about to drop the column `rlSiz` on the `skill` table. All the data in the column will be lost.
  - You are about to drop the column `techniqueSubtype` on the `skill` table. All the data in the column will be lost.
  - You are about to alter the column `type` on the `skill` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(9))` to `Enum(EnumId(3))`.
  - You are about to drop the `charactereffect` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `damagelog` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `log` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `logaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `logeffect` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `direction` to the `action` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mainValue` to the `effectApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetId` to the `effectApplication` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `character_lineage` DROP FOREIGN KEY `cl_ibfk_1`;

-- DropForeignKey
ALTER TABLE `character_lineage` DROP FOREIGN KEY `cl_ibfk_2`;

-- DropForeignKey
ALTER TABLE `character_path` DROP FOREIGN KEY `pc_ibfk_1`;

-- DropForeignKey
ALTER TABLE `character_path` DROP FOREIGN KEY `pc_ibfk_2`;

-- DropForeignKey
ALTER TABLE `charactereffect` DROP FOREIGN KEY `characterEffect_characterId_fkey`;

-- DropForeignKey
ALTER TABLE `charactereffect` DROP FOREIGN KEY `characterEffect_effectId_fkey`;

-- DropForeignKey
ALTER TABLE `damagelog` DROP FOREIGN KEY `damageLog_actorId_fkey`;

-- DropForeignKey
ALTER TABLE `damagelog` DROP FOREIGN KEY `damageLog_logId_fkey`;

-- DropForeignKey
ALTER TABLE `lineage_skill` DROP FOREIGN KEY `ls_ibfk_1`;

-- DropForeignKey
ALTER TABLE `lineage_skill` DROP FOREIGN KEY `ls_ibfk_2`;

-- DropForeignKey
ALTER TABLE `log` DROP FOREIGN KEY `log_actorId_fkey`;

-- DropForeignKey
ALTER TABLE `log` DROP FOREIGN KEY `scene_scfk_1`;

-- DropForeignKey
ALTER TABLE `logaction` DROP FOREIGN KEY `logAction_actionId_fkey`;

-- DropForeignKey
ALTER TABLE `logaction` DROP FOREIGN KEY `logAction_logId_fkey`;

-- DropForeignKey
ALTER TABLE `logeffect` DROP FOREIGN KEY `logEffect_effectId_fkey`;

-- DropForeignKey
ALTER TABLE `logeffect` DROP FOREIGN KEY `logEffect_logId_fkey`;

-- DropIndex
DROP INDEX `cl_ibfk_2` ON `character_lineage`;

-- DropIndex
DROP INDEX `pc_ibfk_2` ON `character_path`;

-- DropIndex
DROP INDEX `ls_ibfk_2` ON `lineage_skill`;

-- AlterTable
ALTER TABLE `action` DROP COLUMN `attack`,
    ADD COLUMN `baseMovement` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `direction` VARCHAR(191) NOT NULL,
    ADD COLUMN `rangeType` ENUM('Pessoal', 'Linha', 'Raio', 'Pulso', 'Cone', 'Ponto') NOT NULL DEFAULT 'Pessoal';

-- AlterTable
ALTER TABLE `actiondie` MODIFY `dieType` INTEGER NOT NULL DEFAULT 3;

-- AlterTable
ALTER TABLE `actionupgrade` DROP COLUMN `newBaseAoERange`,
    DROP COLUMN `newBaseRange`,
    ADD COLUMN `newAoERange` INTEGER NULL,
    ADD COLUMN `newDirection` VARCHAR(191) NULL,
    ADD COLUMN `newMovement` INTEGER NULL,
    ADD COLUMN `newRange` INTEGER NULL;

-- AlterTable
ALTER TABLE `character` DROP COLUMN `acidRes`,
    DROP COLUMN `arcaneRes`,
    DROP COLUMN `barrier`,
    DROP COLUMN `coldRes`,
    DROP COLUMN `cosmicRes`,
    DROP COLUMN `fireRes`,
    DROP COLUMN `fullRes`,
    DROP COLUMN `impactRes`,
    DROP COLUMN `initiative`,
    DROP COLUMN `lightningRes`,
    DROP COLUMN `pierceRes`,
    DROP COLUMN `profaneRes`,
    DROP COLUMN `psychicRes`,
    DROP COLUMN `relativeSize`,
    DROP COLUMN `sacredRes`,
    DROP COLUMN `slashRes`,
    DROP COLUMN `slotAmulet`,
    DROP COLUMN `slotBelt`,
    DROP COLUMN `slotCloak`,
    DROP COLUMN `slotCuirass`,
    DROP COLUMN `slotEarings`,
    DROP COLUMN `slotGauntlet`,
    DROP COLUMN `slotGreaves`,
    DROP COLUMN `slotHelm`,
    DROP COLUMN `slotPauldron`,
    DROP COLUMN `slotRings`,
    DROP COLUMN `slotUpperLegs`,
    ADD COLUMN `effectiveSize` INTEGER NOT NULL DEFAULT 1,
    ADD COLUMN `magicDefense` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `pendingMagics` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `pendingManeuvers` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `pendingOaths` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `pendingTechniques` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `pendingTricks` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `slotAccessory` INTEGER NOT NULL DEFAULT 4,
    ADD COLUMN `slotArmor` INTEGER NOT NULL DEFAULT 1,
    MODIFY `defense` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `character_item` DROP COLUMN `acid`,
    DROP COLUMN `arcane`,
    DROP COLUMN `cold`,
    DROP COLUMN `cosmic`,
    DROP COLUMN `critChanceMod`,
    DROP COLUMN `defense`,
    DROP COLUMN `fire`,
    DROP COLUMN `full`,
    DROP COLUMN `hitMod`,
    DROP COLUMN `impact`,
    DROP COLUMN `lightning`,
    DROP COLUMN `pierce`,
    DROP COLUMN `profane`,
    DROP COLUMN `psychic`,
    DROP COLUMN `reach`,
    DROP COLUMN `sacred`,
    DROP COLUMN `slash`,
    ADD COLUMN `damageDieAmp` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `damageDieCountAmp` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `defenseAmp` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `magicDefenseAmp` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `reachAmp` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `twoHanded` INTEGER NOT NULL DEFAULT -1,
    MODIFY `material` VARCHAR(191) NOT NULL DEFAULT 'Ferro';

-- AlterTable
ALTER TABLE `effectapplication` DROP COLUMN `targetModel`,
    ADD COLUMN `mainValue` INTEGER NOT NULL,
    ADD COLUMN `targetId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `item` DROP COLUMN `impact`,
    DROP COLUMN `pierce`,
    DROP COLUMN `slash`,
    ADD COLUMN `baseDamageDie` INTEGER NULL,
    ADD COLUMN `baseDamageDieCount` INTEGER NULL,
    ADD COLUMN `baseMagicDefense` INTEGER NULL,
    MODIFY `type` ENUM('slotAccessory', 'slotArmor', 'slotWeapon', 'consumable') NOT NULL DEFAULT 'slotAccessory',
    MODIFY `subType` ENUM('Bow', 'Discreet', 'Thrown', 'Firearm', 'Polearm', 'Natural', 'Harpoon', 'Crossbow', 'Whip', 'Club', 'Chain', 'Unarmed', 'FieldSword', 'DuelingSword', 'Scythe', 'Lance', 'Axe', 'Hammer', 'lShield', 'mShield', 'hShield', 'lArmor', 'mArmor', 'hArmor', 'Jewel', 'Clothing', 'Catalyst', 'Focus', 'Potion', 'Oil', 'Bomb') NOT NULL DEFAULT 'Jewel';

-- AlterTable
ALTER TABLE `scene` DROP COLUMN `roundCount`,
    ADD COLUMN `currentRound` INTEGER NOT NULL DEFAULT 0,
    MODIFY `playerTurn` BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE `skill` DROP COLUMN `increaseRelativeSize`,
    DROP COLUMN `rlSiz`,
    DROP COLUMN `techniqueSubtype`,
    ADD COLUMN `efSiz` INTEGER NOT NULL DEFAULT 0,
    ADD COLUMN `increaseEffectiveSize` INTEGER NOT NULL DEFAULT 0,
    MODIFY `type` ENUM('Passiva', 'Magia', 'Manobra') NOT NULL DEFAULT 'Passiva';

-- DropTable
DROP TABLE `charactereffect`;

-- DropTable
DROP TABLE `damagelog`;

-- DropTable
DROP TABLE `log`;

-- DropTable
DROP TABLE `logaction`;

-- DropTable
DROP TABLE `logeffect`;

-- CreateTable
CREATE TABLE `itemEffect` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `effectId` INTEGER NOT NULL,
    `character_itemId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `effectApplication` ADD CONSTRAINT `effectApplication_targetId_fkey` FOREIGN KEY (`targetId`) REFERENCES `character`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `character_lineage` ADD CONSTRAINT `character_lineage_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `character`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `character_lineage` ADD CONSTRAINT `character_lineage_lineageId_fkey` FOREIGN KEY (`lineageId`) REFERENCES `lineage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `character_path` ADD CONSTRAINT `character_path_characterId_fkey` FOREIGN KEY (`characterId`) REFERENCES `character`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `character_path` ADD CONSTRAINT `character_path_pathId_fkey` FOREIGN KEY (`pathId`) REFERENCES `path`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lineage_skill` ADD CONSTRAINT `lineage_skill_lineageId_fkey` FOREIGN KEY (`lineageId`) REFERENCES `lineage`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `lineage_skill` ADD CONSTRAINT `lineage_skill_skillId_fkey` FOREIGN KEY (`skillId`) REFERENCES `skill`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `itemEffect` ADD CONSTRAINT `itemEffect_effectId_fkey` FOREIGN KEY (`effectId`) REFERENCES `effect`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `itemEffect` ADD CONSTRAINT `itemEffect_character_itemId_fkey` FOREIGN KEY (`character_itemId`) REFERENCES `character_item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
