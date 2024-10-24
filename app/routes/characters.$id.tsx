/* eslint-disable @typescript-eslint/no-explicit-any */
import { json, LoaderFunction, } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { prisma } from "~/utils/prisma.server";
import { SkillCircle } from "~/components/skill-circle";
import { createStats } from "~/utils/character.server";
import { LineageCircle } from "~/components/lineage-circle";
import { LSrelations, trainingWithTier } from "~/utils/types.server";
import { TrainingCircle } from "~/components/training-circle";
import { armor, character, character_armor, character_weapon, charStats, lineage, path, resistances, skill, weapon } from "@prisma/client";
import { PathCircle } from "~/components/path-circle";
import { CharacterWeaponCircle } from "~/components/c-weapon-circle";
import { CharacterArmorCircle } from "~/components/c-armor-circle";

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
        <li><NavLink to={`/characters/${characterId}`}>Character</NavLink></li>
        <li><NavLink to={`/characters/new/${characterId}/lineages`}>Lineages</NavLink></li>
        <li><NavLink to={`/characters/${characterId}/skills`}>Skills</NavLink></li>
        <li><NavLink to={`/characters/new/${characterId}/paths`}>Paths</NavLink></li>
        <li><NavLink to={`/characters/new/${characterId}/trainings`}>Trainings</NavLink></li>
        <li><NavLink to={`/characters/new/${characterId}/inventory`}>Items</NavLink></li>
      </ul>

      <main>

        <h1>{character.name}</h1>

        <h2>{paths.map(path => path.name)}</h2>

        <Outlet context={{ character, stats, resistances }} />

        <h2>Skills</h2>
        <div className="skills-grid">
          {skills.map(skill => (
            <SkillCircle
              key={skill.id}
              skill={skill}
              isSelected={false}
              onClick={() => null}
              isPureLineage={false}
            />
          ))}
        </div>

        <h2>Lineages</h2>
        {lineages.map(lineage => (
          <LineageCircle key={lineage.id} lineage={lineage} isSelected={false}
            onClick={() => null} />
        ))}
        {isPure ? <div className="pure-lineage-skills">
          {pureLineageSkills.map(ls => (
            <SkillCircle
              key={ls.skill.id}
              skill={ls.skill}
              isSelected={false}
              onClick={() => null}
              isPureLineage={true}
            />
          ))}
        </div> : null}

        <div className="nonpure-lineage-skills">
          {nonPureLineageSkills.map(ls => (
            <SkillCircle
              key={ls.skill.id}
              skill={ls.skill}
              isSelected={false}
              onClick={() => null}
              isPureLineage={false}
            />
          ))}
        </div>

        <h2>Paths</h2>
        <div className="trainings-grid">
          {paths.map(pa => (
            <PathCircle
              key={pa.id}
              path={pa}
              isSelected={false}
              onClick={() => null}
            />
          ))}
        </div>

        <h2>Trainings</h2>
        <div className="trainings-grid">
          {trainingsWithTier.map(tt => (
            <TrainingCircle
              key={tt.training.id}
              training={tt.training}
              isSelected={false}
              onClick={() => null}
            />
          ))}
        </div>

        <h2>Inventory</h2>
        <h3>Gold: {character.gold}</h3>
        <h3>Carried Weight: {weapons.map(weapons => weapons.weight).reduce((accumulator, currentValue) => accumulator + currentValue, 0)}/{stats.carryCap}</h3>
        <h2>Weapons</h2>
        <div className="weapons-grid">
          {weapons.map(weapon => (
            <CharacterWeaponCircle
              key={weapon.id}
              weapon={weapon}
              isSelected={false}
              onClick={() => null}
            />
          ))}
        </div>
        <h2>Armors</h2>
        <div className="armors-grid">
          {armors.map(armor => (
            <CharacterArmorCircle
              key={armor.id}
              armor={armor}
              isSelected={false}
              onClick={() => null}
            />
          ))}
        </div>
      </main >
    </>
  );

}