import { json } from "@remix-run/node";
import { prisma } from "./prisma.server";
import { NPCForm } from "./types.server";

export const createNPC = async (npc: NPCForm) => {
    const vitality = npc.body + npc.tier + 1 + (npc.boss ? npc.level : 0);
    const vigor = npc.level + npc.body + npc.mind;
    const power = npc.tier + npc.mind + (npc.boss ? npc.level / 2 + npc.level % 2 : 0);
    const carryCap = 15 + (5 * npc.body);
    const liftCap = 20 + (10 * npc.body);
    const weight = 10 + (2 * npc.body)
    const defense = npc.agility;
    const magicdefense = npc.mind;

    const newNPC = await prisma.character.create({
        data: {
            name: npc.name,
            level: npc.level,
            tier: npc.tier,
            boss: npc.boss,
            agility: npc.agility,
            body: npc.body,
            mind: npc.mind,
            authorId: npc.authorId,
            vitality: vitality,
            vigor: vigor,
            power: power,
            currentVitality: vitality,
            currentVigor: vigor,
            currentPower: power,
            carryCap: carryCap,
            liftCap: liftCap,
            baseWeight: weight,
            defense: defense,
            magicDefense: magicdefense,
        },
    })
    return {
        id: newNPC.id,
        name: npc.name,
        level: npc.level,
        tier: npc.tier,
        boss: npc.boss,
        agility: npc.agility,
        body: npc.body,
        mind: npc.mind,
        vitality: vitality,
        vigor: vigor,
        power: power,
        currentVitality: vitality,
        currentVigor: vigor,
        currentPower: power,
        carryCap: carryCap,
        liftCap: liftCap,
        baseWeight: weight,
        defense: defense,
        magicDefense: magicdefense,
        authorId: npc.authorId
    }
}

export const updateNPC = async (npc: NPCForm, npcId: number) => {
    const vitality = npc.body + npc.tier + 1 + (npc.boss ? npc.level : 0);
    const vigor = npc.level + npc.body + npc.mind;
    const power = npc.tier + npc.mind + (npc.boss ? npc.level / 2 + npc.level % 2 : 0);
    const carryCap = 15 + (5 * npc.body);
    const liftCap = 20 + (10 * npc.body);
    const weight = 10 + (2 * npc.body)
    const defense = npc.agility;
    const magicdefense = npc.mind;
    const gold = npc.boss ? 1500 : 150


    const updatedNPC = await prisma.character.update({
        where: {
            id: npcId
        }
        ,
        data: {
            name: npc.name,
            level: npc.level,
            tier: npc.tier,
            boss: npc.boss,
            gold: gold,
            agility: npc.agility,
            body: npc.body,
            mind: npc.mind,
            vitality: vitality,
            vigor: vigor,
            power: power,
            currentVitality: vitality,
            currentVigor: vigor,
            currentPower: power,
            carryCap: carryCap,
            liftCap: liftCap,
            baseWeight: weight,
            defense: defense,
            magicDefense: magicdefense,
            authorId: npc.authorId

        },
    })
    return {
        id: updatedNPC.id,
        name: npc.name,
        level: npc.level,
        tier: npc.tier,
        boss: npc.boss,
        gold: gold,
        agility: npc.agility,
        body: npc.body,
        mind: npc.mind,
        vitality: vitality,
        vigor: vigor,
        power: power,
        currentVitality: vitality,
        currentVigor: vigor,
        currentPower: power,
        carryCap: carryCap,
        liftCap: liftCap,
        baseWeight: weight,
        defense: defense,
        magicDefense: magicdefense,
        authorId: npc.authorId
    }
}

export async function submitNPC(npc: NPCForm) {
    const newNPC = await createNPC(npc)
    if (!newNPC) {

        return json(
            {
                error: `Houve um erro na criação de NPC.`,
                fields: { name: npc.name, tier: npc.tier, agility: npc.agility, body: npc.body, mind: npc.mind, authorId: npc.authorId },
            },
            { status: 400 },
        )
    }
    return (String(newNPC.id))
}