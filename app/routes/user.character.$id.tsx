/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoaderFunction, } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { prisma } from "~/utils/prisma.server";
import { LSrelations } from "~/utils/types.server";
import { character, character_item, lineage, path, skill, item } from "@prisma/client";
import { ResetConfirm } from "~/components/character-sheet/reset-confirm";
import React, { useState } from "react";
import { CharacterItemCircle } from "~/components/c-item-circle";
import { CharacterItemExplain } from "~/components/explanations/item-explain";
import { SideBars } from "~/components/side-bars/side-bars";
import { useSidebar } from "~/components/side-bars/side-bar-context";
import { GeneralExplain } from "~/components/explanations/general-explain";
import { getUserIdFromSession } from "~/utils/auth.server";


export const loader: LoaderFunction = async ({ params, request }) => {
  const characterId = Number(params.id);
  const userId = await getUserIdFromSession(request)

  const character = await prisma.character.findUnique({
    where: { id: characterId },
    include: { skills: true, lineages: true, paths: true },
  });

  const isAuthor = Number(userId) === Number(character?.authorId)

  const character_lineages = await prisma.character_lineage.findMany({
    where: { characterId },
    include: { lineage: true }
  });

  const isPure = character_lineages.length === 1;


  if (!character) {
    return ({ skills: [], lineages: [] });
  }

  const skills = await prisma.skill.findMany({
    where: {
      id: { in: character.skills.map(skill => skill.skillId) },
      lineages: { none: {} },
    },
  });

  const pureLineageSkills = await prisma.lineage_skill.findMany({
    where: {
      lineageId: { in: character_lineages.map(cl => cl.lineageId) },
      pureSkill: true
    },
    include: { skill: true },
  });

  const nonPureLineageSkills = await prisma.lineage_skill.findMany({
    where: {
      lineageId: { in: character_lineages.map(cl => cl.lineageId) },
      pureSkill: false
    },
    include: { skill: true },
  });

  const lineages = await prisma.lineage.findMany({
    where: {
      id: { in: character.lineages.map(lineage => lineage.lineageId) },
    },
  });

  const paths = await prisma.path.findMany({
    where: {
      id: { in: character.paths.map(path => path.pathId) },
    }
  });


  const items = await prisma.character_item.findMany({
    where: {
      characterId: characterId
    },
    include: { item: true }
  })

  return ({ userId, isAuthor, skills, pureLineageSkills, nonPureLineageSkills, character, characterId, lineages, isPure, paths, items });
};

export default function CharacterRoute() {
  const { isAuthor, character, characterId } = useLoaderData<{ isAuthor: boolean, character: character, characterId: string }>()
  const { skills, pureLineageSkills, nonPureLineageSkills } = useLoaderData<{ skills: skill[], pureLineageSkills: LSrelations, nonPureLineageSkills: LSrelations }>();
  const { lineages, isPure } = useLoaderData<{ lineages: lineage[], isPure: boolean }>();
  const { items } = useLoaderData<{ items: (character_item & { item: item })[] }>();
  const { paths } = useLoaderData<{ paths: path[] }>();
  const { isAllOpen, isHeaderOpen, isTempOpen } = useSidebar();


  const [showItem, setShowItem] = useState<number>();
  const [showInv, setShowInv] = useState<number>(0);

  const explainItem = (id: number) => {
    showItem != id ?
      setShowItem(() => {
        return id;
      })
      :
      setShowItem(() => {
        return 0;
      })
  }

  const subtitle = paths.length > 0 ? String(paths.map(p => p.name)) : "Sem Caminho"

  const [selectInv, setInv] = useState<number>(0);
  return (
    <>
      <SideBars
        entity={character} title={character.name}
        subtitle={subtitle}
        tableHeaders={["NV", "CT", "XP"]}
        tableDatas={[character.level, character.tier, character.experience]}
        tableExplain={[
          "Seu Nível é um indicador geral de quão poderoso você é no momento. Você sobe de nível conforme ganha Experiência.",
          "Sua Categoria representa em qual patamar da sua jornada você está. Você pode ser Iniciante, Profissional, Mestre ou Lendário.",
          "Seus Pontos de Experiência determinam quando você pode subir de nível. Você pode receber Experiência de várias formas, como derrotar inimigos, ou passar por um treinamento árduo.",
        ]}
        links={[
          `/user/character/${characterId}/stats/`,
          `/user/character/${characterId}/lineages/`,
          `/user/character/${characterId}/paths/`,
          `/user/character/${characterId}/skills/`,
          character.campaignId ?
            `/user/campaign/${character.campaignId}/`
            :
            `/user/home/profile`
        ]}

        linkNames={[
          'Personagem',
          'Linhagens',
          'Caminhos',
          'Talentos',
          'Campanha'
        ]}
        temp={
          <React.Fragment>
            <h1>Inventário</h1>
            {isAuthor ?
              <h1 className="title-container"><NavLink className="question-button" to={`/user/character/${characterId}/new/inventory/`}>+</NavLink></h1>
              : ''}

            <table>
              <tbody>
                <tr onClick={() => setShowInv(1)}>
                  <th>AU</th>
                  <td>{character.gold}</td>
                </tr>
              </tbody>
            </table>
            <GeneralExplain style={'linear-gradient(to bottom, white, gold)'} color={'black'} title={'Auramares'} description="Auramares são a moeda corrente principal em Æternida. Cunhadas em ouro, elas simbolizam a paz e a harmonia." isHidden={showInv != 1} onCancel={() => setShowInv(0)} />

            <table>
              <tbody>
                <tr onClick={() => setShowInv(2)}>
                  <th>CA</th>
                  <td>{items.map(items => items.weight).reduce((accumulator, currentValue) => accumulator + currentValue, 0)}/{character.carryCap}</td>
                </tr>
              </tbody>
            </table>
            <GeneralExplain style={'linear-gradient(to bottom, white, gold)'} color={'black'} title={'Carga Atual'} description="Indica quantas Cargas estão ocupadas no seu Inventário. Se sua Carga Atual for maior que a sua Capacidade de Carga, você fica Sobrecarregado." isHidden={showInv != 2} onCancel={() => setShowInv(0)} />

            <ul>
              <li key={0}><button style={selectInv <= 1 ? { display: 'inherit' } : { display: 'none' }} onClick={() => selectInv === 0 ? setInv(1) : setInv(0)}>Itens</button></li>

              {selectInv === 1 ? items.map(item => (
                <React.Fragment key={item.id}>
                  <CharacterItemCircle
                    item={item}
                    onClick={() => explainItem(item.id)}
                  />
                  <CharacterItemExplain
                    style={'linear-gradient(to bottom right, gold, goldenrod)'}
                    character_item={item}
                    isHidden={showItem != item.id}
                    onCancel={() => setShowItem(0)}
                  />
                </React.Fragment>

              )) : ''}
            </ul>
          </React.Fragment>
        }

      />

      <div className="character-sheet" style={isAllOpen ? { marginLeft: '200px', marginRight: '200px' } : isHeaderOpen ? { marginLeft: '200px' } : isTempOpen ? { marginRight: '200px' } : {}}>
        <Outlet context={{ isAuthor, character, skills, paths, lineages, pureLineageSkills, nonPureLineageSkills, isPure, items }} />
      </div >
    </>

  );

}