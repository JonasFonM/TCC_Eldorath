/* eslint-disable @typescript-eslint/no-explicit-any */
import { character, character_item, character_lineage, character_path, character_skill, item, lineage, lineage_skill, path, skill } from "@prisma/client"
import { LoaderFunction, redirect } from "@remix-run/node"
import { Outlet, useLoaderData } from "@remix-run/react"
import { useSidebar } from "~/components/context-providers/side-bar-context"
import { SideBars } from "~/components/context-providers/side-bars"
import { requireUserId } from '~/utils/auth.server'
import { prisma } from "~/utils/prisma.server"

export const loader: LoaderFunction = async ({ request, params }) => {
    const userId = await requireUserId(request)
    const characterId = Number(params.id)
    const character = await prisma.character.findUnique({
        where: { id: characterId },
        include: { skills: true }
    });

    //Already Chosen Values
    const character_lineages = await prisma.character_lineage.findMany({
        where: { characterId },
        include: { lineage: true }
    });

    const character_paths = await prisma.character_path.findMany({
        where:
            { characterId: characterId },
        include: { path: true }
    });

    const character_skills = await prisma.character_skill.findMany({
        where:
            { characterId: characterId },
        include: { skill: true }
    })

    const character_items = await prisma.character_item.findMany({
        where:
            { characterId: characterId },
        include: { item: true }
    })

    //Skills
    const maxMagics = character?.pendingMagic || 0

    const maxManeuvers = character?.pendingManeuver || 0

    const maxSelectableSkills = character?.pendingSkills || 0;

    const skills = await prisma.skill.findMany({
        where: {
            lineages: { none: {} }, paths: { none: {} }
        }
    });

    const selectableSkills = skills.filter(sk =>
        !character_skills.some(cs => cs.skill.id === sk.id) &&
        Number(character?.agility) >= sk.agi &&
        Number(character?.body) >= sk.bdy &&
        Number(character?.mind) >= sk.mnd &&
        Number(character?.level) >= sk.lvl &&
        (
            (Number(character?.trueSize) >= sk.trSiz || sk.trSiz <= 0) &&
            (Number(character?.effectiveSize) >= sk.efSiz || sk.efSiz <= 0)
        ) &&
        (
            sk.prerequisiteId === null ||
            character?.skills.some(cs => cs.skillId === Number(sk.prerequisiteId))
        )
    );

    const isPure = character_lineages.length === 1;

    const pureLineageSkills = await prisma.lineage_skill.findMany({
        where: {
            pureSkill: true,
        },
        include: { skill: true, lineage: true },
    });

    const selectablePureLineageSkills = pureLineageSkills.filter(ls =>
        !character_skills.some(cs => cs.skill.id === ls.skill.id) &&
        character_lineages.filter(cl => cl.pure === true).map(cl => cl.lineageId).includes(ls.lineageId) &&
        Number(character?.agility) >= ls.skill.agi &&
        Number(character?.body) >= ls.skill.bdy &&
        Number(character?.mind) >= ls.skill.mnd &&
        Number(character?.level) >= ls.skill.lvl &&
        (
            (Number(character?.trueSize) >= ls.skill.trSiz || ls.skill.trSiz <= 0) &&
            (Number(character?.effectiveSize) >= ls.skill.efSiz || ls.skill.efSiz <= 0)
        ) &&
        (
            ls.skill.prerequisiteId === null ||
            character?.skills.some(cs => cs.skillId === Number(ls.skill.prerequisiteId))
        )
    );

    const nonPureLineageSkills = await prisma.lineage_skill.findMany({
        where: {
            pureSkill: false
        },
        include: { skill: true, lineage: true },
    });

    const selectableNonPureLineageSkills = nonPureLineageSkills.filter(ls =>
        !character_skills.some(cs => cs.skill.id === ls.skill.id) &&
        character_lineages.map(cl => cl.lineageId).includes(ls.lineageId) &&
        Number(character?.agility) >= ls.skill.agi &&
        Number(character?.body) >= ls.skill.bdy &&
        Number(character?.mind) >= ls.skill.mnd &&
        Number(character?.level) >= ls.skill.lvl &&
        (
            (Number(character?.trueSize) >= ls.skill.trSiz || ls.skill.trSiz <= 0) &&
            (Number(character?.effectiveSize) >= ls.skill.efSiz || ls.skill.efSiz <= 0)
        ) &&
        (
            ls.skill.prerequisiteId === null ||
            character?.skills.some(cs => cs.skillId === Number(ls.skill.prerequisiteId))
        )
    );

    //Lineages
    const lineages = await prisma.lineage.findMany()

    const maxSelectableLineages = character?.pendingLineages;

    //Paths
    const paths = await prisma.path.findMany()

    const maxSelectablePaths = character?.pendingPath

    //Items
    const items = await prisma.item.findMany({
        where: {
            baseCost: { lte: 500 }
        },
    })

    const isAuthor = userId === character?.authorId

    return isAuthor ? ({
        userId,
        character, characterId,
        character_lineages, character_paths, character_skills, character_items,
        maxSelectableSkills, maxMagics, maxManeuvers,
        skills, selectableSkills,
        selectablePureLineageSkills,
        selectableNonPureLineageSkills, isPure,
        pureLineageSkills, nonPureLineageSkills,
        lineages, maxSelectableLineages,
        paths, maxSelectablePaths,
        items
    })
        :
        redirect(`/user/character/${characterId}/stats/`);
}

