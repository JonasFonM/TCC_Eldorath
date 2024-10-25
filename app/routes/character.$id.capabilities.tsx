import { useOutletContext } from "@remix-run/react";
import { SkillCircle } from "~/components/skill-circle";
import { lineage, path, skill } from "@prisma/client";
import { LSrelations, trainingWithTier } from "~/utils/types.server";
import { LineageCircle } from "~/components/lineage-circle";
import { PathCircle } from "~/components/path-circle";
import { TrainingCircle } from "~/components/training-circle";

export default function SkillsRoute() {
  const { skills, trainingsWithTier, paths, lineages, pureLineageSkills, nonPureLineageSkills, isPure } = useOutletContext<{ skills: skill[], pureLineageSkills: LSrelations, nonPureLineageSkills: LSrelations, trainingsWithTier: trainingWithTier, paths: path[], lineages: lineage[], isPure: boolean }>();

  return (
    <>
      <h1>Skills</h1>
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

      <h1>Lineages</h1>
      {lineages.map(lineage => (
        <LineageCircle key={lineage.id} lineage={lineage} isSelected={false}
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
      </div> : null}

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

      <h1>Paths</h1>
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

      <h1>Trainings</h1>
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
    </>
  )
}