/* eslint-disable @typescript-eslint/no-explicit-any */
import { campaign, scene, user } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import React, { useState } from "react";
import { DeleteConfirm } from "~/components/delete-confirmation";
import { GridMap } from "~/components/scene/grid-map";
import { useSidebar } from "~/components/side-bars/side-bar-context";
import { SideBars } from "~/components/side-bars/side-bars";
import { getUserIdFromSession } from "~/utils/auth.server";
import { prisma } from "~/utils/prisma.server";

export const loader: LoaderFunction = async ({ params, request }) => {

    const userId = await getUserIdFromSession(request)

    const sceneId = Number(params.id);

    const scene = await prisma.scene.findUnique({
        where: { id: sceneId },
        include: { campaign: true }
    });

    const availableChars = await prisma.character.findMany(
        {
            where: {
                campaignId: Number(scene?.campaignId)
            }
        }
    )


    if (!scene) {
        throw new Response("Cena não encontrada", { status: 404 });
    }

    return ({ scene, availableChars, userId });
};

export default function SceneRoute() {
    const { scene, userId } = useLoaderData<{ scene: scene & { campaign: campaign }, userId: number }>();
    const [selectedDelete, setSelectedDelete] = useState<number>(0);
    const { isAllOpen, isHeaderOpen, isTempOpen } = useSidebar();
    const isMaster = scene.campaign.masterId === userId;

    return (
        <React.Fragment>

            <SideBars
                entity={scene}
                title={scene.title}
                subtitle={scene.campaign.title}
                tableHeaders={["Mês", "Dia", "Fase"]}
                tableDatas={[scene.month, scene.monthDay, scene.timeOfDay]}
                tableExplain={[
                    "Cada mês em Eldorath é carregado de simbologia e ligado às tradições e fenômenos que ocorrem no seu decorrer.",
                    "Uma semana em Eldorath tem 6 Dias. Os dias da semana são nomeados em honra a divindades e forças ancestrais.",
                    "Um Dia em Eldorath é separado em Fases: A Madrugada que se inicia à meia-noite, a Alvorada, às 6 horas da manhã, a Tarde, ao meio-dia e a Noite, às 18 horas."
                ]}

                links={[]}
                linkNames={[]}
                temp={
                    <ul>
                        <li key={-1}>
                            <NavLink to={`/user/campaign/${scene.campaignId}`}>Campanha</NavLink>
                        </li>
                    </ul>
                }

            />



            <div className="user" style={isAllOpen ? { marginLeft: '200px', marginRight: '200px' } : isHeaderOpen ?
                { marginLeft: '200px' } : isTempOpen ? { marginRight: '200px' } : {}}>

                <h1>{scene.title}</h1>

                <GridMap onClick={() => null} rows={10} columns={10} />

                <Outlet />

            </div >


        </React.Fragment>
    )
}