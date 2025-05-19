/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink, useOutletContext } from "@remix-run/react";
import { lineage, lineage_skill, path, skill } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import React, { useRef, useState } from "react";
import { TableHead } from "~/components/character-sheet/table-head";
import { TableData } from "~/components/character-sheet/table-data";
import { GeneralExplain } from "~/components/explanations/general-explain";
import { TableDropdown } from "~/components/character-sheet/table-dropdown";
import { useShowRow } from "~/components/context-providers/showRowContext";

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

  const { showRow, isShown } = useShowRow();


  return (
    <React.Fragment>
      <div className="title-container">
        <h1 style={{ marginTop: '0', marginBottom: '0', padding: '0' }}>Talentos</h1>
        <button className="question-button" onClick={() => showRow(-5)}>?</button>
      </div>

      <GeneralExplain
        title={'Talentos'}
        description="Talentos têm efeitos diferentes que mudam como você interage com o jogo, principalmente em Combate. Eles são divididos em Características, Técnicas e Magias."
        isHidden={!isShown(-5)}
        onCancel={() => showRow(-5)}
      />

      <table>
        <TableHead
          tableTitles={['Talentos']}
          onClick={() => showRow(-1)}
          open={isShown(-1)}
        />
        {skills.map(sk => (
          <React.Fragment key={sk.id}>
            <TableData
              key={`Data-${sk.id}`}
              tableData={[`${sk.name}`]}
              show={isShown(-1)}
              onClick={() => showRow(sk.id)}
              selected={isShown(sk.id)}
            />
            <TableDropdown
              key={`Drop-${sk.id}`}
              show={isShown(sk.id) && isShown(-1)}
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
            open={isShown(-2)}
          />
          : ''
        }
        {nonPureLineageSkills.map(ls => (
          <React.Fragment key={ls.id}>
            <TableData
              key={`Data-${ls.id}`}
              tableData={[`${ls.skill.name}`]}
              show={isShown(-2)}
              onClick={() => showRow(ls.skill.id)}
              selected={isShown(ls.skill.id)}
            />
            <TableDropdown
              key={`Drop-${ls.skill.id}`}
              show={isShown(ls.skill.id) && isShown(-2)}
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
            open={isShown(-3)}
          />
          : ''}

        {pureLineageSkills.map(ls => (
          <React.Fragment key={ls.id}>
            <TableData
              key={ls.id}
              tableData={[`${ls.skill.name}`]}
              show={isShown(-3)}
              onClick={() => showRow(ls.skill.id)}
              selected={isShown(ls.skill.id)}
            />
            <TableDropdown
              key={`Drop-${ls.skill.id}`}
              show={isShown(ls.skill.id) && isShown(-2)}
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