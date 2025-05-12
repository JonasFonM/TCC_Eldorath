/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink, useOutletContext } from "@remix-run/react";
import { lineage, lineage_skill, path, skill } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import React, { useRef, useState } from "react";
import { TableHead } from "~/components/character-sheet/general-table";
import { TableData } from "~/components/character-sheet/general-table-data";
import { GeneralExplain } from "~/components/explanations/general-explain";
import { TableDropdown } from "~/components/character-sheet/table-dropdown";

export const loader: LoaderFunction = async ({ params }) => {
  const characterId = params.id;
  return (characterId)
}

export default function SkillsRoute() {
  const { characterId, isAuthor,
    skills, pureLineageSkills, nonPureLineageSkills } =
    useOutletContext<{
      characterId: string, isAuthor: boolean,
      skills: skill[], pureLineageSkills: (lineage_skill & { skill: skill, lineage: lineage })[],
      nonPureLineageSkills: (lineage_skill & { skill: skill, lineage: lineage })[], paths: path[],
      lineages: lineage[], isPure: boolean
    }>();

  const show = useRef<number[]>([]); // Avoid re-renders

  const forceUpdate = useState(0)[1]; // Trigger minimal re-renders when necessary

  const showRow = (n: number) => {
    if (show.current.includes(n)) {
      const newShow = show.current.filter(ns => ns != n)
      show.current = newShow
      return forceUpdate(n => n + 1);
    }
    show.current.push(n);
    return forceUpdate(n => n + 1);
  }

  return (
    <React.Fragment>
      <div className="title-container">
        <h1 style={{ marginTop: '0', marginBottom: '0', padding: '0' }}>Talentos</h1>
        <button className="question-button" onClick={() => showRow(-5)}>?</button>
      </div>

      <GeneralExplain
        style={'linear-gradient(to bottom, white, gold)'}
        color={'black'}
        title={'Talentos'}
        description="Talentos têm efeitos diferentes que mudam como você interage com o jogo, principalmente em Combate. Eles são divididos em Características, Técnicas e Magias."
        isHidden={!show.current.includes(-5)}
        onCancel={() => showRow(-5)}
      />

      <table>
        <TableHead
          tableTitles={['Talentos']}
          onClick={() => showRow(-1)}
          open={show.current.includes(-1)}
        />
        {skills.map(sk => (
          <React.Fragment key={sk.id}>
            <TableData
              key={`Data-${sk.id}`}
              tableData={[`${sk.name}`]}
              show={show.current.includes(-1)}
              onClick={() => showRow(sk.id)}
              selected={show.current.includes(sk.id)}
            />
            <TableDropdown
              key={`Drop-${sk.id}`}
              show={show.current.includes(sk.id) && show.current.includes(-1)}
              categories={["", "Tipo", "Requisitos"]}
              subtitleIndexes={[1, 2]}
              items={[
                String(sk.description),
                String(sk.type),
                `Agilidade: ${String(sk.agi)} | Corpo: ${String(sk.bdy)} | Mente: ${String(sk.mnd)} | Nível: ${String(sk.lvl)} | Tamanho Real: ${String(sk.trSiz)} 
                | Tamanho Efetivo: ${String(sk.efSiz)} | ${sk.prerequisiteId
                  ? `Talento: ${String(skills.filter(s => s.id === sk.prerequisiteId).map(s => s.name))}`
                  : `Não Requer outro Talento`}`]}
            />
          </React.Fragment>
        ))}

        {nonPureLineageSkills.length > 0
          ? <TableHead
            tableTitles={['Talentos de Linhagem']}
            onClick={() => showRow(-2)}
            open={show.current.includes(-2)}
          />
          : ''
        }
        {nonPureLineageSkills.map(ls => (
          <React.Fragment key={ls.id}>
            <TableData
              key={`Data-${ls.id}`}
              tableData={[`${ls.skill.name}`]}
              show={show.current.includes(-2)}
              onClick={() => showRow(ls.skill.id)}
              selected={show.current.includes(ls.skill.id)}
            />
            <TableDropdown
              key={`Drop-${ls.skill.id}`}
              show={show.current.includes(ls.skill.id) && show.current.includes(-2)}
              categories={["", "Linhagem", "Tipo", "Requisitos"]}
              subtitleIndexes={[1, 2, 3]}
              items={[
                String(ls.skill.description),
                String(ls.lineage.name),
                String(ls.skill.type),
                `Agilidade: ${String(ls.skill.agi)} | Corpo: ${String(ls.skill.bdy)} | Mente: ${String(ls.skill.mnd)} | Nível: ${String(ls.skill.lvl)} | Tamanho Real: ${String(ls.skill.trSiz)} 
                | Tamanho Efetivo: ${String(ls.skill.efSiz)} | ${ls.skill.prerequisiteId
                  ? `Talento: ${String(skills.filter(s => s.id === ls.skill.prerequisiteId).map(s => s.name))}`
                  : `Não Requer outro Talento`}`]}
            />

          </React.Fragment>
        ))}

        {pureLineageSkills.length > 0
          ? <TableHead
            tableTitles={['Talentos de Linhagem Pura']}
            onClick={() => showRow(-3)}
            open={show.current.includes(-3)}
          />
          : ''}

        {pureLineageSkills.map(ls => (
          <React.Fragment key={ls.id}>
            <TableData
              key={ls.id}
              tableData={[`${ls.skill.name}`]}
              show={show.current.includes(-3)}
              onClick={() => showRow(ls.skill.id)}
              selected={show.current.includes(ls.skill.id)}
            />
            <TableDropdown
              key={`Drop-${ls.skill.id}`}
              show={show.current.includes(ls.skill.id) && show.current.includes(-2)}
              categories={["", "Linhagem", "Tipo", "Requisitos"]}
              subtitleIndexes={[1, 2, 3]}
              items={[
                String(ls.skill.description),
                String(ls.lineage.name),
                String(ls.skill.type),
                `Agilidade: ${String(ls.skill.agi)} | Corpo: ${String(ls.skill.bdy)} | Mente: ${String(ls.skill.mnd)} | Nível: ${String(ls.skill.lvl)} | Tamanho Real: ${String(ls.skill.trSiz)} 
                | Tamanho Efetivo: ${String(ls.skill.efSiz)} | ${ls.skill.prerequisiteId
                  ? `Talento: ${String(skills.filter(s => s.id === ls.skill.prerequisiteId).map(s => s.name))}`
                  : `Não Requer outro Talento`}`]}
            />
          </React.Fragment>
        ))}
      </table>
    </React.Fragment>
  )
}