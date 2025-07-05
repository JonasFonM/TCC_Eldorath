/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoaderFunction, } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData, useLocation } from "@remix-run/react";
import { prisma } from "~/utils/prisma.server";
import { character, character_item, lineage, path, skill, item, lineage_skill, user } from "@prisma/client";
import React, { useEffect, useRef, useState } from "react";

import { SideBars } from "~/components/context-providers/side-bars";
import { useSidebar } from "~/components/context-providers/side-bar-context";
import { getUserIdFromSession } from "~/utils/auth.server";
import { ResourceBar } from "~/components/scene/resource-bar";
import { UserPanel } from "~/components/user-panel";


export const loader: LoaderFunction = async ({ params, request }) => {
  const characterId = Number(params.id);
  const userId = await getUserIdFromSession(request)

  const character = await prisma.character.findUnique({
    where: { id: characterId },
    include: { skills: true, lineages: true, paths: true },
  });

  const isAuthor = Number(userId) === Number(character?.authorId)

  const author = await prisma.user.findUnique({
    where: { id: Number(character?.authorId) }
  })

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

  return ({ userId, isAuthor, author, skills, pureLineageSkills, nonPureLineageSkills, character, characterId, lineages, isPure, paths, items });
};

export default function CharacterRoute() {
  const { author, isAuthor, character, characterId,
    skills, pureLineageSkills, nonPureLineageSkills,
    lineages, isPure, items, paths }
    =
    useLoaderData<{
      author: user, isAuthor: boolean, character: character, characterId: string,
      skills: skill[], pureLineageSkills: (lineage_skill & { skill: skill, lineage: lineage })[],
      nonPureLineageSkills: (lineage_skill & { skill: skill, lineage: lineage })[],
      lineages: lineage[], isPure: boolean, items: (character_item & { item: item })[], paths: path[]
    }>()
  const { isAllOpen, isHeaderOpen, isTempOpen } = useSidebar();

  const subtitle = paths.length > 0 ? String(paths.map(p => p.name)) : "Sem Caminho"

  const getStyle = () => {
    if (isAllOpen) {
      return { marginLeft: '20VW', marginRight: '20VW' }
    }
    if (isHeaderOpen) {
      return { marginRight: '20VW' }
    }
    if (isTempOpen) {
      return { marginLeft: '20VW' }
    }

  }

  const rollDice = (sides: number) => Math.floor(Math.random() * sides) + 1;


  const [logs, setLogs] = useState<string[]>([]);

  const logEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = logEndRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [logs]);


  const handleRollDice = (amount: number, diceType: number, attributeName: string, attributeMod: number) => {
    const result = (rollDice(diceType) * amount);
    const newLog = (`${character.name} rolou: ${result + attributeMod} (${amount}d${diceType} + ${attributeMod}) em um Teste de ${attributeName}`);
    setLogs((prevLogs) => [...prevLogs, newLog]);
  };

  const clearLog = () => {
    setLogs([])
  }

  const links = [
    `/user/character/${characterId}/stats/`,
    `/user/character/${characterId}/lineages/`,
    `/user/character/${characterId}/paths/`,
    `/user/character/${characterId}/skills/`,
    `/user/character/${characterId}/inventory/`,
  ]

  const linkNames = ['Atributos',
    'Linhagens',
    'Caminhos',
    'Talentos',
    'Inventário'
  ]

  const getLinks = () => {
    const visibleLinks = links

    if (isAuthor && character.public) visibleLinks.push(`/privatize/character/${characterId}/`);

    if (isAuthor && !character.public) visibleLinks.push(`/publish/character/${characterId}/`);

    if (character.campaignId) visibleLinks.push(`/user/campaign/${character.campaignId}/`);

    return visibleLinks;
  }

  const getLinkNames = () => {
    const visibleLinkNames = linkNames

    if (isAuthor && character.public) visibleLinkNames.push(`Tornar Privado`);

    if (isAuthor && !character.public) visibleLinkNames.push(`Tornar Público`);

    if (character.campaignId) visibleLinkNames.push(`Campanha`);

    return visibleLinkNames;
  }

  return (
    <>
      <SideBars
        entity={character}
        title={character.name}
        subtitle={character.public ? 'Público' : 'Privado'}
        tableHeaders={[]}
        tableDatas={[]}
        tableExplain={[]}
        links={getLinks()}
        linkNames={getLinkNames()}
        temp={
          isAuthor
            ? <React.Fragment>

              <div style={{ maxHeight: '92vh', overflowY: 'auto', paddingBottom: '10px' }} ref={logEndRef}>
                <h1 key={'title'}>Log</h1>

                <h3 key={'subtitle'}>Resultados</h3>

                <ul style={{ paddingBottom: '10px', marginBottom: '10px' }}>
                  {logs.map((log, index) => (
                    <li key={index}>
                      <p style={{ lineHeight: '1rem', marginTop: '10px', marginBottom: '10px', fontVariant: 'initial' }}>
                        {log}
                      </p>
                    </li>
                  ))}

                  <li key={'limpar'}><button type="button" onClick={clearLog}>Limpar Log</button></li>

                </ul>
              </div>

            </React.Fragment>
            : <>
              <h3>Criado por:</h3>
              <UserPanel users={[author]} />
            </>
        }
        footer={null}

      />

      <div className="user" style={getStyle()}>
        <Outlet context={{
          characterId, isAuthor,
          character, skills, paths,
          lineages, pureLineageSkills, nonPureLineageSkills, isPure, items, handleRollDice
        }} />
      </div >
    </>

  );

}