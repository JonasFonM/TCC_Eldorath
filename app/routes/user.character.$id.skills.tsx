/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink, useOutletContext } from "@remix-run/react";
import { lineage, path, skill } from "@prisma/client";
import { LSrelations } from "~/utils/types.server";
import { LoaderFunction } from "@remix-run/node";
import { SkillTableHead } from "~/components/character-sheet/skill-table";
import { SkillTableData } from "~/components/character-sheet/skill-table-data";
import React, { useState } from "react";
import { SkillExplain } from "~/components/explanations/skill-explain";

export const loader: LoaderFunction = async ({ params }) => {
  const characterId = params.id;
  return (characterId)
}

export default function SkillsRoute() {
  const { characterId, isAuthor, skills, pureLineageSkills, nonPureLineageSkills } = useOutletContext<{ characterId: string, isAuthor: boolean, skills: skill[], pureLineageSkills: LSrelations, nonPureLineageSkills: LSrelations, paths: path[], lineages: lineage[], isPure: boolean }>();
  const [show, setShow] = useState<number>();
  const [showSkill, setShowSkill] = useState<number>();

  const showRow = () => {
    show != 1 ?
      setShow(() => {
        return 1;
      })
      :
      setShow(() => {
        return 0;
      })
  }

  const explainSkill = (id: number) => {
    showSkill != id ?
      setShowSkill(() => {
        return id;
      })
      :
      setShowSkill(() => {
        return 0;
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
        <tbody>

          <SkillTableHead onClick={() => showRow()} />
          {pureLineageSkills.map(pls => (
            <React.Fragment key={pls.skill.id}>
              <SkillTableData
                skill={pls.skill}
                show={show === 1}
                onClick={() => explainSkill(pls.skill.id)}
                selected={false}
              />

            </React.Fragment>
          ))}


          {nonPureLineageSkills.map(npls => (
            <React.Fragment key={npls.skill.id}>
              <SkillTableData
                skill={npls.skill}
                show={show === 1}
                onClick={() => explainSkill(npls.skill.id)}
                selected={false}

              />
            </React.Fragment>
          ))}

          {skills.map(skill => (
            <React.Fragment key={skill.id}>
              <SkillTableData
                skill={skill}
                show={show === 1}
                onClick={() => explainSkill(skill.id)}
                selected={false}
              />
            </React.Fragment>
          ))}

        </tbody>

      </table>

      {pureLineageSkills.map(pls => (
        <React.Fragment key={pls.skill.id}>
          <SkillExplain
            style={'linear-gradient(to bottom right, gold, goldenrod)'}
            skill={pls.skill}
            isHidden={showSkill != pls.skill.id}
            onCancel={() => setShowSkill(0)}
          />

        </React.Fragment>
      ))}

      {nonPureLineageSkills.map(npls => (
        <React.Fragment key={npls.skill.id}>

          <SkillExplain style={'linear-gradient(to bottom right, goldenrod, darkgoldenrod)'}
            skill={npls.skill}
            isHidden={showSkill != npls.skill.id}
            onCancel={() => setShowSkill(0)}
          />

        </React.Fragment>
      ))}

      {skills.map(skill => (
        <React.Fragment key={skill.id}>
          <SkillExplain
            style={'linear-gradient(to bottom right, darkgoldenrod, darkyellow )'}
            skill={skill}
            isHidden={showSkill != skill.id}
            onCancel={() => setShowSkill(0)} />

        </React.Fragment>
      ))}


    </React.Fragment>
  )
}