/*
  Warnings:

  - You are about to drop the `armor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `atkdamage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `attack` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `campaign` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `character` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `character_armor` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `character_lineage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `character_path` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `character_skill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `character_training` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `character_weapon` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `charstats` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lineage` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `lineage_skill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `path` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `path_skill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `path_training` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `resistances` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `skill` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `training` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `weapon` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `armor` DROP FOREIGN KEY `armor_resistanceId_fkey`;

-- DropForeignKey
ALTER TABLE `armor` DROP FOREIGN KEY `armor_trainingId_fkey`;

-- DropForeignKey
ALTER TABLE `atkdamage` DROP FOREIGN KEY `dmg_ibfk_1`;

-- DropForeignKey
ALTER TABLE `attack` DROP FOREIGN KEY `a_ibfk_1`;

-- DropForeignKey
ALTER TABLE `character` DROP FOREIGN KEY `character_ibfk_1`;

-- DropForeignKey
ALTER TABLE `character_armor` DROP FOREIGN KEY `character_armor_armorId_fkey`;

-- DropForeignKey
ALTER TABLE `character_armor` DROP FOREIGN KEY `character_armor_characterId_fkey`;

-- DropForeignKey
ALTER TABLE `character_armor` DROP FOREIGN KEY `character_armor_resistanceId_fkey`;

-- DropForeignKey
ALTER TABLE `character_lineage` DROP FOREIGN KEY `cl_ibfk_1`;

-- DropForeignKey
ALTER TABLE `character_lineage` DROP FOREIGN KEY `cl_ibfk_2`;

-- DropForeignKey
ALTER TABLE `character_path` DROP FOREIGN KEY `pc_ibfk_1`;

-- DropForeignKey
ALTER TABLE `character_path` DROP FOREIGN KEY `pc_ibfk_2`;

-- DropForeignKey
ALTER TABLE `character_skill` DROP FOREIGN KEY `character_skill_characterId_fkey`;

-- DropForeignKey
ALTER TABLE `character_skill` DROP FOREIGN KEY `character_skill_skillId_fkey`;

-- DropForeignKey
ALTER TABLE `character_training` DROP FOREIGN KEY `ct_ibfk_1`;

-- DropForeignKey
ALTER TABLE `character_training` DROP FOREIGN KEY `ct_ibfk_2`;

-- DropForeignKey
ALTER TABLE `character_weapon` DROP FOREIGN KEY `character_weapon_characterId_fkey`;

-- DropForeignKey
ALTER TABLE `character_weapon` DROP FOREIGN KEY `character_weapon_weaponId_fkey`;

-- DropForeignKey
ALTER TABLE `charstats` DROP FOREIGN KEY `c_ibfk_1`;

-- DropForeignKey
ALTER TABLE `charstats` DROP FOREIGN KEY `charStats_resistanceId_fkey`;

-- DropForeignKey
ALTER TABLE `lineage_skill` DROP FOREIGN KEY `ls_ibfk_1`;

-- DropForeignKey
ALTER TABLE `lineage_skill` DROP FOREIGN KEY `ls_ibfk_2`;

-- DropForeignKey
ALTER TABLE `path` DROP FOREIGN KEY `path_prerequisiteId_fkey`;

-- DropForeignKey
ALTER TABLE `path_skill` DROP FOREIGN KEY `path_skill_pathId_fkey`;

-- DropForeignKey
ALTER TABLE `path_skill` DROP FOREIGN KEY `path_skill_skillId_fkey`;

-- DropForeignKey
ALTER TABLE `path_training` DROP FOREIGN KEY `pt_ibfk_1`;

-- DropForeignKey
ALTER TABLE `path_training` DROP FOREIGN KEY `pt_ibfk_2`;

-- DropForeignKey
ALTER TABLE `skill` DROP FOREIGN KEY `skill_prerequisiteId_fkey`;

-- DropForeignKey
ALTER TABLE `weapon` DROP FOREIGN KEY `weapon_trainingId_fkey`;

-- DropTable
DROP TABLE `armor`;

-- DropTable
DROP TABLE `atkdamage`;

-- DropTable
DROP TABLE `attack`;

-- DropTable
DROP TABLE `campaign`;

-- DropTable
DROP TABLE `character`;

-- DropTable
DROP TABLE `character_armor`;

-- DropTable
DROP TABLE `character_lineage`;

-- DropTable
DROP TABLE `character_path`;

-- DropTable
DROP TABLE `character_skill`;

-- DropTable
DROP TABLE `character_training`;

-- DropTable
DROP TABLE `character_weapon`;

-- DropTable
DROP TABLE `charstats`;

-- DropTable
DROP TABLE `lineage`;

-- DropTable
DROP TABLE `lineage_skill`;

-- DropTable
DROP TABLE `path`;

-- DropTable
DROP TABLE `path_skill`;

-- DropTable
DROP TABLE `path_training`;

-- DropTable
DROP TABLE `resistances`;

-- DropTable
DROP TABLE `skill`;

-- DropTable
DROP TABLE `training`;

-- DropTable
DROP TABLE `weapon`;

-- CreateTable
CREATE TABLE `personagem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `criadoEm` TIMESTAMP(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `nome` TEXT NOT NULL,
    `nivel` INTEGER NOT NULL DEFAULT 1,
    `xp` INTEGER NOT NULL DEFAULT 0,
    `tier` INTEGER NOT NULL DEFAULT 1,
    `ptsLinhagem` INTEGER NOT NULL DEFAULT 2,
    `ptsCaminhos` INTEGER NOT NULL DEFAULT 1,
    `ptsHabilidades` INTEGER NOT NULL DEFAULT 2,
    `ptsTreinos` INTEGER NOT NULL DEFAULT 1,
    `ouro` INTEGER NOT NULL DEFAULT 50,
    `agi` INTEGER NOT NULL DEFAULT 1,
    `cor` INTEGER NOT NULL DEFAULT 1,
    `det` INTEGER NOT NULL DEFAULT 1,
    `foc` INTEGER NOT NULL DEFAULT 1,
    `men` INTEGER NOT NULL DEFAULT 1,
    `vig` INTEGER NOT NULL DEFAULT 1,
    `authorId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `derivados` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `vitalidade` INTEGER NOT NULL,
    `poder` INTEGER NOT NULL,
    `ptsAcao` INTEGER NOT NULL,
    `equilibrio` INTEGER NOT NULL,
    `iniciativa` INTEGER NOT NULL,
    `limiteMagico` INTEGER NOT NULL,
    `tamanhoReal` INTEGER NOT NULL,
    `tamanhoEfetivo` INTEGER NOT NULL,
    `capCarga` INTEGER NOT NULL,
    `capLevantar` INTEGER NOT NULL,
    `peso` INTEGER NOT NULL,
    `danoCrit` INTEGER NOT NULL,
    `defCrit` INTEGER NOT NULL,
    `charId` INTEGER NOT NULL,

    UNIQUE INDEX `derivados_charId_key`(`charId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `defesa` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipoFis` ENUM('Corte', 'Impacto', 'Perfurante', 'Total') NULL,
    `tipoMag` ENUM('Elemental', 'Acido', 'Aquatico', 'Eletrico', 'Flamejante', 'Hermetico', 'Arcano', 'Cosmico', 'Mental', 'Profano', 'Sagrado', 'Total') NULL,
    `imune` BOOLEAN NOT NULL,
    `valorFixo` INTEGER NOT NULL,
    `valorPorDado` INTEGER NOT NULL,
    `personagemId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `imunidadeCondicao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipoCondicao` ENUM('Agarrado', 'Amarrado', 'Alienado', 'Amedrontado', 'Atordoado', 'Camuflado', 'Caindo', 'Cegado', 'Cintilante', 'Coberto', 'Congelado', 'Corroendo', 'Derretendo', 'Derrubado', 'Desarmado', 'Drenado', 'Encantado', 'Encharcado', 'Enfraquecido', 'Envenenado', 'Ensurdecido', 'Escondido', 'Escravizado', 'Esmagado', 'Estonteado', 'Exausto', 'Flutuando', 'Lento', 'Luminoso', 'Insano', 'Invisivel', 'Imovel', 'Marcado', 'Montado', 'Nauseado', 'Obscurecido', 'Paralisado', 'Sangrando', 'Silenciado', 'Sobrecarregado', 'Submerso', 'Sufocado', 'Surpreso', 'Suspenso') NOT NULL,
    `personagemId` INTEGER NOT NULL,

    UNIQUE INDEX `imunidadeCondicao_personagemId_key`(`personagemId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `personagemAtaque` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `personagemId` INTEGER NOT NULL,
    `alvoId` INTEGER NULL,
    `atributo` VARCHAR(191) NOT NULL DEFAULT 'cor',
    `alcance` INTEGER NOT NULL DEFAULT 1,
    `ptsAcao` INTEGER NOT NULL DEFAULT 1,
    `brutal` BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `dadoDano` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipoDado` INTEGER NOT NULL,
    `numDados` INTEGER NOT NULL,
    `bonusFixo` INTEGER NOT NULL DEFAULT 0,
    `bonusDado` INTEGER NOT NULL DEFAULT 0,
    `tipoFis` ENUM('Corte', 'Impacto', 'Perfurante', 'Total') NULL,
    `tipoMag` ENUM('Elemental', 'Acido', 'Aquatico', 'Eletrico', 'Flamejante', 'Hermetico', 'Arcano', 'Cosmico', 'Mental', 'Profano', 'Sagrado', 'Total') NULL,
    `idAtaque` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `efeitoAplicado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipoAlvo` ENUM('personagem', 'instanciaItem') NOT NULL,
    `alvoId` INTEGER NOT NULL,
    `efeitoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `habilidade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipo` ENUM('Agarrado', 'Amarrado', 'Alienado', 'Amedrontado', 'Atordoado', 'Camuflado', 'Caindo', 'Cegado', 'Cintilante', 'Coberto', 'Congelado', 'Corroendo', 'Derretendo', 'Derrubado', 'Desarmado', 'Drenado', 'Encantado', 'Encharcado', 'Enfraquecido', 'Envenenado', 'Ensurdecido', 'Escondido', 'Escravizado', 'Esmagado', 'Estonteado', 'Exausto', 'Flutuando', 'Lento', 'Luminoso', 'Insano', 'Invisivel', 'Imovel', 'Marcado', 'Montado', 'Nauseado', 'Obscurecido', 'Paralisado', 'Sangrando', 'Silenciado', 'Sobrecarregado', 'Submerso', 'Sufocado', 'Surpreso', 'Suspenso') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `habilidadePersonagem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `personagemId` INTEGER NOT NULL,
    `habilidadeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `efeitoHabilidade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `efeitoId` INTEGER NOT NULL,
    `habilidadeId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `condicao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipoCondicao` ENUM('Agarrado', 'Amarrado', 'Alienado', 'Amedrontado', 'Atordoado', 'Camuflado', 'Caindo', 'Cegado', 'Cintilante', 'Coberto', 'Congelado', 'Corroendo', 'Derretendo', 'Derrubado', 'Desarmado', 'Drenado', 'Encantado', 'Encharcado', 'Enfraquecido', 'Envenenado', 'Ensurdecido', 'Escondido', 'Escravizado', 'Esmagado', 'Estonteado', 'Exausto', 'Flutuando', 'Lento', 'Luminoso', 'Insano', 'Invisivel', 'Imovel', 'Marcado', 'Montado', 'Nauseado', 'Obscurecido', 'Paralisado', 'Sangrando', 'Silenciado', 'Sobrecarregado', 'Submerso', 'Sufocado', 'Surpreso', 'Suspenso') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `condicaoPersonagem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `personagemId` INTEGER NOT NULL,
    `condicaoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `efeitoCondicao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `efeitoId` INTEGER NOT NULL,
    `condicaoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `efeito` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `atributoAfetado` VARCHAR(191) NOT NULL,
    `valor` DOUBLE NOT NULL,
    `operador` ENUM('Soma', 'Subtrai', 'Multiplica', 'Divide') NOT NULL,
    `duracao` INTEGER NOT NULL,
    `ativacao` ENUM('Acerto', 'Brutal', 'Passivo') NOT NULL,
    `instanciaItemId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `itemBase` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL DEFAULT 'Item',
    `custoBase` INTEGER NOT NULL,
    `pesoBase` INTEGER NOT NULL,
    `tipo` ENUM('MaoLivre', 'Elmo', 'Ombreira', 'Luva', 'Anel', 'Manto', 'Peitoral', 'Pingente', 'Cintura', 'Pernas', 'Bota') NOT NULL,
    `subtipo` ENUM('Arco', 'Discreta', 'Arremesso', 'ArmaFogo', 'Haste', 'Natural', 'Arpao', 'Besta', 'Chicote', 'Clava', 'Corrente', 'Desarmado', 'EspadaCampo', 'EspadaDuelo', 'Foice', 'LancaMontada', 'Machado', 'Martelo', 'ArmaduraLeve', 'ArmaduraMedia', 'ArmaduraPesada', 'EscudoLeve', 'EscudoMedio', 'EscudoPesado') NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `slotItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tipoSlot` ENUM('MaoLivre', 'Elmo', 'Ombreira', 'Luva', 'Anel', 'Manto', 'Peitoral', 'Pingente', 'Cintura', 'Pernas', 'Bota') NOT NULL,
    `instanciaItemId` INTEGER NULL,
    `personagemId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `instanciaItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `tier` INTEGER NOT NULL DEFAULT 0,
    `custoReal` INTEGER NOT NULL,
    `pesoReal` INTEGER NOT NULL,
    `atributoBase` VARCHAR(191) NULL,
    `personagemId` INTEGER NOT NULL,
    `itemBaseId` INTEGER NOT NULL,
    `tipoItem` ENUM('MaoLivre', 'Elmo', 'Ombreira', 'Luva', 'Anel', 'Manto', 'Peitoral', 'Pingente', 'Cintura', 'Pernas', 'Bota') NOT NULL,
    `materialItemId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `materialItem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `valor` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `campanha` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `mestreId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `efeitoCampanha` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `efeitoId` INTEGER NOT NULL,
    `campanhaId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `personagemCampanha` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `campanhaId` INTEGER NOT NULL,
    `personagemId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `personagem` ADD CONSTRAINT `character_ibfk_1` FOREIGN KEY (`authorId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `derivados` ADD CONSTRAINT `derivados_fk_1` FOREIGN KEY (`charId`) REFERENCES `personagem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `defesa` ADD CONSTRAINT `defesa_personagemId_fkey` FOREIGN KEY (`personagemId`) REFERENCES `personagem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `imunidadeCondicao` ADD CONSTRAINT `imunidades_fk_1` FOREIGN KEY (`personagemId`) REFERENCES `personagem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `personagemAtaque` ADD CONSTRAINT `personagemAtaque_personagemId_fkey` FOREIGN KEY (`personagemId`) REFERENCES `personagem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `dadoDano` ADD CONSTRAINT `dadoDano_idAtaque_fkey` FOREIGN KEY (`idAtaque`) REFERENCES `personagemAtaque`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `efeitoAplicado` ADD CONSTRAINT `efeitoAplicado_efeitoId_fkey` FOREIGN KEY (`efeitoId`) REFERENCES `efeito`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `habilidadePersonagem` ADD CONSTRAINT `habilidadePersonagem_habilidadeId_fkey` FOREIGN KEY (`habilidadeId`) REFERENCES `habilidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `habilidadePersonagem` ADD CONSTRAINT `habilidadePersonagem_personagemId_fkey` FOREIGN KEY (`personagemId`) REFERENCES `personagem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `efeitoHabilidade` ADD CONSTRAINT `efeitoHabilidade_habilidadeId_fkey` FOREIGN KEY (`habilidadeId`) REFERENCES `habilidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `efeitoHabilidade` ADD CONSTRAINT `efeitoHabilidade_efeitoId_fkey` FOREIGN KEY (`efeitoId`) REFERENCES `efeito`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `condicaoPersonagem` ADD CONSTRAINT `condicaoPersonagem_condicaoId_fkey` FOREIGN KEY (`condicaoId`) REFERENCES `condicao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `condicaoPersonagem` ADD CONSTRAINT `condicaoPersonagem_personagemId_fkey` FOREIGN KEY (`personagemId`) REFERENCES `personagem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `efeitoCondicao` ADD CONSTRAINT `efeitoCondicao_condicaoId_fkey` FOREIGN KEY (`condicaoId`) REFERENCES `condicao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `efeitoCondicao` ADD CONSTRAINT `efeitoCondicao_efeitoId_fkey` FOREIGN KEY (`efeitoId`) REFERENCES `efeito`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `efeito` ADD CONSTRAINT `efeito_instanciaItemId_fkey` FOREIGN KEY (`instanciaItemId`) REFERENCES `instanciaItem`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `slotItem` ADD CONSTRAINT `slotItem_instanciaItemId_fkey` FOREIGN KEY (`instanciaItemId`) REFERENCES `instanciaItem`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `slotItem` ADD CONSTRAINT `slotItem_personagemId_fkey` FOREIGN KEY (`personagemId`) REFERENCES `personagem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `instanciaItem` ADD CONSTRAINT `instanciaItem_personagemId_fkey` FOREIGN KEY (`personagemId`) REFERENCES `personagem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `instanciaItem` ADD CONSTRAINT `instanciaItem_itemBaseId_fkey` FOREIGN KEY (`itemBaseId`) REFERENCES `itemBase`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `instanciaItem` ADD CONSTRAINT `instanciaItem_materialItemId_fkey` FOREIGN KEY (`materialItemId`) REFERENCES `materialItem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `campanha` ADD CONSTRAINT `campanha_mestreId_fkey` FOREIGN KEY (`mestreId`) REFERENCES `user`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `efeitoCampanha` ADD CONSTRAINT `efeitoCampanha_campanhaId_fkey` FOREIGN KEY (`campanhaId`) REFERENCES `campanha`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `efeitoCampanha` ADD CONSTRAINT `efeitoCampanha_efeitoId_fkey` FOREIGN KEY (`efeitoId`) REFERENCES `efeito`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `personagemCampanha` ADD CONSTRAINT `personagemCampanha_campanhaId_fkey` FOREIGN KEY (`campanhaId`) REFERENCES `campanha`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `personagemCampanha` ADD CONSTRAINT `personagemCampanha_personagemId_fkey` FOREIGN KEY (`personagemId`) REFERENCES `personagem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
