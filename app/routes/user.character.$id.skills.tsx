/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink, useOutletContext } from "@remix-run/react";
import { lineage, lineage_skill, path, skill } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import React, { useState } from "react";
import { TableHead } from "~/components/character-sheet/general-table";
import { TableData } from "~/components/character-sheet/general-table-data";

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

  const [show, setShow] = useState<number[]>([]);
  const [showSkill, setShowSkill] = useState<number[]>([]);

  const showRow = (n: number) => {
    setShow((prevN) => {
      const isSelected = prevN.includes(n);

      if (isSelected) {
        return prevN.filter(id => id !== n);
      }

      return [...prevN, n];
    })
  }

  const explainSkill = (skillId: number) => {
    setShowSkill((prevSkills) => {
      const isSelected = prevSkills.includes(skillId);

      if (isSelected) {
        return prevSkills.filter(id => id !== skillId);
      }

      return [...prevSkills, skillId];
    })
  }

  return (
    <React.Fragment>
      <div className="title-container">
        {
          isAuthor ?
            <NavLink to={`../../new/${characterId}/skills/`}> <h1 style={{ marginTop: '0', marginBottom: '0', padding: '0' }}>Talentos</h1></NavLink>
            :
            <h1 style={{ marginTop: '0', marginBottom: '0', padding: '0' }}>Talentos</h1>
        }
        <NavLink className="question-button" to={`/user/home/atr/`}>?</NavLink>
      </div>

      <table>
        <thead>
          <TableHead
            tableTitles={['Talentos']}
            onClick={() => showRow(1)}
            open={show.includes(1)}
          />
        </thead>

        {skills.map(sk => (
          <React.Fragment key={sk.id}>
            <tbody>
              <TableData
                key={sk.id}
                tableData={[`${sk.name}`]}
                show={show.includes(1)}
                onClick={() => explainSkill(sk.id)}
                selected={showSkill.includes(sk.id)}
              />
            </tbody>

            <tbody style={{ display: showSkill.includes(sk.id) && show.includes(1) ? '' : 'none', width: '100%' }} className="table-extension">
              <tr><td>{String(sk.description)}</td></tr>
              <tr><th>Tipo</th></tr>
              <tr><td>{String(sk.type)}</td></tr>
              {sk.techniqueSubtype ? <tr><td>{String(sk.techniqueSubtype)}</td></tr> : ''}
              <tr><th>Requisitos</th></tr>
              <tr><td>Agilidade: {String(sk.agi)}</td></tr>
              <tr><td>Corpo: {String(sk.bdy)}</td></tr>
              <tr><td>Mente: {String(sk.mnd)}</td></tr>
              <tr><td>Nível: {String(sk.lvl)}</td></tr>
              <tr><td>Tamanho Real: {String(sk.trSiz)}</td></tr>
              <tr><td>Tamanho Efetivo: {String(sk.rlSiz)}</td></tr>
              {sk.prerequisiteId ? <tr><td>Talento: {String(sk.prerequisiteId)}</td></tr> : ''}
            </tbody>
          </React.Fragment>
        ))}

        {nonPureLineageSkills.length > 0
          ? <thead>
            <TableHead
              tableTitles={['Talentos de Linhagem']}
              onClick={() => showRow(2)}
              open={show.includes(2)}
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
                show={show.includes(2)}
                onClick={() => explainSkill(ls.skill.id)}
                selected={showSkill.includes(ls.skill.id)}
              />
            </tbody>

            <tbody style={{ display: showSkill.includes(ls.skill.id) && show.includes(2) ? '' : 'none', width: '100%' }} className="table-extension">
              <tr><td>{String(ls.skill.description)}</td></tr>
              <tr><th>Linhagem</th></tr>
              <tr><td style={{ fontVariant: 'small-caps', fontSize: '1.3rem' }}>{String(ls.lineage.name)}</td></tr>
              <tr><th>Tipo</th></tr>
              <tr><td>{String(ls.skill.type)}</td></tr>
              {ls.skill.techniqueSubtype ? <tr><td>{String(ls.skill.techniqueSubtype)}</td></tr> : ''}
              <tr><th>Requisitos</th></tr>
              <tr><td>Agilidade: {String(ls.skill.agi)}</td></tr>
              <tr><td>Corpo: {String(ls.skill.bdy)}</td></tr>
              <tr><td>Mente: {String(ls.skill.mnd)}</td></tr>
              <tr><td>Nível: {String(ls.skill.lvl)}</td></tr>
              <tr><td>Tamanho Real: {String(ls.skill.trSiz)}</td></tr>
              <tr><td>Tamanho Efetivo: {String(ls.skill.rlSiz)}</td></tr>
              {ls.skill.prerequisiteId ? <tr><td>Talento: {String(ls.skill.prerequisiteId)}</td></tr> : ''}
            </tbody>
          </React.Fragment>
        ))}

        {pureLineageSkills.length > 0
          ? <thead>
            <TableHead
              tableTitles={['Talentos de Linhagem Pura']}
              onClick={() => showRow(3)}
              open={show.includes(3)}
            />
          </thead>
          : ''}

        {pureLineageSkills.map(ls => (
          <React.Fragment key={ls.id}>
            <tbody>
              <TableData
                key={ls.id}
                tableData={[`${ls.skill.name}`]}
                show={show.includes(3)}
                onClick={() => explainSkill(ls.skill.id)}
                selected={showSkill.includes(ls.skill.id)}
              />

            </tbody>
            <tbody style={{ display: showSkill.includes(ls.skill.id) && show.includes(3) ? '' : 'none', width: '100%' }} className="table-extension">
              <tr><td>{String(ls.skill.description)}</td></tr>
              <tr><th>Linhagem</th></tr>
              <tr><td style={{ fontVariant: 'small-caps', fontSize: '1.3rem' }}>{String(ls.lineage.name) + ' Pura'}</td></tr>
              <tr><th>Tipo</th></tr>
              <tr><td>{String(ls.skill.type)}</td></tr>
              {ls.skill.techniqueSubtype ? <tr><td>{String(ls.skill.techniqueSubtype)}</td></tr> : ''}
              <tr><th>Requisitos</th></tr>
              <tr><td>Agilidade: {String(ls.skill.agi)}</td></tr>
              <tr><td>Corpo: {String(ls.skill.bdy)}</td></tr>
              <tr><td>Mente: {String(ls.skill.mnd)}</td></tr>
              <tr><td>Nível: {String(ls.skill.lvl)}</td></tr>
              <tr><td>Tamanho Real: {String(ls.skill.trSiz)}</td></tr>
              <tr><td>Tamanho Efetivo: {String(ls.skill.rlSiz)}</td></tr>
              {ls.skill.prerequisiteId ? <tr><td>Talento: {String(ls.skill.prerequisiteId)}</td></tr> : ''}
            </tbody>
          </React.Fragment>
        ))}

      </table>


    </React.Fragment>
  )
}