export default function NewCharacterRoute() {
    const { isAllOpen, isHeaderOpen } = useSidebar();


    const {
        userId,
        character, characterId,
        character_lineages, character_paths, character_skills, character_items,
        maxSelectableSkills, maxMagics, maxManeuvers,
        skills, selectableSkills,
        selectablePureLineageSkills,
        pureLineageSkills,
        selectableNonPureLineageSkills,
        nonPureLineageSkills,
        isPure,
        lineages, maxSelectableLineages,
        paths, maxSelectablePaths,
        items
    }
        =
        useLoaderData<{
            userId: string,
            character: (character & { skills: character_skill[] }), characterId: string,
            character_lineages: (character_lineage & { lineage: lineage })[], character_paths: (character_path & { path: path })[], character_skills: (character_skill & { skill: skill })[], character_items: (character_item & { item: item })[],
            maxSelectableSkills: number, maxMagics: number, maxManeuvers: number
            skills: skill[], selectableSkills: skill[],
            selectablePureLineageSkills: (lineage_skill & { skill: skill, lineage: lineage })[],
            pureLineageSkills: (lineage_skill & { skill: skill, lineage: lineage })[],
            selectableNonPureLineageSkills: (lineage_skill & { skill: skill, lineage: lineage })[],
            nonPureLineageSkills: (lineage_skill & { skill: skill, lineage: lineage })[],
            isPure: boolean,
            lineages: lineage[], maxSelectableLineages: number,
            paths: path[], maxSelectablePaths: number,
            items: item[]
        }>()

    const getStyle = () => {
        if (isAllOpen || isHeaderOpen) {
            return { marginRight: '20VW', marginBottom: '155px' }
        }
        if (!isHeaderOpen && !isAllOpen) {
            return { marginRight: '0', marginBottom: '155px' }
        }
    }

    return (
        <>
            <SideBars
                entity={character} title={character.name}
                subtitle={character.boss ? 'Chefe' : ''}
                tableHeaders={["AGI", "COR", "MEN"]}
                tableDatas={[character.agility, character.body, character.mind]}
                tableExplain={[
                    "Agilidade é usada para Acertar Ataques Físicos, além de ser a base principal da sua Iniciativa e da sua Esquiva.",
                    "Corpo é somado no Dano dos seus Ataques Físicos, além de ser uma base da sua Vitalidade, Vigor, Peso, Capacidade de Carga e Capacidade de Levantamento",
                    "Mente é usada para Acertar Ataques Mágicos, além de ser uma base do seu Vigor e do seu Poder"]}
                links={[
                    `/user/character/new/${characterId}/basic`,
                    `/user/character/new/${characterId}/lineages/`,
                    `/user/character/new/${characterId}/paths/`,
                    `/user/character/new/${characterId}/skills/`,
                    `/user/character/new/${characterId}/inventory/`,
                    `/user/character/new/${characterId}/end/`
                ]}

                linkNames={[
                    'Atributos',
                    'Linhagens',
                    'Caminhos',
                    'Talentos',
                    'Itens Iniciais',
                    'Finalizar'
                ]}
                temp={null}
                footer={null}

            />

            <div className="user"
                style={getStyle()}>
                <Outlet context={{
                    userId,
                    character, characterId,
                    character_lineages, character_paths, character_skills, character_items,
                    maxSelectableSkills, maxMagics, maxManeuvers,
                    skills, selectableSkills,
                    selectablePureLineageSkills,
                    pureLineageSkills,
                    selectableNonPureLineageSkills,
                    nonPureLineageSkills,
                    isPure,
                    lineages, maxSelectableLineages,
                    paths, maxSelectablePaths,
                    items,
                }} />

            </div >
        </>

    );
}