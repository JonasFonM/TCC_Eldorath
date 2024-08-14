/* eslint-disable @typescript-eslint/no-explicit-any */
import { json, LoaderFunction, } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/utils/prisma.server";
import { character, skill } from '@prisma/client'
import { SkillCircle } from "~/components/skill-circle";

export const loader: LoaderFunction = async ({ params }) => {
  const characterId = Number(params.id);
  const character = await prisma.character.findUnique({
      where: { id: characterId },
      include: { skills: true },
  });

  if (!character) {
      return json({ skills: [] });
  }

  const skills = await prisma.skill.findMany({
      where: {
          id: { in: character.skills.map(skill => skill.skillId) },
      },
  });

  return json({ skills, character });
};

export default function CharacterRoute() {
  const { character } = useLoaderData<{character: character}>()
  const { skills } = useLoaderData<{ skills: skill[] }>();

  return (
    <main>
      <h2> {character.name}</h2>
      
      <div className="container">
        <div className="block">Level:{character.level}</div>
        <div className="block">Tier:{character.tier}</div>
      </div>

      <div className="container">
        <div className="block">Agility:{character.agility}</div>
        <div className="block">Body:{character.body}</div>
        <div className="block">Mind:{character.mind}</div>
        
      </div>
      <div className="block">
            {skills.map(skill => (
                <SkillCircle key={skill.id} skill={skill} />
            ))}
        </div>     
    </main>
  );
}