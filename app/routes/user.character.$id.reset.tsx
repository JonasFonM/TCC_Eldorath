/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect, LoaderFunction } from "@remix-run/node";
import { getUserIdFromSession } from "~/utils/auth.server";
import { prisma } from "~/utils/prisma.server";

export const loader: LoaderFunction = async ({ params, request }) => {
    const characterId = Number(params.id);
    const userId = Number(getUserIdFromSession(request))
    const character = await prisma.character.findUnique({
        where: { id: characterId },
    });
    const isAuthor = userId === Number(character?.authorId)
    const referer = request.headers.get("Referer") || "/"; // Fallback to "/" if no referer

    if (!character) {
        throw new Response("Personagem não encontrado", { status: 404 });
    }

    await prisma.character_item.deleteMany({
        where: { characterId: characterId },
    });
    await prisma.character_lineage.deleteMany({
        where: { characterId: characterId },
    });
    await prisma.character_skill.deleteMany({
        where: { characterId: characterId },
    });
    await prisma.character_path.deleteMany({
        where: { characterId: characterId },
    });
    await prisma.character.update({
        where: { id: characterId },
        data: {
            level: 1,
            tier: 1,
            agility: 1,
            body: 1,
            mind: 1,
            vitality: 1,
            currentVitality: 1,
            vigor: 1,
            currentVigor: 1,
            power: 1,
            currentPower: 1,
            experience: 0,
            pendingLineages: 2,
            pendingPath: 1,
            pendingSkills: 2,
            acidRes: 0,
            arcaneRes: 0,
            coldRes: 0,
            cosmicRes: 0,
            fireRes: 0,
            fullRes: 0,
            impactRes: 0,
            lightningRes: 0,
            pierceRes: 0,
            profaneRes: 0,
            psychicRes: 0,
            sacredRes: 0,
            slashRes: 0,
            gold: 500,
            carryCap: 10,
            liftCap: 15,
            baseWeight: 10
        }
    });

    return redirect(referer);
};