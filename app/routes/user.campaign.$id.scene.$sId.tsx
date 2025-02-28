/* eslint-disable @typescript-eslint/no-explicit-any */
import { campaign, scene } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { DeleteConfirm } from "~/components/delete-confirmation";
import { prisma } from "~/utils/prisma.server";

export const loader: LoaderFunction = async ({ params }) => {

    //FETCHING DATA
    const campaignId = Number(params.id);
    const sceneId = Number(params.sId);

    const campaign = await prisma.campaign.findUnique({
        where: { id: campaignId },
    });

    const scene = await prisma.scene.findUnique({
        where: { id: sceneId },
    });

    const availableChars = await prisma.character.findMany(
        {
            where: {
                campaignId: campaignId
            }
        }
    )

    if (!campaign) {
        throw new Response("Campanha não encontrada", { status: 404 });
    }

    if (!scene) {
        throw new Response("Cena não encontrada", { status: 404 });
    }

    return ({ scene, campaign, availableChars });
};

export default function SceneRoute() {
    const { scene } = useLoaderData<{ scene: scene, campaign: campaign }>();
    const [selectedDelete, setSelectedDelete] = useState<number>(0);

    return (
        <div>
            <div className="title-container">
                <h1>{scene.title}</h1>
                <DeleteConfirm key={scene.id} id={String(scene.id)} name={scene.title} entity={'scene'} isHidden={selectedDelete != scene.id} onShow={() => setSelectedDelete(scene.id)} onCancel={() => setSelectedDelete(0)} />
            </div>
        </div>
    )
}