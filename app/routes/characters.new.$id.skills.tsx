import { lineage_skill, skill } from "@prisma/client";
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { SkillCircle } from "~/components/skill-circle";
import { requireUserId } from "~/utils/auth.server";
import { submitCharSkills } from "~/utils/character.server";
import { prisma } from "~/utils/prisma.server";


export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request)
  const characterId = Number(params.id)
  const character_lineages = await prisma.character_lineage.findMany({
    where: { characterId },
    include: { lineage: true }
  });

  const general_skills = await prisma.skill.findMany({
    where: {
      lineages: { none: {} },
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

  return json({ userId, general_skills, pureLineageSkills, nonPureLineageSkills, isPure });
}


export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData();
  const selectedSkills = form.getAll('skills') as string[];
  const selectedSkillIds = selectedSkills.map(id => parseInt(id))
  const characterId = params.id

  await submitCharSkills(selectedSkillIds, Number(characterId))

  return redirect(`/characters/new/${characterId}/`)
}

type LSrelations = (lineage_skill & { skill: skill })[];

export default function SkillSelectionRoute() {
  const { general_skills, nonPureLineageSkills, pureLineageSkills, isPure } = useLoaderData<{ general_skills: skill[], pureLineageSkills: LSrelations, nonPureLineageSkills: LSrelations, isPure: boolean }>();
  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);


  const handleSkillClick = (skillId: number) => {
    setSelectedSkills(prevSkills => {
      if (prevSkills.includes(skillId)) {
        return prevSkills.filter(id => id !== skillId);
      } else {
        return [...prevSkills, skillId];
      }
    });
  };

  return (
    <form method="post">
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
            onClick={() => handleSkillClick(skill.id)}
            isPureLineage={false}
          />
        ))}
      </div>
      {selectedSkills.map(skillId => (
        <input type="hidden" key={skillId} name="skills" value={skillId} />
      ))}
      <button type="submit" className="submit-button">Submit Skills</button>
    </form>
  );
}