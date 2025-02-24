/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { json, LoaderFunction, } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { prisma } from "~/utils/prisma.server";
import { LSrelations } from "~/utils/types.server";
import { character, character_item, lineage, path, skill, item } from "@prisma/client";
import { ResetConfirm } from "~/components/character-sheet/reset-confirm";
import React, { useState } from "react";
import { CharacterItemCircle } from "~/components/c-item-circle";
import { CharacterItemExplain } from "~/components/explanations/item-explain";


export const loader: LoaderFunction = async ({ params }) => {
  const characterId = Number(params.id);

  const character = await prisma.character.findUnique({
    where: { id: characterId },
    include: { skills: true, lineages: true, paths: true },
  });

  const character_lineages = await prisma.character_lineage.findMany({
    where: { characterId },
    include: { lineage: true }
  });

  const isPure = character_lineages.length === 1;


  if (!character) {
    return json({ skills: [], lineages: [] });
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

  return json({ skills, pureLineageSkills, nonPureLineageSkills, character, characterId, lineages, isPure, paths, items });
};

export default function CharacterRoute() {
  const { character, characterId } = useLoaderData<{ character: character, characterId: string }>()
  const { skills, pureLineageSkills, nonPureLineageSkills } = useLoaderData<{ skills: skill[], pureLineageSkills: LSrelations, nonPureLineageSkills: LSrelations }>();
  const { lineages, isPure } = useLoaderData<{ lineages: lineage[], isPure: boolean }>();
  const { items } = useLoaderData<{ items: (character_item & { item: item })[] }>();
  const { paths } = useLoaderData<{ paths: path[] }>();

  const [selectReset, setReset] = useState<number>(0);

  const [prevTemp, setPrevTemp] = useState<number>(0);

  const showReset = () => {
    setReset(() => {
      return character.id;
    });

    setPrevTemp(() => selectTemp);

    setTemp(() => {
      return character.id;
    });
  };

  const cancelReset = () => {
    setReset(() => {
      return 0
    });
    prevTemp == 0 ?
      setTemp(() => {
        return 0;
      }) :
      ''
  };


  const [selectHeader, setHeader] = useState<number>(0);

  const showHeader = () => {
    setHeader(() => {
      return character.id;
    });
  };

  const cancelHeader = () => {
    setHeader(() => {
      return 0
    });
  };
  const [selectTemp, setTemp] = useState<number>(0);

  const showTemp = () => {
    setTemp(() => {
      return character.id;
    });
  };

  const cancelTemp = () => {
    setTemp(() => {
      return 0
    });
  };

  const [showItem, setShowItem] = useState<number>();

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

  const [selectInv, setInv] = useState<number>(0);

  const isAllOpen = selectHeader === 0 && selectTemp === 0
  const isHeaderOpen = selectHeader === 0 && selectTemp != 0
  const isTempOpen = selectTemp === 0 && selectHeader != 0

  return (
    <>

      <div className="header" style={selectHeader === 0 ? {} : { transform: 'translate(-200px)' }}>

        <h1 >{character.name}</h1>
        <p>{paths && paths.length > 0 ? (paths.map(path => path.name)) : ("Sem Caminho")} </p>

        <table>
          <tr>
            <th>NV</th>
            <td>{character.level}</td>
          </tr>
        </table>
        <table>
          <tr>
            <th>CT</th>
            <td>{character.tier}</td>
          </tr>
        </table>
        <table>
          <tr>
            <th>XP</th>
            <td>{character.experience}/{(character.level + 1) * 4 * character.tier}</td>
          </tr>
        </table>

        <ul style={{ zIndex: '900' }} className="skillnav">
          <li><NavLink to={`/user/character/${characterId}/stats/`}>Personagem</NavLink></li>
          <li><NavLink to={`/user/character/${characterId}/lineages/`}>Linhagens</NavLink></li>
          <li><NavLink to={`/user/character/${characterId}/paths/`}>Caminhos</NavLink></li>
          <li><NavLink to={`/user/character/${characterId}/skills/`}>Talentos</NavLink></li>
          <ResetConfirm name={character.name} isHidden={selectReset === 0} onShow={showReset} onCancel={cancelReset} id={String(character.id)} />
        </ul>

      </div>
      <button className="toggle-menu" style={selectHeader === 0 ? {} : { transform: 'translate(-200px)' }} onClick={selectHeader === 0 ? showHeader : cancelHeader}></button>

      <div className="temp" style={selectTemp === 0 ? {} : { transform: 'translate(200px)' }}>

        <h1>Inventário</h1>
        <h1 className="title-container"><NavLink className="question-button" to={`/user/character/${characterId}/new/inventory/`}>+</NavLink></h1>

        <table>
          <tr>
            <th>AU</th>
            <td>{character.gold}</td>
          </tr>
        </table>

        <table>
          <tr>
            <th>CA</th>
            <td>{items.map(items => items.weight).reduce((accumulator, currentValue) => accumulator + currentValue, 0)}/{character.carryCap}</td>
          </tr>
        </table>

        <ul>
          <li><button style={selectInv <= 1 ? { display: 'inherit' } : { display: 'none' }} onClick={() => selectInv === 0 ? setInv(1) : setInv(0)}>Armas</button></li>


          {selectInv === 1 ? items.map(item => (
            <React.Fragment key={item.id}>
              <CharacterItemCircle
                item={item}
                isSelected={false}
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



          <li><button style={selectInv === 2 || selectInv === 0 ? { display: 'inherit' } : { display: 'none' }} onClick={() => selectInv <= 1 ? setInv(2) : setInv(0)}>Armaduras</button></li>

          <li><button style={selectInv === 3 || selectInv === 0 ? { display: 'inherit' } : { display: 'none' }} onClick={() => selectInv <= 1 ? setInv(3) : setInv(0)}>Gerais</button></li>

        </ul>
      </div>

      <button className="toggle-temp" style={selectTemp === 0 ? {} : { transform: 'translate(200px)' }} onClick={selectTemp === 0 ? showTemp : cancelTemp}></button>


      <div className="character-sheet" style={isAllOpen ? { marginLeft: '200px', marginRight: '200px' } : isHeaderOpen ? { marginLeft: '200px' } : isTempOpen ? { marginRight: '200px' } : {}}>
        <Outlet context={{ character, skills, paths, lineages, pureLineageSkills, nonPureLineageSkills, isPure, items }} />
      </div >
    </>
  );

}