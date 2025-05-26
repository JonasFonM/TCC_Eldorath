/* eslint-disable @typescript-eslint/no-explicit-any */
import { campaign, character, scene, user } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { Link, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import React, { useState } from "react";
import { DeleteConfirm } from "~/components/delete-confirmation";
import { GridMap } from "~/components/scene/grid-map";
import { useSidebar } from "~/components/context-providers/side-bar-context";
import { SideBars } from "~/components/context-providers/side-bars";
import { getUserIdFromSession } from "~/utils/auth.server";
import { prisma } from "~/utils/prisma.server";
import { GeneralExplain } from "~/components/explanations/general-explain";
import { useShowRow } from "~/components/context-providers/showRowContext";
import { CharacterPanel } from "~/components/character-panel";
import { TableHead } from "~/components/character-sheet/table-head";
import { TableData } from "~/components/character-sheet/table-data";
import { TableDropdown } from "~/components/character-sheet/table-dropdown";
import { CharacterMenu } from "~/components/scene/character-menu";

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
    const { scene, userId, availableChars } = useLoaderData<{ scene: scene & { campaign: campaign }, userId: number, availableChars: character[] }>();
    const { isAllOpen, isHeaderOpen, isTempOpen } = useSidebar();
    const isMaster = scene.campaign.masterId === userId;
    const { showRow, isShown } = useShowRow()


    const timeIcons = [
        "/Night.png",
        "/Dawn.png",
        "/Day.png",
        "/Dusk.png"
    ]

    function displayTimeIcon(i: number) {
        return timeIcons[i - 1]
    }
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
                        <img alt={"Dia"}
                            style={{ animation: 'fadeIn 0.3s ease-in-out', boxShadow: '0 0 2px 2px gold', transition: "fadeIn 0.3s ease-in-out", width: '100%' }}
                            src={displayTimeIcon(Number(scene.campaign.timeOfDay))} />
                        <li key={-1}>
                            <NavLink to={`/user/campaign/${scene.campaignId}`}>Campanha</NavLink>
                        </li>
                    </ul>
                }

            />



            <div className="user">

                <h1 className="title-input" style={{ position: 'sticky', top: '64px' }}>{scene.title}</h1>
                <div className="container">

                    {isMaster
                        ? <table>
                            <TableHead
                                onClick={() => showRow(`Chars`)}
                                tableTitles={['Personagens']}
                                open={isShown('Chars')}
                                error={false}
                            />
                        </table>
                        : null
                    }

                    {isMaster
                        ? availableChars.map(ac =>
                            <table key={`Char-${ac.id}`}>
                                <CharacterMenu
                                    onClick={() => showRow(`Char-${ac.id}`)}
                                    name={`${ac.name}`}
                                    vit={ac.currentVitality}
                                    maxVit={ac.vitality}
                                    vig={ac.currentVigor}
                                    maxVig={ac.vigor}
                                    pow={ac.currentPower}
                                    maxPow={ac.power}
                                    show={isShown(`Chars`)}
                                    selected={isShown(`Char-${ac.id}`)}
                                    error={false}
                                />

                            </table>)
                        : null
                    }

                </div>
                <Outlet />

            </div >


        </React.Fragment>
    )
}