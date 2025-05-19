/*
  Warnings:

  - You are about to alter the column `subType` on the `item` table. The data in that column could be lost. The data in that column will be cast from `Enum(EnumId(5))` to `Enum(EnumId(5))`.

*/
-- AlterTable
ALTER TABLE `item` MODIFY `type` ENUM('slotAccessory', 'slotArmor', 'slotWeapon', 'consumable') NOT NULL DEFAULT 'slotWeapon',
    MODIFY `subType` ENUM('Arco', 'Espada', 'Machado', 'Martelo', 'Haste', 'Disparo', 'Natural', 'Leve', 'Pesada', 'Joalheria', 'Traje', 'Catalisador', 'Elixir', 'Explosivo') NOT NULL DEFAULT 'Espada';
