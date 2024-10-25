/* eslint-disable @typescript-eslint/no-explicit-any */
import { json, LoaderFunction, } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { prisma } from "~/utils/prisma.server";
import { createStats } from "~/utils/character.server";
import { LSrelations, trainingWithTier } from "~/utils/types.server";
import { armor, character, character_armor, character_weapon, charStats, lineage, path, resistances, skill, weapon } from "@prisma/client";


export const loader: LoaderFunction = async ({ params }) => {
  const characterId = Number(params.id);

  const character = await prisma.character.findUnique({
    where: { id: characterId },
    include: { skills: true, lineages: true, paths: true, trainings: true },
  });

  const character_lineages = await prisma.character_lineage.findMany({
    where: { characterId },
    include: { lineage: true }
  });

  const isPure = character_lineages.length === 1;


  if (!character) {
    return json({ skills: [], lineages: [] });
  }

  const skills = await prisma.skill.findMany({
    where: {
      id: { in: character.skills.map(skill => skill.skillId) },
      lineages: { none: {} },
    },
  });

  const pureLineageSkills = await prisma.lineage_skill.findMany({
    where: {
      lineageId: { in: character_lineages.map(cl => cl.lineageId) },
      pureSkill: true
    },
    include: { skill: true },
  });

  const nonPureLineageSkills = await prisma.lineage_skill.findMany({
    where: {
      lineageId: { in: character_lineages.map(cl => cl.lineageId) },
      pureSkill: false
    },
    include: { skill: true },
  });

  const lineages = await prisma.lineage.findMany({
    where: {
      id: { in: character.lineages.map(lineage => lineage.lineageId) },
    },
  });

  const paths = await prisma.path.findMany({
    where: {
      id: { in: character.paths.map(path => path.pathId) },
    }
  });


  const trainingsWithTier = await prisma.character_training.findMany({
    where: {
      id: { in: character.trainings.map(training => training.id) },
    },
    include: { training: true }
  });

  let stats = await prisma.charStats.findUnique({
    where: { characterId: characterId }
  });

  if (!stats) {
    stats = await createStats({ skills, character, paths })
  }

  const resistances = await prisma.resistances.findUnique({
    where: {
      id: stats?.resistanceId
    }
  })

  const weapons = await prisma.character_weapon.findMany({
    where: {
      characterId: characterId
    },
    include: { weapon: true }
  })

  const armors = await prisma.character_armor.findMany({
    where: {
      characterId: characterId
    },
    include: { armor: true }
  })

  return json({ skills, trainingsWithTier, pureLineageSkills, nonPureLineageSkills, character, characterId, stats, lineages, isPure, paths, resistances, weapons, armors });
};

export default function CharacterRoute() {
  const { character, characterId } = useLoaderData<{ character: character, characterId: string }>()
  const { skills, pureLineageSkills, nonPureLineageSkills, trainingsWithTier } = useLoaderData<{ skills: skill[], pureLineageSkills: LSrelations, nonPureLineageSkills: LSrelations, trainingsWithTier: trainingWithTier }>();
  const { lineages, isPure } = useLoaderData<{ lineages: lineage[], isPure: boolean }>();
  const { weapons, armors } = useLoaderData<{ weapons: (character_weapon & { weapon: weapon })[], armors: (character_armor & { armor: armor })[] }>();
  const { paths } = useLoaderData<{ paths: path[] }>();

  const { stats, resistances } = useLoaderData<{ stats: charStats; resistances: resistances }>()

  return (
    <>
      <ul className="charnav">
      <h1>{character.name}</h1>
      <h2>{paths.map(path => path.name)}</h2>

        <li><NavLink to={`/character/${characterId}`}>Character</NavLink></li>
        <li><NavLink to={`/character/${characterId}/capabilities`}>Capabilities</NavLink></li>
        <li><NavLink to={`/character/${characterId}/inventory`}>Inventory</NavLink></li>
      </ul>

      <main style={{marginTop: '164px'}}>
        <Outlet context={{ character, stats, resistances, skills, trainingsWithTier, paths, lineages, pureLineageSkills, nonPureLineageSkills, isPure, weapons, armors }} />
        </main >
    </>
  );

}