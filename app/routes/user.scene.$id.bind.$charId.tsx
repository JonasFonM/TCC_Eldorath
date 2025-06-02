/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect, LoaderFunction } from "@remix-run/node";
import { addSingleCharacterToScene } from "~/utils/campaign.server";
import { prisma } from "~/utils/prisma.server";

export const loader: LoaderFunction = async ({ params }) => {

    //FETCHING DATA
    const sceneId = Number(params.id);

    const scene = await prisma.scene.findUnique({
        where: { id: sceneId },
    });

    if (!scene) {
        throw new Response("Cena não encontrada", { status: 404 });
    }

    const characterId = Number(params.charId)

    //SERVER

    await addSingleCharacterToScene(characterId, sceneId)

    return redirect(`/user/scene/${String(sceneId)}`);
};