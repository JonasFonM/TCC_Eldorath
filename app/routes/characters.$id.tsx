/* eslint-disable @typescript-eslint/no-explicit-any */
import { json, LoaderFunction, } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/utils/prisma.server";
import { SkillCircle } from "~/components/skill-circle";
import { createStats } from "~/utils/character.server";
import { LineageCircle } from "~/components/lineage-circle";
import { LSrelations, trainingWithTier } from "~/utils/types.server";
import { TrainingCircle } from "~/components/training-circle";
import { character, charStats, lineage, path, skill } from "@prisma/client";

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
    },
  });

  const general_skills = await prisma.skill.findMany({
    where: {
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
      id: {in: character.trainings.map(training => training.id)},
    },
    include: { training: true }
  });

  let stats = await prisma.charStats.findUnique({
    where: { characterId: characterId }
  });

  if (!stats) {
    stats = await createStats({ skills, character, paths })
  }

  return json({ general_skills, trainingsWithTier, pureLineageSkills, nonPureLineageSkills, character, characterId, stats, lineages, isPure, paths });
};

export default function CharacterRoute() {
  const { character } = useLoaderData<{ character: character }>()
  const { general_skills, pureLineageSkills, nonPureLineageSkills, trainingsWithTier } = useLoaderData<{ general_skills: skill[], pureLineageSkills: LSrelations, nonPureLineageSkills: LSrelations, trainingsWithTier: trainingWithTier }>();
  const { lineages, isPure } = useLoaderData<{ lineages: lineage[], isPure: boolean }>();
  const { paths } = useLoaderData<{ paths: path[] }>();

  const { stats } = useLoaderData<{ stats: charStats }>()

  return (
    <main>
      <h2> {character.name}</h2>
      <div className="col-12">
        <h2>{paths.map(path => path.name)}</h2>
      </div>
      <div className="container">
        <div className="block">Level:{character.level}</div>
        <div className="block">Tier:{character.tier}</div>
      </div>

      <div className="container">
        <div className="block">Agility:{character.agility}</div>
        <div className="block">Body:{character.body}</div>
        <div className="block">Mind:{character.mind}</div>
      </div>
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
      <div className="col-6">
        <div className="skills-grid">
          {general_skills.map(skill => (
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
    </main>
  );

}