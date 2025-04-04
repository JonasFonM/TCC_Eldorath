/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink, useOutletContext } from "@remix-run/react";
import { lineage, lineage_skill, path, skill } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import React, { useRef, useState } from "react";
import { TableHead } from "~/components/character-sheet/general-table";
import { TableData } from "~/components/character-sheet/general-table-data";
import { GeneralExplain } from "~/components/explanations/general-explain";

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
        <thead>
          <TableHead
            tableTitles={['Talentos']}
            onClick={() => showRow(-1)}
            open={show.current.includes(-1)}
          />
        </thead>

        {skills.map(sk => (
          <React.Fragment key={sk.id}>
            <tbody>
              <TableData
                key={sk.id}
                tableData={[`${sk.name}`]}
                show={show.current.includes(-1)}
                onClick={() => showRow(sk.id)}
                selected={show.current.includes(sk.id)}
              />
            </tbody>

            <tbody style={{ display: show.current.includes(sk.id) && show.current.includes(-1) ? '' : 'none', width: '100%' }} className="table-extension">
              <tr><td>{String(sk.description)}</td></tr>
              <tr><th>Tipo</th></tr>
              <tr><td>{String(sk.type)}</td></tr>
              <tr><th>Requisitos</th></tr>
              <tr><td>Agilidade: {String(sk.agi)}</td></tr>
              <tr><td>Corpo: {String(sk.bdy)}</td></tr>
              <tr><td>Mente: {String(sk.mnd)}</td></tr>
              <tr><td>Nível: {String(sk.lvl)}</td></tr>
              <tr><td>Tamanho Real: {String(sk.trSiz)}</td></tr>
              <tr><td>Tamanho Efetivo: {String(sk.efSiz)}</td></tr>
              {sk.prerequisiteId ? <tr><td>Talento: {String(sk.prerequisiteId)}</td></tr> : ''}
            </tbody>
          </React.Fragment>
        ))}

        {nonPureLineageSkills.length > 0
          ? <thead>
            <TableHead
              tableTitles={['Talentos de Linhagem']}
              onClick={() => showRow(-2)}
              open={show.current.includes(-2)}
            />
          </thead>
          : ''
        }

        {nonPureLineageSkills.map(ls => (
          <React.Fragment key={ls.id}>
            <tbody>
              <TableData
                key={ls.id}
                tableData={[`${ls.skill.name}`]}
                show={show.current.includes(-2)}
                onClick={() => showRow(ls.skill.id)}
                selected={show.current.includes(ls.skill.id)}
              />
            </tbody>

            <tbody style={{ display: show.current.includes(ls.skill.id) && show.current.includes(-2) ? '' : 'none', width: '100%' }} className="table-extension">
              <tr><td>{String(ls.skill.description)}</td></tr>
              <tr><th>Linhagem</th></tr>
              <tr><td style={{ fontVariant: 'small-caps', fontSize: '1.3rem' }}>{String(ls.lineage.name)}</td></tr>
              <tr><th>Tipo</th></tr>
              <tr><td>{String(ls.skill.type)}</td></tr>
              <tr><th>Requisitos</th></tr>
              <tr><td>Agilidade: {String(ls.skill.agi)}</td></tr>
              <tr><td>Corpo: {String(ls.skill.bdy)}</td></tr>
              <tr><td>Mente: {String(ls.skill.mnd)}</td></tr>
              <tr><td>Nível: {String(ls.skill.lvl)}</td></tr>
              <tr><td>Tamanho Real: {String(ls.skill.trSiz)}</td></tr>
              <tr><td>Tamanho Efetivo: {String(ls.skill.efSiz)}</td></tr>
              {ls.skill.prerequisiteId ? <tr><td>Talento: {String(ls.skill.prerequisiteId)}</td></tr> : ''}
            </tbody>
          </React.Fragment>
        ))}

        {pureLineageSkills.length > 0
          ? <thead>
            <TableHead
              tableTitles={['Talentos de Linhagem Pura']}
              onClick={() => showRow(-3)}
              open={show.current.includes(-3)}
            />
          </thead>
          : ''}

        {pureLineageSkills.map(ls => (
          <React.Fragment key={ls.id}>
            <tbody>
              <TableData
                key={ls.id}
                tableData={[`${ls.skill.name}`]}
                show={show.current.includes(-3)}
                onClick={() => showRow(ls.skill.id)}
                selected={show.current.includes(ls.skill.id)}
              />

            </tbody>
            <tbody style={{ display: show.current.includes(ls.skill.id) && show.current.includes(-3) ? '' : 'none', width: '100%' }} className="table-extension">
              <tr><td>{String(ls.skill.description)}</td></tr>
              <tr><th>Linhagem</th></tr>
              <tr><td style={{ fontVariant: 'small-caps', fontSize: '1.3rem' }}>{String(ls.lineage.name) + ' Pura'}</td></tr>
              <tr><th>Tipo</th></tr>
              <tr><td>{String(ls.skill.type)}</td></tr>

              <tr><th>Requisitos</th></tr>
              <tr><td>Agilidade: {String(ls.skill.agi)}</td></tr>
              <tr><td>Corpo: {String(ls.skill.bdy)}</td></tr>
              <tr><td>Mente: {String(ls.skill.mnd)}</td></tr>
              <tr><td>Nível: {String(ls.skill.lvl)}</td></tr>
              <tr><td>Tamanho Real: {String(ls.skill.trSiz)}</td></tr>
              <tr><td>Tamanho Efetivo: {String(ls.skill.efSiz)}</td></tr>
              {ls.skill.prerequisiteId ? <tr><td>Talento: {String(ls.skill.prerequisiteId)}</td></tr> : ''}
            </tbody>
          </React.Fragment>
        ))}

      </table>


    </React.Fragment>
  )
}