import { skill } from "@prisma/client";
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { SkillCircle } from "~/components/skill-circle";
import { requireUserId } from "~/utils/auth.server";
import { submitCharSkills } from "~/utils/character.server";
import { prisma } from "~/utils/prisma.server";


export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request)
  const skills = await prisma.skill.findMany()
  return json({ userId, skills });
}

export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData();
  const selectedSkills = form.getAll('skills') as string[];
  const selectedSkillIds = selectedSkills.map(id => parseInt(id))
  const characterId = params.id

  await submitCharSkills(selectedSkillIds, Number(characterId))

  return redirect(`/characters/new/${characterId}/`)
}

export default function SkillSelectionRoute() {
  const { skills } = useLoaderData<{ skills: skill[] }>();
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
      <div className="skills-grid">
        {skills.map(skill => (
          <SkillCircle
            key={skill.id}
            skill={skill}
            isSelected={selectedSkills.includes(skill.id)}
            onClick={() => handleSkillClick(skill.id)}
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