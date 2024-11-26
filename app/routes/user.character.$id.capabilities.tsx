import { NavLink, useLoaderData, useOutletContext } from "@remix-run/react";
import { SkillCircle } from "~/components/skill-circle";
import { lineage, path, skill } from "@prisma/client";
import { LSrelations, trainingWithTier } from "~/utils/types.server";
import { LineageCircle } from "~/components/lineage-circle";
import { PathCircle } from "~/components/path-circle";
import { TrainingCircle } from "~/components/training-circle";
import { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ params }) => {
  const characterId = params.id;
  return (characterId)
}

export default function SkillsRoute() {
  const { skills, trainingsWithTier, paths, lineages, pureLineageSkills, nonPureLineageSkills, isPure } = useOutletContext<{ skills: skill[], pureLineageSkills: LSrelations, nonPureLineageSkills: LSrelations, trainingsWithTier: trainingWithTier, paths: path[], lineages: lineage[], isPure: boolean }>();
  const characterId = useLoaderData<string>();

  return (
    <>
      <div className="capability-container">

        <h1 className="title-container">Talentos<NavLink to={`../../new/${characterId}/skills/`} style={{ color: 'blue' }} className='question-button'>+</NavLink></h1>

        <div className="skills-grid">
          {skills.map(skill => (
            <SkillCircle
              key={skill.id}
              skill={skill}
              isSelected={false}
              onClick={() => null}
              isPureLineage={false}
            />
          ))}
        </div>

      </div>

      <div className="capability-container">

        <h1 className="title-container">Linhagens<NavLink to={`../../new/${characterId}/lineages/`} style={{ color: 'blue' }} className='question-button'>+</NavLink></h1>

        {lineages.map(lineage => (
          <LineageCircle key={lineage.id} lineage={lineage} isPure={isPure} isSelected={false}
            onClick={() => null} />
        ))}
        {isPure ? <div className="pure-lineage-skills">
          {pureLineageSkills.map(ls => (
            <SkillCircle
              key={ls.skill.id}
              skill={ls.skill}
              isSelected={false}
              onClick={() => null}
              isPureLineage={true}
            />
          ))}
        </div>

          : null}

        <div className="nonpure-lineage-skills">
          {nonPureLineageSkills.map(ls => (
            <SkillCircle
              key={ls.skill.id}
              skill={ls.skill}
              isSelected={false}
              onClick={() => null}
              isPureLineage={false}
            />
          ))}
        </div>

        <h1 className="title-container">Caminhos<NavLink to={`../../new/${characterId}/paths/`} style={{ color: 'blue' }} className='question-button'>+</NavLink></h1>

        <div className="trainings-grid">
          {paths.map(pa => (
            <PathCircle
              key={pa.id}
              path={pa}
              isSelected={false}
              onClick={() => null}
            />
          ))}
        </div>

        <h1 className="title-container">Treinos<NavLink to={`../../new/${characterId}/trainings/`} style={{ color: 'blue' }} className='question-button'>+</NavLink></h1>

        <div className="trainings-grid">
          {trainingsWithTier.map(tt => (
            <TrainingCircle
              key={tt.training.id}
              training={tt.training}
              isSelected={false}
              onClick={() => null}
            />
          ))}
        </div>

      </div>
    </>
  )
}