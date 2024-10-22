import { skill } from "@prisma/client";
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { SkillCircle } from "~/components/skill-circle";
import { requireUserId } from "~/utils/auth.server";
import { submitCharSkills } from "~/utils/character.server";
import { prisma } from "~/utils/prisma.server";
import { LSrelations } from "~/utils/types.server";


export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request)
  const characterId = Number(params.id)
  const character_lineages = await prisma.character_lineage.findMany({
    where: { characterId },
    include: { lineage: true }
  });

  const character = await prisma.character.findUnique({
    where: { id: characterId },
    include: { skills: true }
  });

  const maxSelectable = character?.pendingSkills;

  const stats = await prisma.charStats.findUnique({
    where: { characterId: characterId }
  });

  const general_skills = await prisma.skill.findMany({
    where: {
      lineages: { none: {} },
      agi: {
        lte: character?.agility
      },
      bdy: {
        lte: character?.body
      },
      mnd: {
        lte: character?.mind
      },
      lvl: {
        lte: character?.level
      },
      OR: [{
        trSiz: {
          lte: stats?.trueSize,
        },
        rlSiz: {
          lte: stats?.relativeSize,
        },
      },
      { trSiz: { lte: 0 } },
      { rlSiz: { lte: 0 } },
      ],
      AND: [{
        OR: [{
          prerequisiteId: { in: character?.skills.map(skill => skill.skillId) },
        },
        { prerequisiteId: null },
        ]
      }]

    },

  });

  const isPure = character_lineages.length === 1;

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

  return json({ userId, maxSelectable, general_skills, pureLineageSkills, nonPureLineageSkills, isPure });
}


export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData();
  const selectedSkills = form.getAll('skills') as string[];
  const pendingSkills = form.get('pendingSkills') as string;
  const selectedSkillIds = selectedSkills.map(id => parseInt(id))
  const characterId = params.id

  await submitCharSkills(selectedSkillIds, Number(characterId), Number(pendingSkills))
  await prisma.charStats.delete({
    where: { characterId: Number(characterId) }
  })
  return redirect(`/characters/${characterId}/`)
}

export default function SkillSelectionRoute() {
  const { maxSelectable, general_skills, nonPureLineageSkills, pureLineageSkills, isPure } = useLoaderData<{ maxSelectable: number, general_skills: skill[], pureLineageSkills: LSrelations, nonPureLineageSkills: LSrelations, isPure: boolean }>();
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);

  const isMaxSelected = selectedSkills.length >= maxSelectable;

  const handleSkillClick = (skillId: number) => {
    setSelectedSkills((prevSkills) => {
      const isSelected = prevSkills.includes(skillId);

      const newSelectedSkills = isSelected
        ? prevSkills.filter(id => id !== skillId)
        : [...prevSkills, skillId];

      return newSelectedSkills;
    });
  };

  return (
    <form method="post">
      <h1>Choose up to {maxSelectable} Skills</h1>
      <div className="pure-lineage-skills">
        {pureLineageSkills.map(ls => (
          <SkillCircle
            key={ls.skill.id}
            skill={ls.skill}
            isSelected={isPure}
            onClick={() => null}
            isPureLineage={true}
          />
        ))}
      </div>
      {isPure && pureLineageSkills.map(ls => (
        <input type="hidden" key={ls.skillId} name="skills" value={ls.skillId} />
      ))}

      <div className="nonpure-lineage-skills">
        {nonPureLineageSkills.map(ls => (
          <SkillCircle
            key={ls.skill.id}
            skill={ls.skill}
            isSelected={true}
            onClick={() => null}
            isPureLineage={false}
          />
        ))}
      </div>
      {nonPureLineageSkills.map(ls => (
        <input type="hidden" key={ls.skillId} name="skills" value={ls.skillId} />
      ))}

      <div className="skills-grid">
        {general_skills.map(skill => (
          <SkillCircle
            key={skill.id}
            skill={skill}
            isSelected={selectedSkills.includes(skill.id)}
            onClick={() => !isMaxSelected || selectedSkills.includes(skill.id) ? handleSkillClick(skill.id) : alert((`You can select up to ${maxSelectable} skills only.`))}
            isPureLineage={false}
          />
        ))}
      </div>
      {selectedSkills.map(skillId => (
        <input type="hidden" key={skillId} name="skills" value={skillId} />
      ))}
      <input type="hidden" key={maxSelectable} name="pendingSkills" value={maxSelectable} />

      <button type="submit" className="button">Submit Skills</button>
    </form>
  );
}