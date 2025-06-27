/*
  Warnings:

  - You are about to drop the `action` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `actionupgrade` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `characterscene` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `effect` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `effectapplication` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `itemeffect` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `scene` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `action` DROP FOREIGN KEY `action_skillId_fkey`;

-- DropForeignKey
ALTER TABLE `actionupgrade` DROP FOREIGN KEY `actionUpgrade_actionId_fkey`;

-- DropForeignKey
ALTER TABLE `characterscene` DROP FOREIGN KEY `characterScene_characterId_fkey`;

-- DropForeignKey
ALTER TABLE `characterscene` DROP FOREIGN KEY `characterScene_sceneId_fkey`;

-- DropForeignKey
ALTER TABLE `effectapplication` DROP FOREIGN KEY `effectApplication_effectId_fkey`;

-- DropForeignKey
ALTER TABLE `effectapplication` DROP FOREIGN KEY `effectApplication_targetId_fkey`;

-- DropForeignKey
ALTER TABLE `itemeffect` DROP FOREIGN KEY `itemEffect_character_itemId_fkey`;

-- DropForeignKey
ALTER TABLE `itemeffect` DROP FOREIGN KEY `itemEffect_effectId_fkey`;

-- DropForeignKey
ALTER TABLE `scene` DROP FOREIGN KEY `scene_campaignId_fkey`;

-- DropTable
DROP TABLE `action`;

-- DropTable
DROP TABLE `actionupgrade`;

-- DropTable
DROP TABLE `characterscene`;

-- DropTable
DROP TABLE `effect`;

-- DropTable
DROP TABLE `effectapplication`;

-- DropTable
DROP TABLE `itemeffect`;

-- DropTable
DROP TABLE `scene`;
