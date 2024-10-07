/* eslint-disable @typescript-eslint/no-explicit-any */
import { json, LoaderFunction, } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
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
      <main>
        <div className="topnav">
          <NavLink to={`/characters/new/${characterId}/skills`}>Skills</NavLink>
          <NavLink to={`/characters/new/${characterId}/lineages`}>Lineages</NavLink>
          <NavLink to={`/characters/new/${characterId}/paths`}>Paths</NavLink>
          <NavLink to={`/characters/new/${characterId}/trainings`}>Trainings</NavLink>
          <NavLink to={`/characters/new/${characterId}/inventory`}>Items</NavLink>
        </div>

        <h2> {character.name}</h2>
        <div className="col-12">
          <h2>{paths.map(path => path.name)}</h2>
        </div>

        <h2>Progression</h2>

        <div className="container">
          <div className="block">Level:{character.level}</div>
          <div className="block">Tier:{character.tier}</div>
        </div>

        <h2>Attributes</h2>

        <div className="container">
          <div className="block">Agility:{character.agility}</div>
          <div className="block">Body:{character.body}</div>
          <div className="block">Mind:{character.mind}</div>
        </div>

        <h2>Stats</h2>

        <div className="container">
          <div className="block">Vitality:{stats.vitality}</div>
          <div className="block">Vigor:{stats.vigor}</div>
          <div className="block">Power:{stats.power}</div>
          <div className="block">Speed:{stats.speed}</div>
          <div className="block">Defense:{stats.defense}</div>
          <div className="block">Initiative:{stats.initiative}</div>
          <div className="block">Weight:{stats.baseWeight}</div>
          <div className="block">Carry Capacity:{stats.carryCap}</div>
          <div className="block">Lifting Capacity:{stats.liftCap}</div>
        </div>

        <h2>Resistances</h2>

        <h3>Physical Resistances</h3>

        <div className="container">
          <div className="block">Impact Damage Resistance:{resistances.impactRes}</div>
          <div className="block">Piercing Damage Resistance:{resistances.pierceRes}</div>
          <div className="block">Slashing Damage Resistance:{resistances.slashRes}</div>
        </div>

        <h3>Magical Resistances</h3>

        <div className="container">
          <div className="block">Acid Damage Resistance:{resistances.acidRes}</div>
          <div className="block">Cold Damage Resistance:{resistances.coldRes}</div>
          <div className="block">Fire Damage Resistance:{resistances.fireRes}</div>
          <div className="block">Lightning Damage Resistance:{resistances.lightningRes}</div>
          <div className="block">Arcane Damage Resistance:{resistances.arcaneRes}</div>
          <div className="block">Cosmic Damage Resistance:{resistances.cosmicRes}</div>
          <div className="block">Psychic Damage Resistance:{resistances.psychicRes}</div>
          <div className="block">Occult Damage Resistance:{resistances.occultRes}</div>
          <div className="block">Profane Damage Resistance:{resistances.profaneRes}</div>
          <div className="block">Sacred Damage Resistance:{resistances.sacredRes}</div>
        </div>

        <div className="col-6">
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
        </div>

        <div className="col-6">
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
        </div>

        <div className="col-6">
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
        </div>

        <div className="col-6">
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
        </div>

        <div className="col-12">
          <h2>Inventory</h2>
          <h3>Gold: {character.gold}</h3>
          <h3>Carried Weight: {weapons.map(weapons => weapons.weight).reduce((accumulator, currentValue) => accumulator + currentValue, 0)}/{stats.carryCap}</h3>
          <div className="col-6">
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
          </div>
          <div className="col-6">
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
          </div>
        </div>
      </main>
    </>
  );

}