/* eslint-disable @typescript-eslint/no-explicit-any */
import { campaign, character, scene } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import React, { } from "react";
import { useSidebar } from "~/components/context-providers/side-bar-context";
import { SideBars } from "~/components/context-providers/side-bars";
import { getUserIdFromSession } from "~/utils/auth.server";
import { prisma } from "~/utils/prisma.server";
import { TableHead } from "~/components/character-sheet/table-head";
import { CharacterMenu } from "~/components/scene/character-menu";
import { useShowRow } from "~/components/context-providers/showRowContext";
import { DiceRoller } from "~/components/dice-roller";
import { CreatureSelector } from "~/components/scene/creature-selector";
import { ResourceBar } from "~/components/scene/resource-bar";

export const loader: LoaderFunction = async ({ params, request }) => {
    const userId = await getUserIdFromSession(request)

    const sceneId = Number(params.id);

    const scene = await prisma.scene.findUnique({
        where: { id: sceneId },
        include: { campaign: true }
    });

    const charScenes = await prisma.characterScene.findMany({
        where: {
            sceneId: sceneId
        }
    })

    const availableChars = await prisma.character.findMany(
        {
            where: {
                campaignId: Number(scene?.campaignId)
            }
        }
    )

    const npcs = await prisma.character.findMany(
        { where: { npc: true } }
    )

    const selectedNpcs = npcs.filter(npc => charScenes.map(cs => cs.characterId).includes(npc.id))

    const playerCharacters = availableChars.filter(ac => ac.authorId === userId)


    if (!scene) {
        throw new Response("Cena não encontrada", { status: 404 });
    }

    return ({ scene, availableChars, playerCharacters, userId, npcs, selectedNpcs });
};

export default function SceneRoute() {
    const { scene, userId, availableChars, playerCharacters, npcs, selectedNpcs } = useLoaderData<{
        scene: scene & { campaign: campaign },
        userId: number,
        availableChars: character[],
        playerCharacters: character[],
        npcs: character[]
        selectedNpcs: character[]
    }>();
    const { isAllOpen, isHeaderOpen, isTempOpen, isFooterOpen } = useSidebar();

    const getStyle = () => {
        if (isAllOpen) {
            return { marginLeft: '200px', marginRight: '200px', marginBottom: isFooterOpen ? '155px' : '0' }
        }
        if (isHeaderOpen) {
            return { marginLeft: '200px', marginBottom: isFooterOpen ? '155px' : '0' }
        }
        if (isTempOpen) {
            return { marginRight: '200px', marginBottom: isFooterOpen ? '155px' : '0' }
        }

    }

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
                tableHeaders={["Rodada"]}
                tableDatas={[scene.currentRound]}
                tableExplain={[
                    "Uma Rodada representa aproximadamente 10 segundos dentro de uma Cena. Durante cada Rodada, o Mestre e os Jogadores podem preparar suas Ações, que serão resolvidas quando todos estiverem prontos."
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

                footer={
                    !isMaster
                        ? ''
                        : ''
                }

            />



            <div className="user" style={getStyle()}>

                <h1 className="title-input" style={{ zIndex: '1', position: 'sticky', top: '64px' }}>{scene.title}</h1>
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
                        ?
                        <>{availableChars.map(ac =>
                            <table key={`Char-${ac.id}`}>
                                <CharacterMenu
                                    onClick={() => showRow(`Char-${ac.id}`)}
                                    character={ac}
                                    show={isShown(`Chars`)}
                                    selected={isShown(`Char-${ac.id}`)}
                                />
                                <tbody>
                                    <tr onClick={() => (4)}>
                                        <td>
                                            <DiceRoller
                                                die={6}
                                                amountLimit={3}
                                                flatBonus={0}
                                            />
                                        </td>
                                    </tr>
                                </tbody>

                            </table>)}

                            <div className="container calendar-box">

                                {selectedNpcs.map(snpc =>
                                    <div key={snpc.id} className="calendar-box container">
                                        <h1>{snpc.name}</h1>
                                    </div>

                                )}
                            </div>

                            <CreatureSelector
                                npcs={true}
                                creatures={npcs}
                                isHidden={!isShown('NPC-S')}
                                sceneId={String(scene.id)}
                                onShow={() => showRow('NPC-S')}
                                onCancel={() => showRow('NPC-S')}
                            />

                        </>

                        : <div className="container calendar-box">

                            {selectedNpcs.map(snpc =>
                                <React.Fragment key={snpc.id}>
                                    <div onClick={() => showRow(`Block-${snpc.id}`)} className={
                                        isShown(`Block-${snpc.id}`)
                                            ? `block container selected`
                                            : `block container`
                                    }>

                                        <h1 className="col-12">{snpc.name}</h1>
                                        <h2 className="col-12">Nível {snpc.level}</h2>
                                    </div>

                                    <div className="col-12">
                                        <ResourceBar
                                            color="darkred"
                                            halvedColor="red"
                                            currentValue={snpc.currentVitality}
                                            maxValue={snpc.vitality}
                                        />
                                        <ResourceBar
                                            color="darkgreen"
                                            halvedColor="green"
                                            currentValue={snpc.currentVigor}
                                            maxValue={snpc.vigor}
                                        />
                                        <ResourceBar
                                            color="darkcyan"
                                            halvedColor="cyan"
                                            currentValue={snpc.currentPower}
                                            maxValue={snpc.power}
                                        />
                                    </div>
                                </React.Fragment>
                            )}
                        </div>
                    }

                </div>
                <Outlet />

            </div >


        </React.Fragment>
    )
}