/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect, LoaderFunction } from "@remix-run/node";
import { prisma } from "~/utils/prisma.server";

export const loader: LoaderFunction = async ({ params }) => {

    //FETCHING DATA
    const sceneId = Number(params.id);

    const scene = await prisma.scene.findUnique({
        where: { id: sceneId },
    });

    const campaignId = String(scene?.campaignId)

    if (!scene) {
        throw new Response("Cena não encontrada", { status: 404 });
    }

    //DELETES


    await prisma.characterScene.deleteMany({
        where: {
            sceneId: sceneId
        }
    });

    await prisma.scene.delete({
        where: { id: sceneId },
    });


    return redirect(`/user/campaign/${campaignId}`);
};