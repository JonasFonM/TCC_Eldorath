import { character_skill, character, skill } from "@prisma/client";
import { json, LoaderFunction } from "@remix-run/node";
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

export async function CharacterSkills({ skills, skill }: { skill: skill, skills: skill[] }) {
    const char_skills = await prisma.character_skill.findMany({
        where:{
            skillId: skill.id
        }
    })
    
    return (
        <div>
            <div>
                <h2>Skills</h2>
            </div>
            <div>
                {skills.map(skill => (
                    <SkillCircle key={skill.id} skill={skill} />
                ))}
            </div>
        </div>
    )

}


/*
 const char_skills = await prisma.character_skill.findMany({
        where: {
            skillId: skill.id,
            characterId: character.id
        },
        select: {
            skillId: true,
        },
    })

    const skills = await prisma.skill.findMany({
        where: {
            id: Number(char_skills)
        },
        select: {
            name: true
        },

    })

    return json(skills);
*/