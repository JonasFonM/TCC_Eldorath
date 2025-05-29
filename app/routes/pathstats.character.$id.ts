


/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect, LoaderFunction } from "@remix-run/node";
import { addPathBasedSkills, addPathBasedStats,  prepareCharacterStats } from "~/utils/character.server";
import { prisma } from "~/utils/prisma.server";

export const loader: LoaderFunction = async ({ params }) => {
    const characterId = Number(params.id);

    const character = await prisma.character.findUnique({
        where: { id: characterId },
        include: { paths: true },
    });

    const paths = await prisma.path.findMany({
        where: {
            id: { in: character?.paths.map(path => path.pathId) },
        },
        orderBy: { pathTier: 'desc' }
    });

    await prepareCharacterStats(characterId)

    paths.map(p => addPathBasedSkills(characterId, p.id))
    paths.map(p => addPathBasedStats(characterId, p.id))

    return redirect(`/user/character/${characterId}/stats/`);
};