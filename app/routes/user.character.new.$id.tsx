/* eslint-disable @typescript-eslint/no-explicit-any */
import { character, item, lineage, path, skill } from "@prisma/client"
import { LoaderFunction, redirect } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import { useSidebar } from "~/components/side-bars/side-bar-context"
import { SideBars } from "~/components/side-bars/side-bars"
import { requireUserId } from '~/utils/auth.server'
import { prisma } from "~/utils/prisma.server"
import { LSrelations } from "~/utils/types.server"

export const loader: LoaderFunction = async ({ request, params }) => {
    const userId = await requireUserId(request)
    const characterId = Number(params.id)
    const character_lineages = await prisma.character_lineage.findMany({
        where: { characterId },
        include: { lineage: true }
    });

    const character = await prisma.character.findUnique({
        where: { id: characterId },
        include: { skills: true }
    });


    const character_paths = await prisma.character_path.findMany({
        where:
            { characterId: characterId },
        include: { path: true }
    });

    const selectMagics = character_paths.map(pss => pss.path.addMagics)

    const maxMagics = selectMagics.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    const selectTechniques = character_paths.map(pss => pss.path.addTechniques)

    const maxTechniques = selectTechniques.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    const selectOaths = character_paths.map(pss => pss.path.addOaths)

    const maxOaths = selectOaths.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    const selectTricks = character_paths.map(pss => pss.path.addTricks)

    const maxTricks = selectTricks.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    const selectManeuvers = character_paths.map(pss => pss.path.addManeuvers)

    const maxManeuvers = selectManeuvers.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

    const maxSelectableSkills = character?.pendingSkills;

    const general_skills = await prisma.skill.findMany({
        where: {
            lineages: { none: {} },
            id: { notIn: character?.skills.map(skill => skill.skillId) },
            agi: {
                lte: character?.agility
            },
            bdy: {
                lte: character?.body
            },
            mnd: {
                lte: character?.mind
            },
            lvl: {
                lte: character?.level
            },
            OR: [{
                trSiz: {
                    lte: character?.trueSize,
                },
                rlSiz: {
                    lte: character?.relativeSize,
                },
            },
            { trSiz: { lte: 0 } },
            { rlSiz: { lte: 0 } },
            ],
            AND: [{
                OR: [{
                    prerequisiteId: { in: character?.skills.map(skill => skill.skillId) },
                },
                { prerequisiteId: null },
                ]
            }]

        },

    });

    const characteristics = general_skills.filter(gs => gs.type == 'CHARACTERISTIC')
    const magics = general_skills.filter(gs => gs.type == 'MAGIC')
    const techniques = general_skills.filter(gs => gs.type == 'TECHNIQUE')
    const oaths = general_skills.filter(gs => gs.techniqueSubtype == 'OATH')
    const maneuvers = general_skills.filter(gs => gs.techniqueSubtype == 'MANEUVER')
    const tricks = general_skills.filter(gs => gs.techniqueSubtype == 'TRICK')

    const isPure = character_lineages.length === 1;

    const pureLineageSkills = await prisma.lineage_skill.findMany({
        where: {
            skillId: { notIn: character?.skills.map(skill => skill.skillId) },
            lineageId: { in: character_lineages.map(cl => cl.lineageId) },
            pureSkill: true
        },
        include: { skill: true },
    });

    const nonPureLineageSkills = await prisma.lineage_skill.findMany({
        where: {
            skillId: { notIn: character?.skills.map(skill => skill.skillId) },
            lineageId: { in: character_lineages.map(cl => cl.lineageId) },
            pureSkill: false
        },
        include: { skill: true },
    });


    const lineages = await prisma.lineage.findMany()

    const maxSelectableLineages = character?.pendingLineages;


    const paths = await prisma.path.findMany()

    const maxSelectablePaths = character?.pendingPath


    const items = await prisma.item.findMany({
        where: {
            baseCost: { lte: 500 }
        },
    })

    const isAuthor = userId === character?.authorId

    return isAuthor ? ({
        userId,
        character, characterId,
        maxSelectableSkills, maxMagics, maxTechniques, maxManeuvers, maxOaths, maxTricks,
        characteristics, magics, techniques, oaths, maneuvers, tricks,
        pureLineageSkills, nonPureLineageSkills, isPure,
        lineages, maxSelectableLineages,
        paths, maxSelectablePaths,
        items
    })
        :
        redirect(`/user/character/${characterId}/skills/`);
}

export default function NewCharacterRoute() {
    const { isAllOpen, isHeaderOpen, isTempOpen } = useSidebar();

    const {
        userId,
        character, characterId,
        maxSelectableSkills, maxMagics, maxTechniques, maxManeuvers, maxOaths, maxTricks,
        characteristics, magics, techniques, oaths, maneuvers, tricks,
        pureLineageSkills, nonPureLineageSkills, isPure,
        lineages, maxSelectableLineages,
        paths, maxSelectablePaths,
        items
    }
        =
        useLoaderData<{
            userId: string,
            character: character, characterId: string,
            maxSelectableSkills: number, maxMagics: number, maxTechniques: number, maxManeuvers: number, maxOaths: number, maxTricks: number,
            characteristics: skill[], magics: skill[], techniques: skill[], maneuvers: skill[], tricks: skill[], oaths: skill[]
            pureLineageSkills: LSrelations, nonPureLineageSkills: LSrelations, isPure: boolean,
            lineages: lineage[], maxSelectableLineages: number,
            paths: path[], maxSelectablePaths: number,
            items: item[]
        }>()

    return (

        <>
            <SideBars
                entity={character} title={character.name}
                subtitle={''}
                tableHeaders={["NV", "CT", "XP"]}
                tableDatas={[character.level, character.tier, character.experience]}
                tableExplain={[
                    "Seu Nível é um indicador geral de quão poderoso você é no momento. Você sobe de nível conforme ganha Experiência.",
                    "Sua Categoria representa em qual patamar da sua jornada você está. Você pode ser Iniciante, Profissional, Mestre ou Lendário.",
                    "Seus Pontos de Experiência determinam quando você pode subir de nível. Você pode receber Experiência de várias formas, como derrotar inimigos, ou passar por um treinamento árduo.",
                ]}
                links={[
                    `/user/character/new/${characterId}/basic/`,
                    `/user/character/new/${characterId}/lineages/`,
                    `/user/character/new/${characterId}/paths/`,
                    `/user/character/new/${characterId}/skills/`,

                ]}

                linkNames={[
                    'Personagem',
                    'Linhagens',
                    'Caminhos',
                    'Talentos',
                ]}
                temp={
                    <>

                    </>
                }

            />

            <div className="character-sheet" style={isAllOpen ? { marginLeft: '200px', marginRight: '200px' } : isHeaderOpen ? { marginLeft: '200px' } : isTempOpen ? { marginRight: '200px' } : {}}>
                <Outlet context={{
                    userId,
                    character, characterId,
                    maxSelectableSkills, maxMagics, maxTechniques, maxManeuvers, maxOaths, maxTricks,
                    characteristics, magics, techniques, oaths, maneuvers, tricks,
                    pureLineageSkills, nonPureLineageSkills, isPure,
                    lineages, maxSelectableLineages,
                    paths, maxSelectablePaths,
                    items
                }} />
            </div>
        </>

    );
}