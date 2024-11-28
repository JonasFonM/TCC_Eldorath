import { NavLink, useOutletContext } from "@remix-run/react";
import { lineage, path, skill } from "@prisma/client";
import { LSrelations, trainingWithTier } from "~/utils/types.server";
import { LoaderFunction } from "@remix-run/node";
import { SkillTableHead } from "~/components/character-sheet/skill-table";
import { SkillTableData } from "~/components/character-sheet/skill-table-data";
import { useState } from "react";
import { SkillExplain } from "~/components/explanations/skill-explain";

export const loader: LoaderFunction = async ({ params }) => {
  const characterId = params.id;
  return (characterId)
}

export default function SkillsRoute() {
  const { skills, pureLineageSkills, nonPureLineageSkills } = useOutletContext<{ skills: skill[], pureLineageSkills: LSrelations, nonPureLineageSkills: LSrelations, trainingsWithTier: trainingWithTier, paths: path[], lineages: lineage[], isPure: boolean }>();
  const [show, setShow] = useState<number>();

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
  const [showSkill, setShowSkill] = useState<number>();

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
    <>

      <div className="title-container">
        <NavLink to={`../new/skills/`}> <h1 style={{ marginTop: '0', marginBottom: '0', padding: '0' }}>Talentos</h1></NavLink>
        <NavLink className="question-button" to={`/user/home/atr/`}>?</NavLink>
      </div>

      <table>

        <SkillTableHead onClick={() => showRow()} />

        {skills.map(skill => (
          <>
            <SkillTableData
              key={skill.id}
              skill={skill}
              show={show === 1}
              onClick={() => explainSkill(skill.id)}
            />
            <SkillExplain style={'linear-gradient(to bottom right, gold, darkgoldenrod)'} skill={skill} isHidden={showSkill != skill.id} onCancel={() => setShowSkill(0)} />

          </>

        ))}
      </table>

      {pureLineageSkills.map(pls => (
        <>
          <SkillTableData
            key={pls.skill.id}
            skill={pls.skill}
            show={show === 1}
            onClick={() => explainSkill(pls.skill.id)}
          />
          <SkillExplain style={'linear-gradient(to bottom right, red, yellow)'} skill={pls.skill} isHidden={showSkill != pls.skill.id} onCancel={() => setShowSkill(0)} />

        </>

      ))}


      {nonPureLineageSkills.map(npls => (
        <>
          <SkillTableData
            key={npls.skill.id}
            skill={npls.skill}
            show={show === 1}
            onClick={() => explainSkill(npls.skill.id)}
          />
          <SkillExplain style={'linear-gradient(to bottom right, red, yellow)'} skill={npls.skill} isHidden={showSkill != npls.skill.id} onCancel={() => setShowSkill(0)} />

        </>

      ))}


    </>
  )
}