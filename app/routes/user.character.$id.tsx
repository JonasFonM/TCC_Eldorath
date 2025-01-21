/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { json, LoaderFunction, } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { prisma } from "~/utils/prisma.server";
import { LSrelations } from "~/utils/types.server";
import { armor, character, character_armor, character_weapon, lineage, path, skill, weapon } from "@prisma/client";
import { ResetConfirm } from "~/components/character-sheet/reset-confirm";
import React, { useState } from "react";
import { CharacterWeaponCircle } from "~/components/c-weapon-circle";
import { CharacterWeaponExplain } from "~/components/explanations/weapon-explain";


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


  const weapons = await prisma.character_weapon.findMany({
    where: {
      characterId: characterId
    },
    include: { weapon: true }
  })

  const armors = await prisma.character_armor.findMany({
    where: {
      characterId: characterId
    },
    include: { armor: true }
  })

  return json({ skills, pureLineageSkills, nonPureLineageSkills, character, characterId, lineages, isPure, paths, weapons, armors });
};

export default function CharacterRoute() {
  const { character, characterId } = useLoaderData<{ character: character, characterId: string }>()
  const { skills, pureLineageSkills, nonPureLineageSkills } = useLoaderData<{ skills: skill[], pureLineageSkills: LSrelations, nonPureLineageSkills: LSrelations }>();
  const { lineages, isPure } = useLoaderData<{ lineages: lineage[], isPure: boolean }>();
  const { weapons, armors } = useLoaderData<{ weapons: (character_weapon & { weapon: weapon })[], armors: (character_armor & { armor: armor })[] }>();
  const { paths } = useLoaderData<{ paths: path[] }>();

  const [selectReset, setReset] = useState<number>(0);

  const showReset = () => {
    setReset(() => {
      return character.id;
    });
  };

  const cancelReset = () => {
    setReset(() => {
      return 0
    });
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

  const [showWeapon, setShowWeapon] = useState<number>();

  const explainWeapon = (id: number) => {
    showWeapon != id ?
      setShowWeapon(() => {
        return id;
      })
      :
      setShowWeapon(() => {
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

        <ul style={{zIndex: '900'}} className="skillnav">
          <li><NavLink to={`/user/character/${characterId}/stats/`}>Personagem</NavLink></li>
          <li><NavLink to={`/user/character/${characterId}/lineages/`}>Linhagens</NavLink></li>
          <li><NavLink to={`/user/character/${characterId}/paths/`}>Caminhos</NavLink></li>
          <li><NavLink to={`/user/character/${characterId}/skills/`}>Talentos</NavLink></li>
          <ResetConfirm name={character.name} isHidden={selectReset === 0} onShow={showReset} onCancel={cancelReset} id={String(character.id)} />
        </ul>

      </div>
      <button className="toggle-menu" style={selectHeader === 0 ? {} : { transform: 'translate(-200px)' }} onClick={selectHeader === 0 ? showHeader : cancelHeader}></button>

      <div className="temp" style={selectTemp === 0 ? {} : { transform: 'translate(200px)' }}>

        <h1><NavLink to={`/user/character/${characterId}/new/inventory/`}>Inventário</NavLink></h1>
        <p>Auramares: {character.gold}</p>
        <p>Peso Carregado: {weapons.map(weapons => weapons.weight).reduce((accumulator, currentValue) => accumulator + currentValue, 0)}/{character.carryCap}</p>

        <ul>
          <li><button style={selectInv <= 1 ? { display: 'inherit' } : { display: 'none' }} onClick={() => selectInv === 0 ? setInv(1) : setInv(0)}>Armas</button></li>


          {selectInv === 1 ? weapons.map(weapon => (
            <React.Fragment key={weapon.id}>
              <CharacterWeaponCircle
                weapon={weapon}
                isSelected={false}
                onClick={() => explainWeapon(weapon.id)}
              />
              <CharacterWeaponExplain
                style={'linear-gradient(to bottom right, gold, goldenrod)'}
                character_weapon={weapon}
                isHidden={showWeapon != weapon.id}
                onCancel={() => setShowWeapon(0)}
              />
            </React.Fragment>

          )) : ''}



          <li><button style={selectInv === 2 || selectInv === 0 ? { display: 'inherit' } : { display: 'none' }} onClick={() => selectInv <= 1 ? setInv(2) : setInv(0)}>Armaduras</button></li>

          <li><button style={selectInv === 3 || selectInv === 0 ? { display: 'inherit' } : { display: 'none' }} onClick={() => selectInv <= 1 ? setInv(3) : setInv(0)}>Gerais</button></li>

        </ul>
      </div>

      <button className="toggle-temp" style={selectTemp === 0 ? {} : { transform: 'translate(200px)' }} onClick={selectTemp === 0 ? showTemp : cancelTemp}></button>


      <div className="character-sheet" style={isAllOpen ? { marginLeft: '200px', marginRight: '200px' } : isHeaderOpen ? { marginLeft: '200px' } : isTempOpen ? { marginRight: '200px' } : {}}>
        <Outlet context={{ character, skills, paths, lineages, pureLineageSkills, nonPureLineageSkills, isPure, weapons, armors }} />
      </div >
    </>
  );

}