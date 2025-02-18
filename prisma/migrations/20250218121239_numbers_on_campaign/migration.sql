/*
  Warnings:

  - You are about to alter the column `month` on the `campaign` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(3))` to `Int`.
  - You are about to alter the column `weekDay` on the `campaign` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(6))` to `Int`.
  - You are about to alter the column `timeOfDay` on the `campaign` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(13))` to `Int`.
  - You are about to alter the column `era` on the `campaign` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the column `amount` on the `damagelog` table. All the data in the column will be lost.
  - You are about to drop the column `mitigated` on the `damagelog` table. All the data in the column will be lost.
  - You are about to drop the column `targetId` on the `damagelog` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `damagelog` table. All the data in the column will be lost.
  - You are about to drop the column `operator` on the `effect` table. All the data in the column will be lost.
  - You are about to drop the column `targetModel` on the `effect` table. All the data in the column will be lost.
  - You are about to drop the column `effectValue` on the `logeffect` table. All the data in the column will be lost.
  - You are about to drop the column `previousValue` on the `logeffect` table. All the data in the column will be lost.
  - You are about to drop the column `targetId` on the `logeffect` table. All the data in the column will be lost.
  - The values [weapon,armor] on the enum `effectApplication_targetModel` will be removed. If these variants are still used in the database, this will fail.
  - You are about to alter the column `era` on the `scene` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `month` on the `scene` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(14))` to `Int`.
  - You are about to alter the column `timeOfDay` on the `scene` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(15))` to `Int`.
  - You are about to alter the column `weekDay` on the `scene` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(16))` to `Int`.
  - Added the required column `magnitude` to the `characterEffect` table without a default value. This is not possible if the table is not empty.
  - Added the required column `roundApplied` to the `characterEffect` table without a default value. This is not possible if the table is not empty.
  - Added the required column `preMitigationDamage` to the `damageLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetIds` to the `damageLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `operator` to the `effectApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetModel` to the `effectApplication` table without a default value. This is not possible if the table is not empty.
  - Added the required column `targetIds` to the `logEffect` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `damagelog` DROP FOREIGN KEY `damageLog_targetId_fkey`;

-- DropIndex
DROP INDEX `damageLog_targetId_fkey` ON `damagelog`;

-- AlterTable
ALTER TABLE `campaign` MODIFY `month` INTEGER NOT NULL DEFAULT 1,
    MODIFY `weekDay` INTEGER NOT NULL DEFAULT 1,
    MODIFY `timeOfDay` INTEGER NOT NULL DEFAULT 1,
    MODIFY `era` INTEGER NOT NULL DEFAULT 1;

-- AlterTable
ALTER TABLE `charactereffect` ADD COLUMN `magnitude` INTEGER NOT NULL,
    ADD COLUMN `roundApplied` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `damagelog` DROP COLUMN `amount`,
    DROP COLUMN `mitigated`,
    DROP COLUMN `targetId`,
    DROP COLUMN `type`,
    ADD COLUMN `preMitigationDamage` INTEGER NOT NULL,
    ADD COLUMN `targetIds` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `effect` DROP COLUMN `operator`,
    DROP COLUMN `targetModel`;

-- AlterTable
ALTER TABLE `effectapplication` ADD COLUMN `operator` ENUM('Sum', 'Sub', 'Mult', 'Div') NOT NULL,
    ADD COLUMN `targetModel` ENUM('character', 'item') NOT NULL;

-- AlterTable
ALTER TABLE `logeffect` DROP COLUMN `effectValue`,
    DROP COLUMN `previousValue`,
    DROP COLUMN `targetId`,
    ADD COLUMN `targetIds` VARCHAR(191) NOT NULL,
    MODIFY `targetType` ENUM('character', 'item') NOT NULL;

-- AlterTable
ALTER TABLE `scene` MODIFY `era` INTEGER NOT NULL DEFAULT 7,
    MODIFY `month` INTEGER NOT NULL DEFAULT 1,
    MODIFY `timeOfDay` INTEGER NOT NULL DEFAULT 1,
    MODIFY `weekDay` INTEGER NOT NULL DEFAULT 1;
