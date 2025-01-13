/* eslint-disable @typescript-eslint/no-explicit-any */
import type { PersonagemForm } from './types.server'
import { prisma } from './prisma.server'
import { json } from '@remix-run/node'
import { personagem, caminho, efeito } from '@prisma/client'
import { checkArmorTrainings, checkWeaponTrainings } from './inventory.server'

//BASIC
export const createPersonagem = async (personagem: PersonagemForm) => {
  const newpersonagem = await prisma.personagem.create({
    data: {
      nome: personagem.nome,
      nivel: personagem.nivel,
      tier: personagem.tier,
      agi: personagem.agi,
      cor: personagem.cor,
      det: personagem.det,
      foc: personagem.foc,
      men: personagem.men,
      vig: personagem.vig,
      authorId: personagem.authorId
    },
  })
  return {
    id: newpersonagem.id, nome: personagem.nome, tier: personagem.tier, agi: personagem.agi, cor: personagem.cor, det: personagem.det, foc: personagem.foc, men: personagem.men, vig: personagem.vig, authorId: personagem.authorId
  }
}

export const updatePersonagem = async (personagem: PersonagemForm, personagemId: number) => {
  const updatedPersonagem = await prisma.personagem.update({
    where: {
      id: personagemId
    }
    ,
    data: {
      nome: personagem.nome,
      nivel: personagem.nivel,
      tier: personagem.tier,
      agi: personagem.agi,
      cor: personagem.cor,
      men: personagem.men,
    },
  })
  return {
    id: updatedPersonagem.id, nome: personagem.nome, tier: personagem.tier, agi: personagem.agi, cor: personagem.cor, det: personagem.det, foc: personagem.foc, men: personagem.men, vig: personagem.vig, authorId: personagem.authorId
  }
}

export async function submitPersonagem(personagem: PersonagemForm) {
  const newpersonagem = await createPersonagem(personagem)
  if (!newpersonagem) {

    return json(
      {
        error: `Something went wrong trying to create a new personagem.`,
        fields: {
          nome: personagem.nome, tier: personagem.tier, agi: personagem.agi, cor: personagem.cor, det: personagem.det, foc: personagem.foc, men: personagem.men, vig: personagem.vig, authorId: personagem.authorId
        },
      },
      { status: 400 },
    )
  }
  return (String(newpersonagem.id))
}

export const getPersonagemsFromUser = async (userId: number) => {
  return prisma.personagem.findMany({
    where: { authorId: userId },
    select: { id: true, nome: true, authorId: true },
    orderBy: {
      criadoEm: 'desc'
    }
  })
}

//STATS
export const createStats = async (char: { efeitos: efeito[], personagem: personagem, caminhos: caminho[] }) => {
  const { agi, cor, det, foc, tier, nivel, men, vig, id } = char.personagem;
  let caminhosVit = 0
  char.caminhos.forEach(caminho => { caminhosVit += caminho.vitalidade });
  let caminhosPow = 0
  char.caminhos.forEach(caminho => { caminhosPow += caminho.poder });

  const vitalidade = caminhosVit + (vig * nivel) + (1 * nivel);
  const poder = foc + tier + caminhosPow;
  const ptsAcao = 2 + vig + tier;
  const equilibrio = vig + det + tier;
  const iniciativa = agi + tier;
  const limiteMagico = agi + tier;
  const trueSize = 1;
  const relativeSize = 1;
  const baseWeight = (5 * cor) + 10;
  const carryCap = 5 + 10 + (5 * cor);
  const liftCap = 10 + 10 + (10 * cor);

  const newpersonagemstat = await prisma.derivados.upsert({
    create: {
      vitalidade: vitalidade,
      ptsAcao: ptsAcao,
      poder: poder,
      equilibrio: equilibrio,
      defense: defense,
      iniciativa: iniciativa,
      trueSize: trueSize,
      relativeSize: relativeSize,
      baseWeight: baseWeight,
      carryCap: carryCap,
      liftCap: liftCap,
      personagemId: id,
    },
    update: {
      vitalidade: vitalidade,
      ptsAcao: ptsAcao,
      poder: poder,
      equilibrio: equilibrio,
      defense: defense,
      iniciativa: iniciativa,
      trueSize: trueSize,
      relativeSize: relativeSize,
      baseWeight: baseWeight,
      carryCap: carryCap,
      liftCap: liftCap,
    },
    where: {
      personagemId: char.personagem.id
    }
  });

  return newpersonagemstat;
};

export function tierByNivel(nivel: any) {
  if (nivel < 5) {
    return '1';
  } else {
    if (nivel < 11) {
      return '2';
    } else {
      if (nivel < 17) {
        return '3';
      } else {
        if (nivel >= 17) {
          return '4';
        }
      }
    }
  }
}

