/* eslint-disable @typescript-eslint/no-explicit-any */
import {  redirect, LoaderFunction } from "@remix-run/node";
import { prisma } from "~/utils/prisma.server";

export const loader: LoaderFunction = async ({ params }) => {
    const characterId = Number(params.id);

    const character = await prisma.character.findUnique({
        where: { id: characterId },
    });

    if (!character) {
        throw new Response("Character not found", { status: 404 });
    }

    await prisma.character_armor.deleteMany({
        where: { characterId: characterId },
    });
    await prisma.character_weapon.deleteMany({
        where: { characterId: characterId },
    });
    await prisma.character_lineage.deleteMany({
        where: { characterId: characterId },
    });
    await prisma.character_skill.deleteMany({
        where: { characterId: characterId },
    });
    await prisma.character_training.deleteMany({
        where: { characterId: characterId },
    });
    await prisma.character_path.deleteMany({
        where: { characterId: characterId },
    });
    await prisma.charStats.deleteMany({
        where: { characterId: characterId },
    });
    

    await prisma.character.delete({
        where: { id: characterId },
    });

    return redirect('/characters');
};