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
        <button className="question-button" onClick={() => showRow("ETalentos")}>?</button>
      </div>

      <GeneralExplain
        title={'Talentos'}
        description="Talentos têm efeitos diferentes que mudam como você interage com o jogo, principalmente em Combate. Eles são divididos em Características, Técnicas e Magias."
        isHidden={!isShown("ETalentos")}
        onCancel={() => showRow("ETalentos")}
      />

      <table>
        <TableHead
          tableTitles={['Talentos']}
          onClick={() => showRow("TBTalentos")}
          open={isShown("TBTalentos")}
          error={false}
        />
        {skills.map(sk => (
          <React.Fragment key={sk.id}>
            <TableData
              key={`Data-${sk.id}`}
              tableData={[`${sk.name}`]}
              show={isShown("TBTalentos")}
              onClick={() => showRow(`Talento-${sk.id}`)}
              selected={isShown(`Talento-${sk.id}`)}
              error={false}
            />
            <TableDropdown
              key={`Drop-${sk.id}`}
              show={isShown(`Talento-${sk.id}`) && isShown("TBTalentos")}
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
            onClick={() => showRow("TBLinhagem")}
            open={isShown("TBLinhagem")}
            error={false}
          />
          : ''
        }
        {nonPureLineageSkills.map(ls => (
          <React.Fragment key={ls.id}>
            <TableData
              key={`Data-${ls.id}`}
              tableData={[`${ls.skill.name}`]}
              show={isShown("TBLinhagem")}
              onClick={() => showRow(`TalentoL-${ls.skill.id}`)}
              selected={isShown(`TalentoL-${ls.skill.id}`)}
              error={false}
            />
            <TableDropdown
              key={`Drop-${ls.skill.id}`}
              show={isShown(`TalentoL-${ls.skill.id}`) && isShown("TBLinhagem")}
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
            onClick={() => showRow("TBLinhagemPura")}
            open={isShown("TBLinhagemPura")}
            error={false}
          />
          : ''}

        {pureLineageSkills.map(ls => (
          <React.Fragment key={ls.id}>
            <TableData
              key={ls.id}
              tableData={[`${ls.skill.name}`]}
              show={isShown("TBLinhagemPura")}
              onClick={() => showRow(`TalentoL-${ls.skill.id}`)}
              selected={isShown(`TalentoL-${ls.skill.id}`)}
              error={false}
            />
            <TableDropdown
              key={`Drop-${ls.skill.id}`}
              show={isShown(`TalentoL-${ls.skill.id}`) && isShown("TBLinhagemPura")}
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