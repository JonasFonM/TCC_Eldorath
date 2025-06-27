// prisma/seed.ts
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    // 1. Linhagens
    const linhagens = await prisma.lineage.createMany({
        data: [
            { name: 'Élfica', description: 'Graciosa e afinada à natureza.' },
            { name: 'Anã', description: 'Robusta e forjada nas montanhas.' },
            { name: 'Humana', description: 'Versátil e adaptável em todos os caminhos.' },
            { name: 'Orquisa', description: 'Forte e feroz, vinda das estepes.' },
            { name: 'Draconata', description: 'Descendente de dragões, orgulhosa e poderosa.' },
        ],
    });

    const allLineages = await prisma.lineage.findMany();

    // 2. Talentos genéricos com pré-requisitos diversos
    const talentos = [
        { name: 'Reflexos Felinos', description: 'Aumenta esquiva e reação.', agi: 3 },
        { name: 'Força Bruta', description: 'Dobra capacidade de carga.', bdy: 3 },
        { name: 'Mente Afiada', description: 'Melhora análise e foco.', mnd: 3 },
        { name: 'Veterana de Guerra', description: 'Bônus por experiência.', lvl: 3 },
        { name: 'Gigante Interior', description: 'Aumenta tamanho verdadeiro.', trSiz: 2 },
        { name: 'Presença Aumentada', description: 'Intimida mais facilmente.', efSiz: 2 },
    ];
    const skills = await Promise.all(
        talentos.map(t => prisma.skill.create({ data: { ...t } }))
    );

    // Criar árvore com pré-requisito entre talentos
    const root = await prisma.skill.create({ data: { name: 'Dom Básico', description: 'Introdução geral ao combate.' } });
    const advanced = await prisma.skill.create({
        data: {
            name: 'Dom Avançado',
            description: 'Técnicas mais refinadas.',
            prerequisiteId: root.id,
        },
    });

    // 3. Talentos de Linhagem e Linhagem Única
    for (const lineage of allLineages) {
        const normalSkill = await prisma.skill.create({
            data: {
                name: `Tradição ${lineage.name}`,
                description: `Um dom comum entre os da linhagem ${String(lineage.name).toLowerCase()}.`,
            },
        });

        const pureSkill = await prisma.skill.create({
            data: {
                name: `Essência ${lineage.name}`,
                description: `Poder singular de linhagem pura ${String(lineage.name).toLowerCase()}.`,
            },
        });

        await prisma.lineage_skill.create({
            data: {
                lineageId: lineage.id,
                skillId: normalSkill.id,
                pureSkill: false,
            },
        });

        await prisma.lineage_skill.create({
            data: {
                lineageId: lineage.id,
                skillId: pureSkill.id,
                pureSkill: true,
            },
        });
    }

    // 4. Caminhos e talentos associados
    const caminho = await prisma.path.create({
        data: {
            name: 'Sombra Silenciosa',
            description: 'Caminho de combate furtivo e letal.',
            pathTier: 1,
            vitality: 10,
            power: 10,
        },
    });

    const caminhoSkill = await prisma.skill.create({
        data: {
            name: 'Golpe Silencioso',
            description: 'Ataque que ignora armadura se em furtividade.',
            agi: 2,
        },
    });

    await prisma.path_skill.create({
        data: {
            pathId: caminho.id,
            skillId: caminhoSkill.id,
        },
    });
    await prisma.item.create({
        data: {
            name: 'Espada Longa',
            description: 'Uma lâmina balanceada, com guarda simples e punho revestido para longas batalhas.',
            subType: 'Espada',
            baseWeight: 2,
            baseCost: 30,
            baseDamageDie: 10,
            baseDamageDieCount: 1,
            type: 'slotWeapon',
        },
    });
    await prisma.item.create({
        data: {
            name: 'Espada Curva',
            description: 'Sua lâmina encurvada facilita cortes largos, ideal para emboscadas rápidas.',
            subType: 'Espada',
            baseWeight: 2,
            baseCost: 35,
            baseDamageDie: 10,
            baseDamageDieCount: 1,
            type: 'slotWeapon',
        },
    });
    await prisma.item.create({
        data: {
            name: 'Machado de Guerra',
            description: 'Machado de duas mãos, projetado para cortar escudos e ossos com brutalidade.',
            subType: 'Machado',
            baseWeight: 3,
            baseCost: 40,
            baseDamageDie: 12,
            baseDamageDieCount: 1,
            type: 'slotWeapon',
        },
    });
    await prisma.item.create({
        data: {
            name: 'Machadinha Tática',
            description: 'Compacta e veloz, perfeita para combates rápidos e lançamentos improvisados.',
            subType: 'Machado',
            baseWeight: 1,
            baseCost: 20,
            baseDamageDie: 6,
            baseDamageDieCount: 1,
            type: 'slotWeapon',
        },
    });
    await prisma.item.create({
        data: {
            name: 'Arco Recurvo',
            description: 'Arco com curvas compostas para maior força e precisão em média distância.',
            subType: 'Arco',
            baseWeight: 2,
            baseCost: 45,
            baseDamageDie: 10,
            baseDamageDieCount: 1,
            type: 'slotWeapon',
        },
    });
    await prisma.item.create({
        data: {
            name: 'Arco de Caça',
            description: 'Simples e confiável, ideal para caçadores e patrulheiros das florestas.',
            subType: 'Arco',
            baseWeight: 1,
            baseCost: 25,
            baseDamageDie: 6,
            baseDamageDieCount: 1,
            type: 'slotWeapon',
        },
    });
    await prisma.item.create({
        data: {
            name: 'Cota Flexível',
            description: 'Armadura maleável que oferece proteção sem comprometer a mobilidade.',
            subType: 'Leve',
            baseWeight: 4,
            baseCost: 60,
            baseDefense: 4,
            type: 'slotArmor',
        },
    });
    await prisma.item.create({
        data: {
            name: 'Túnica de Exploração',
            description: 'Feita para aventureiros que precisam se mover rápido e discretamente.',
            subType: 'Leve',
            baseWeight: 3,
            baseCost: 50,
            baseDefense: 3,
            type: 'slotArmor',
        },
    });
    await prisma.item.create({
        data: {
            name: 'Armadura de Placas',
            description: 'Conjunto completo de placas interligadas, oferece defesa máxima em combate direto.',
            subType: 'Pesada',
            baseWeight: 16,
            baseCost: 120,
            baseDefense: 8,
            type: 'slotArmor',
        },
    });
    await prisma.item.create({
        data: {
            name: 'Brunea Reforçada',
            description: 'Malha espessa com placas nas zonas vitais, combina flexibilidade e proteção.',
            subType: 'Pesada',
            baseWeight: 14,
            baseCost: 110,
            baseDefense: 7,
            type: 'slotArmor',
        },
    });
    await prisma.item.create({
        data: {
            name: 'Amuleto Encantado',
            description: 'Talismã com símbolo rúnico, usado para repelir energias malignas.',
            subType: 'Joalheria',
            baseWeight: 1,
            baseCost: 75,
            baseMagicDefense: 5,
            type: 'slotAccessory',
        },
    });
    await prisma.item.create({
        data: {
            name: 'Anel de Canalização',
            description: 'Conduz mana através de inscrições arcanas sutis em sua superfície interna.',
            subType: 'Joalheria',
            baseWeight: 1,
            baseCost: 65,
            baseMagicDefense: 4,
            type: 'slotAccessory',
        },
    });
    await prisma.item.create({
        data: {
            name: 'Vestes Cerimoniais',
            description: 'Roupas rituais usadas em celebrações sagradas e invocações arcanas.',
            subType: 'Traje',
            baseWeight: 2,
            baseCost: 55,
            baseMagicDefense: 3,
            baseDefense: 1,
            type: 'slotAccessory',
        },
    });
    await prisma.item.create({
        data: {
            name: 'Capa de Viagem',
            description: 'Protetora contra o clima e discretamente encantada contra assaltos.',
            subType: 'Traje',
            baseWeight: 2,
            baseCost: 45,
            baseMagicDefense: 2,
            baseDefense: 2,
            type: 'slotAccessory',
        },
    });
    await prisma.item.create({
        data: {
            name: 'Foco Arcano',
            description: 'Artefato ritual usado por conjuradores para estabilizar magias complexas.',
            subType: 'Catalisador',
            baseWeight: 1,
            baseCost: 70,
            baseDamageDie: 8,
            baseDamageDieCount: 2,
            type: 'consumable',
        },
    });
    await prisma.item.create({
        data: {
            name: 'Ídolo de Canalização',
            description: 'Esculpido com símbolos antigos, amplifica magias de invocação.',
            subType: 'Catalisador',
            baseWeight: 1,
            baseCost: 80,
            baseDamageDie: 10,
            baseDamageDieCount: 2,
            type: 'consumable',
        },
    });
    await prisma.item.create({
        data: {
            name: 'Poção de Cura',
            description: 'Líquido avermelhado que sela feridas em segundos.',
            subType: 'Elixir',
            baseWeight: 1,
            baseCost: 40,
            baseDamageDie: 4,
            baseDamageDieCount: 3,
            type: 'consumable',
        },
    });
    await prisma.item.create({
        data: {
            name: 'Tônico Revigorante',
            description: 'Mistura herbal que reenergiza corpo e mente após combate intenso.',
            subType: 'Elixir',
            baseWeight: 1,
            baseCost: 35,
            baseDamageDie: 4,
            baseDamageDieCount: 1,
            type: 'consumable',
        },
    });
    await prisma.item.create({
        data: {
            name: 'Bomba de Fumaça',
            description: 'Cria uma cortina densa de fumaça, ideal para fugas ou emboscadas.',
            subType: 'Explosivo',
            baseWeight: 1,
            baseCost: 30,
            baseDamageDie: 6,
            baseDamageDieCount: 1,
            type: 'consumable',
        },
    });
    await prisma.item.create({
        data: {
            name: 'Carga Ígnea',
            description: 'Dispositivo incendiário que detona com impacto ou calor intenso.',
            subType: 'Explosivo',
            baseWeight: 1,
            baseCost: 50,
            baseDamageDie: 6,
            baseDamageDieCount: 3,
            type: 'consumable',
        },
    });
}

main()
    .then(() => prisma.$disconnect())
    .catch((e) => {
        console.error(e);
        prisma.$disconnect();
        process.exit(1);
    });