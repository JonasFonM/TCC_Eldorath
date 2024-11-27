/* eslint-disable @typescript-eslint/no-explicit-any */
import { json, LoaderFunction, } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { prisma } from "~/utils/prisma.server";
import { createStats } from "~/utils/character.server";
import { LSrelations, trainingWithTier } from "~/utils/types.server";
import { armor, character, character_armor, character_weapon, charStats, lineage, path, resistances, skill, weapon } from "@prisma/client";
import { ResetConfirm } from "~/components/character-sheet/reset-confirm";
import { useState } from "react";


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

  const [selectReset, setReset] = useState<number>(0);

  const showReset = () => {
    setReset(() => {
      return character.id;
    });
  };

  const cancelReset = () => {
    setReset(() => {
      return 0
    });
  };

  return (
    <>
      <ul className="skillnav">


      <div className="header">

        <h1 id='name'>{character.name}</h1>

        <p id='path'> {paths && paths.length > 0 ? (paths.map(path => path.name)) : ("Sem Caminho")} </p>



        <div className="half">
          <h1>Level</h1>
        </div>
        <div className="half-2">
          <h1>{character.level}</h1>
        </div>

        <div className="half">
          <h1>Cat</h1>
        </div>
        <div className="half-2">
          <h1>{character.tier}</h1>
        </div>

        <div className="half">
          <h1>XP</h1>
        </div>
        <div className="half-2" >
          <h1>{character.experience}/{(character.level + 1) * 4 * character.tier}</h1>
        </div>

      </div>

        <li><NavLink to={`/user/character/${characterId}/stats/`}>Personagem</NavLink></li>
        <li><NavLink to={`/user/character/${characterId}/capabilities/`}>Capacidades</NavLink></li>
        <li><NavLink to={`/user/character/${characterId}/inventory/`}>Inventário</NavLink></li>
        <ResetConfirm name={character.name} isHidden={selectReset === 0} onShow={showReset} onCancel={cancelReset} id={String(character.id)} />

      </ul>

      <div className="character-sheet">
        <Outlet context={{ character, stats, resistances, skills, trainingsWithTier, paths, lineages, pureLineageSkills, nonPureLineageSkills, isPure, weapons, armors }} />
      </div >
    </>
  );

}