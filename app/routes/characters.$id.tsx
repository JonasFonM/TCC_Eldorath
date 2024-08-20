/* eslint-disable @typescript-eslint/no-explicit-any */
import { json, LoaderFunction, } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/utils/prisma.server";
import { character, charStats, skill } from '@prisma/client'
import { SkillCircle } from "~/components/skill-circle";
import { createStats } from "~/utils/character.server";

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
  
  let stats = await prisma.charStats.findUnique({
    where: {characterId: characterId}
  });

  if(!stats){
    stats = await createStats({skills, character})
  }

  return json({ skills, character, characterId, stats });
};

export default function CharacterRoute() {
  const { character } = useLoaderData<{character: character}>()
  const { skills } = useLoaderData<{ skills: skill[] }>();
  const { stats } = useLoaderData<{stats: charStats}>()

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
            {skills.map(skill => (        
                <SkillCircle key={skill.id} skill={skill} isSelected={false}
                onClick={()=> null} />
                ))}
      </div>
    </main>
  );
  
}