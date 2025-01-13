/*
  Warnings:

  - The values [Agarrado,Amarrado,Alienado,Amedrontado,Atordoado,Camuflado,Caindo,Cegado,Cintilante,Coberto,Congelado,Corroendo,Derretendo,Derrubado,Desarmado,Drenado,Encantado,Encharcado,Enfraquecido,Envenenado,Ensurdecido,Escondido,Escravizado,Esmagado,Estonteado,Exausto,Flutuando,Lento,Luminoso,Insano,Invisivel,Imovel,Marcado,Montado,Nauseado,Obscurecido,Paralisado,Sangrando,Silenciado,Sobrecarregado,Submerso,Sufocado,Surpreso,Suspenso] on the enum `habilidade_tipo` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `habilidade` MODIFY `tipo` ENUM('Caracteristica', 'Juramento', 'Manobra', 'Trapaca', 'Runa', 'Sigilo') NOT NULL;

-- CreateTable
CREATE TABLE `caminho` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` TEXT NOT NULL,
    `descricao` TEXT NOT NULL,
    `caminhoTier` INTEGER NOT NULL,
    `vitalidade` INTEGER NOT NULL,
    `poder` INTEGER NOT NULL,
    `ptsMagia` INTEGER NOT NULL DEFAULT 0,
    `ptsTecnica` INTEGER NOT NULL DEFAULT 0,
    `ptsJuramento` INTEGER NOT NULL DEFAULT 0,
    `ptsManobra` INTEGER NOT NULL DEFAULT 0,
    `addTrapaca` INTEGER NOT NULL DEFAULT 0,
    `reqMagia` INTEGER NOT NULL DEFAULT 0,
    `reqTecnica` INTEGER NOT NULL DEFAULT 0,
    `reqJuramento` INTEGER NOT NULL DEFAULT 0,
    `reqManobra` INTEGER NOT NULL DEFAULT 0,
    `reqTrapaca` INTEGER NOT NULL DEFAULT 0,
    `prerequisiteId` INTEGER NULL,

    UNIQUE INDEX `caminho_prerequisiteId_key`(`prerequisiteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `caminhoPersonagem` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `personagemId` INTEGER NOT NULL,
    `caminhoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `caminhoHabilidade` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `habilidadeId` INTEGER NOT NULL,
    `caminhoId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `caminho` ADD CONSTRAINT `caminho_prerequisiteId_fkey` FOREIGN KEY (`prerequisiteId`) REFERENCES `caminho`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `caminhoPersonagem` ADD CONSTRAINT `caminhoPersonagem_personagemId_fkey` FOREIGN KEY (`personagemId`) REFERENCES `personagem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `caminhoPersonagem` ADD CONSTRAINT `caminhoPersonagem_caminhoId_fkey` FOREIGN KEY (`caminhoId`) REFERENCES `caminho`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `caminhoHabilidade` ADD CONSTRAINT `caminhoHabilidade_habilidadeId_fkey` FOREIGN KEY (`habilidadeId`) REFERENCES `habilidade`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `caminhoHabilidade` ADD CONSTRAINT `caminhoHabilidade_caminhoId_fkey` FOREIGN KEY (`caminhoId`) REFERENCES `caminho`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