//HABILIDADES
export const submitCharHabilidades = async (habilidadeList: number[], personagemId: number, pendingHabilidades: number) => {
  const existingHabilidades = await prisma.personagem_habilidade.findMany({
    where: {
      habilidadeId: { in: habilidadeList },
      personagemId: personagemId,
    },
  });

  const existingHabilidadeIds = existingHabilidades.map(cs => cs.habilidadeId);

  const newHabilidades = habilidadeList.filter(habilidadeId => !existingHabilidadeIds.includes(habilidadeId));

  const newPendingHabilidades = pendingHabilidades - newHabilidades.length;



  if (newHabilidades.length > 0) {
    await prisma.personagem_habilidade.createMany({
      data: newHabilidades.map(habilidadeId => ({
        habilidadeId: habilidadeId,
        personagemId: personagemId,
      })),
      skipDuplicates: true,
    });
    await prisma.personagem.update({
      where: { id: personagemId },
      data: {
        pendingHabilidades: newPendingHabilidades
      }
    })
  }

  return;
};

//LINEAGES
export const submitCharLineages = async (lineageList: number[], personagemId: number, pure: boolean) => {
  const existingLineages = await prisma.personagem_lineage.findMany({
    where: {
      lineageId: { in: lineageList },
      personagemId: personagemId,
    },
  });

  const existingHabilidadeIds = existingLineages.map(cs => cs.lineageId);

  const newLineages = lineageList.filter(lineageId => !existingHabilidadeIds.includes(lineageId));

  if (newLineages.length > 0) {
    await prisma.personagem_lineage.createMany({
      data: newLineages.map(lineageId => ({
        lineageId: lineageId,
        personagemId: personagemId,
        pure: pure
      })),
      skipDuplicates: true,
    });
    await prisma.personagem.update({
      where: { id: personagemId },
      data: {
        pendingLineages: 0
      }
    })
  }

  return;
};

//CAMINHOS

export const submitCharCaminhos = async (caminhoList: number[], personagemId: number, pendingCaminhos: number) => {
  const existingCaminhos = await prisma.personagem_caminho.findMany({
    where: {
      caminhoId: { in: caminhoList },
      personagemId: personagemId,
    },
  });

  const existingHabilidadeIds = existingCaminhos.map(cs => cs.caminhoId);

  const newCaminhos = caminhoList.filter(caminhoId => !existingHabilidadeIds.includes(caminhoId));

  const newPendingCaminhos = pendingCaminhos - newCaminhos.length;


  if (newCaminhos.length > 0) {
    await prisma.personagem_caminho.createMany({
      data: newCaminhos.map(caminhoId => ({
        caminhoId: caminhoId,
        personagemId: personagemId,
      })),
      skipDuplicates: true,
    });
    await prisma.personagem.update({
      where: { id: personagemId },
      data: {
        pendingCaminho: newPendingCaminhos
      }
    })
  }

  return;
};

//TRAININGS

export const submitCharTrainings = async (trainingList: number[], personagemId: number, pendingTrainings: number) => {
  const existingTrainings = await prisma.personagem_training.findMany({
    where: {
      trainingId: { in: trainingList },
      personagemId: personagemId,
    },
  });

  const weapons = await prisma.personagem_weapon.findMany({
    where: {
      personagemId: personagemId
    },
    include: { weapon: true },
  });

  const armors = await prisma.personagem_armor.findMany({
    where: {
      personagemId: personagemId
    },
    include: { armor: true },
  });


  const existingTrainingIds = existingTrainings.map(ct => ct.trainingId);

  const newTrainings = trainingList.filter(trainingId => !existingTrainingIds.includes(trainingId));

  const weaponTrainingIds = weapons.map(w => w.weapon.trainingId);

  const weaponUpdateList = weaponTrainingIds.filter(id => newTrainings.includes(id) || (existingTrainingIds.includes(id)))

  const armorTrainingIds = armors.map(a => a.armor.trainingId);

  const armorUpdateList = armorTrainingIds.filter(id => newTrainings.includes(id) || (existingTrainingIds.includes(id)))

  const newPendingTrainings = pendingTrainings - newTrainings.length;


  if (newTrainings.length > 0) {
    await prisma.personagem_training.createMany({
      data: newTrainings.map(trainingId => ({
        personagemId: personagemId,
        trainingId: trainingId,
      })),
      skipDuplicates: true,
    });

    await checkWeaponTrainings(weaponUpdateList, personagemId)
    await checkArmorTrainings(armorUpdateList, personagemId)

    await prisma.personagem.update({
      where: { id: personagemId },
      data: {
        pendingTrainings: newPendingTrainings
      }
    })
  }
  return;

};