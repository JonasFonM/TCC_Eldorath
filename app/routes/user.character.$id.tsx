/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoaderFunction, } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData, useLocation } from "@remix-run/react";
import { prisma } from "~/utils/prisma.server";
import { character, character_item, lineage, path, skill, item, lineage_skill } from "@prisma/client";
import React, { useState } from "react";

import { SideBars } from "~/components/context-providers/side-bars";
import { useSidebar } from "~/components/context-providers/side-bar-context";
import { getUserIdFromSession } from "~/utils/auth.server";
import { ResourceBar } from "~/components/scene/resource-bar";


export const loader: LoaderFunction = async ({ params, request }) => {
  const characterId = Number(params.id);
  const userId = await getUserIdFromSession(request)

  const character = await prisma.character.findUnique({
    where: { id: characterId },
    include: { skills: true, lineages: true, paths: true },
  });

  const isAuthor = Number(userId) === Number(character?.authorId)

  const character_lineages = await prisma.character_lineage.findMany({
    where: { characterId },
    include: { lineage: true }
  });

  const isPure = character_lineages.length === 1;


  if (!character) {
    return ({ skills: [], lineages: [] });
  }

  const skills = await prisma.skill.findMany({
    where: {
      id: { in: character.skills.map(skill => skill.skillId) },
      lineages: { none: {} },
    },
  });

  const pureLineageSkills = await prisma.lineage_skill.findMany({
    where: {
      skillId: { in: character?.skills.map(skill => skill.skillId) },
      lineageId: { in: character_lineages.map(cl => cl.lineageId) },
      pureSkill: true
    },
    include: { skill: true, lineage: true },
  });

  const nonPureLineageSkills = await prisma.lineage_skill.findMany({
    where: {
      skillId: { in: character?.skills.map(skill => skill.skillId) },
      lineageId: { in: character_lineages.map(cl => cl.lineageId) },
      pureSkill: false
    },
    include: { skill: true, lineage: true },
  });

  const lineages = await prisma.lineage.findMany({
    where: {
      id: { in: character.lineages.map(lineage => lineage.lineageId) },
    },
  });

  const paths = await prisma.path.findMany({
    where: {
      id: { in: character.paths.map(path => path.pathId) },
    },
    orderBy: { pathTier: 'desc' }
  });


  const items = await prisma.character_item.findMany({
    where: {
      characterId: characterId
    },
    include: { item: true }
  })

  return ({ userId, isAuthor, skills, pureLineageSkills, nonPureLineageSkills, character, characterId, lineages, isPure, paths, items });
};

export default function CharacterRoute() {
  const { isAuthor, character, characterId,
    skills, pureLineageSkills, nonPureLineageSkills,
    lineages, isPure, items, paths }
    =
    useLoaderData<{
      isAuthor: boolean, character: character, characterId: string,
      skills: skill[], pureLineageSkills: (lineage_skill & { skill: skill, lineage: lineage })[],
      nonPureLineageSkills: (lineage_skill & { skill: skill, lineage: lineage })[],
      lineages: lineage[], isPure: boolean, items: (character_item & { item: item })[], paths: path[]
    }>()
  const { isAllOpen, isHeaderOpen, isTempOpen, isFooterOpen } = useSidebar();

  const subtitle = paths.length > 0 ? String(paths.map(p => p.name)) : "Sem Caminho"

  const getStyle = () => {
    if (isAllOpen) {
      return { marginLeft: '200px', marginRight: '200px' }
    }
    if (isHeaderOpen) {
      return { marginLeft: '200px' }
    }
    if (isTempOpen) {
      return { marginRight: '200px' }
    }

  }

  return (
    <>
      <SideBars
        entity={character} title={character.name}
        subtitle={subtitle}
        tableHeaders={["NV", "CT", "XP", "DK"]}
        tableDatas={[character.level, character.tier, character.experience, character.gold]}
        tableExplain={[
          "Seu Nível é um indicador geral de quão poderoso você é no momento. Você sobe de nível conforme ganha Experiência.",
          "Sua Categoria representa em qual patamar da sua jornada você está. Ela determina quais Caminhos você pode seguir. Você começa na categoria Iniciante e progride para Profissional, Mestre e Lendário, nesta sequência.",
          "Seus Pontos de Experiência determinam quando você pode subir de nível. Você pode receber Experiência de várias formas, como derrotar inimigos, ou passar por um treinamento árduo.",
          "Drakas são a moeda corrente principal em Eldorath. Cunhadas a partir de uma liga metálica especial chamada Orivélio, resistente ao desgaste e capaz de manter seu brilho por séculos. O nome vem das antigas tradições do Império de Zarethia, onde os primeiros imperadores usavam escamas de dragão como lastro para suas riquezas.",
        ]}
        links={[
          `/user/character/${characterId}/stats/`,
          `/user/character/${characterId}/lineages/`,
          `/user/character/${characterId}/paths/`,
          `/user/character/${characterId}/skills/`,
          `/user/character/${characterId}/inventory/`

        ]}

        linkNames={[
          'Personagem',
          'Linhagens',
          'Caminhos',
          'Talentos',
          'Inventário'
        ]}
        temp={
          <React.Fragment>

            <ul>
              <li key={1}>
                <NavLink to={
                  character.campaignId ?
                    `/user/campaign/${character.campaignId}/`
                    :
                    `/user/home/profile`}
                >Campanha</NavLink>
              </li>

            </ul>
          </React.Fragment>
        }
        footer={
          <div style={{ margin: '2%' }}>
            <ResourceBar
              color="darkred"
              halvedColor="red"
              currentValue={character.currentVitality}
              maxValue={character.vitality}
            />
            <ResourceBar
              color="darkgreen"
              halvedColor="green"
              currentValue={character.currentVigor}
              maxValue={character.vigor}
            />
            <ResourceBar
              color="darkcyan"
              halvedColor="cyan"
              currentValue={character.currentPower}
              maxValue={character.power}
            />
          </div>
        }

      />

      <div className="user" style={getStyle()}>
        <Outlet context={{
          characterId, isAuthor,
          character, skills, paths,
          lineages, pureLineageSkills, nonPureLineageSkills, isPure, items
        }} />
      </div >
    </>

  );

}