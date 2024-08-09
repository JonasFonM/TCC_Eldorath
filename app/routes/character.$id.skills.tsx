import { character_skill, character, skill } from "@prisma/client";
import { json, LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { SkillCircle } from "~/components/skill-circle";
import { prisma } from "~/utils/prisma.server";


export const loader: LoaderFunction = async ({ params }) => {
    const characterId = params.id;
    const character = await prisma.character.findUnique({
        where: {
            id: Number(characterId),
        },
    });

    return json(character);
};

export async function CharacterSkills() {
    const character = useLoaderData<character>()
    
    const char_skill = await prisma.character.findUnique({
        relationLoadStrategy: 'join',
        where:{
            id: character.id
        },
        include: {
          skills: true,
        },            
      })
    
    const searchId = char_skill?.skills.map(skill => skill.skillId)
    
    const skills = await prisma.skill.findMany({
        where:{
            id: Number(searchId)
        }
    })

    return json(skills)
}

export function ListCharacterSkills({ skills }: { skills: skill[] }) {
    
}