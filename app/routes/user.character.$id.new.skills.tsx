import { skill } from "@prisma/client";
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { NavLink, useLoaderData, useOutletContext } from "@remix-run/react";
import { useState } from "react";
import { SkillTableHead } from "~/components/character-sheet/skill-table";
import { SkillTableData } from "~/components/character-sheet/skill-table-data";
import { SkillCircle } from "~/components/skill-circle";
import { requireUserId } from "~/utils/auth.server";
import { submitCharSkills } from "~/utils/character.server";
import { prisma } from "~/utils/prisma.server";
import { LSrelations } from "~/utils/types.server";


export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request)
  const characterId = Number(params.id)
  const character_lineages = await prisma.character_lineage.findMany({
    where: { characterId },
    include: { lineage: true }
  });

  const character = await prisma.character.findUnique({
    where: { id: characterId },
    include: { skills: true }
  });


  const paths = await prisma.character_path.findMany({
    where:
      { characterId: characterId },
    include: { path: true }
  });

  const selectMagics = paths.map(pss => pss.path.addMagics)

  const maxMagics = selectMagics.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

  const selectTechniques = paths.map(pss => pss.path.addTechniques)

  const maxTechniques = selectTechniques.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

  const selectOaths = paths.map(pss => pss.path.addOaths)

  const maxOaths = selectOaths.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

  const selectTricks = paths.map(pss => pss.path.addTricks)

  const maxTricks = selectTricks.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

  const selectManeuvers = paths.map(pss => pss.path.addManeuvers)

  const maxManeuvers = selectManeuvers.reduce((accumulator, currentValue) => accumulator + currentValue, 0)

  const maxSelectable = character?.pendingSkills;

  const general_skills = await prisma.skill.findMany({
    where: {
      lineages: { none: {} },
      id: { notIn: character?.skills.map(skill => skill.skillId) },
      agi: {
        lte: character?.agility
      },
      bdy: {
        lte: character?.body
      },
      mnd: {
        lte: character?.mind
      },
      lvl: {
        lte: character?.level
      },
      OR: [{
        trSiz: {
          lte: character?.trueSize,
        },
        rlSiz: {
          lte: character?.relativeSize,
        },
      },
      { trSiz: { lte: 0 } },
      { rlSiz: { lte: 0 } },
      ],
      AND: [{
        OR: [{
          prerequisiteId: { in: character?.skills.map(skill => skill.skillId) },
        },
        { prerequisiteId: null },
        ]
      }]

    },

  });

  const characteristics = general_skills.filter(gs => gs.type == 'CHARACTERISTIC')
  const magics = general_skills.filter(gs => gs.type == 'MAGIC')
  const techniques = general_skills.filter(gs => gs.type == 'TECHNIQUE')
  const oaths = general_skills.filter(gs => gs.techniqueSubtype == 'OATH')
  const maneuvers = general_skills.filter(gs => gs.techniqueSubtype == 'MANEUVER')
  const tricks = general_skills.filter(gs => gs.techniqueSubtype == 'TRICK')

  const isPure = character_lineages.length === 1;

  const pureLineageSkills = await prisma.lineage_skill.findMany({
    where: {
      skillId: { notIn: character?.skills.map(skill => skill.skillId) },
      lineageId: { in: character_lineages.map(cl => cl.lineageId) },
      pureSkill: true
    },
    include: { skill: true },
  });

  const nonPureLineageSkills = await prisma.lineage_skill.findMany({
    where: {
      skillId: { notIn: character?.skills.map(skill => skill.skillId) },
      lineageId: { in: character_lineages.map(cl => cl.lineageId) },
      pureSkill: false
    },
    include: { skill: true },
  });


  const isAuthor = userId === character?.authorId

  return isAuthor ? ({
    userId, maxSelectable, maxMagics, maxTechniques, maxManeuvers, maxOaths, maxTricks,
    characteristics, magics, techniques, oaths, maneuvers, tricks,
    pureLineageSkills, nonPureLineageSkills, isPure, characterId
  })
    :
    redirect(`/user/character/${characterId}/skills/`);
  ;
}


export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData();
  const selectedSkills = form.getAll('skills') as string[];
  const pendingSkills = form.get('pendingSkills') as string;
  const selectedSkillIds = selectedSkills.map(id => parseInt(id))
  const characterId = params.id

  await submitCharSkills(selectedSkillIds, Number(characterId), Number(pendingSkills))
  return redirect(`../../skills/`)
}
export default function SkillSelectionRoute() {
  const {
    nonPureLineageSkills, pureLineageSkills, isPure,
    characteristics, magics, maneuvers, tricks, oaths,
    maxSelectable, maxMagics, maxTechniques, maxManeuvers, maxOaths, maxTricks, }

    =

    useLoaderData<{
      characterId: string,
      general_skills: skill[], pureLineageSkills: LSrelations, nonPureLineageSkills: LSrelations, isPure: boolean,
      characteristics: skill[], magics: skill[], maneuvers: skill[], tricks: skill[], oaths: skill[]
      maxSelectable: number, maxMagics: number, maxTechniques: number, maxManeuvers: number, maxOaths: number, maxTricks: number
    }>();

  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);
  const [selectedMagics, setSelectedMagics] = useState<number[]>([]);
  const [selectedTechniques, setSelectedTechniques] = useState<number[]>([]);
  const [selectedManeuvers, setSelectedManeuvers] = useState<number[]>([]);
  const [selectedOaths, setSelectedOaths] = useState<number[]>([]);
  const [selectedTricks, setSelectedTricks] = useState<number[]>([]);

  const isMaxSelected = selectedSkills.length >= maxSelectable;
  const isMaxMagics = selectedMagics.length >= maxMagics;
  const isMaxTechniques = selectedTechniques.length >= maxTechniques;
  const isMaxManeuvers = selectedManeuvers.length >= maxManeuvers;
  const isMaxOaths = selectedOaths.length >= maxOaths;
  const isMaxTricks = selectedTricks.length >= maxTricks;

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


  const handleSkillClick = (skillId: number) => {
    setSelectedSkills((prevSkills) => {

      const isSelected = prevSkills.includes(skillId);

      const newSelectedSkills = isSelected
        ? prevSkills.filter(id => id !== skillId)
        : [...prevSkills, skillId];

      return newSelectedSkills;
    });
  };

  const handleMagicClick = (skillId: number) => {
    setSelectedMagics((prevSkills) => {

      const isSelected = prevSkills.includes(skillId);

      const newSelectedSkills = isSelected
        ? prevSkills.filter(id => id !== skillId)
        : [...prevSkills, skillId];

      return newSelectedSkills;
    })

  };

  const handleTechniqueClick = (skillId: number) => {
    setSelectedTechniques((prevSkills) => {

      const isSelected = prevSkills.includes(skillId);

      const newSelectedSkills = isSelected
        ? prevSkills.filter(id => id !== skillId)
        : [...prevSkills, skillId];

      return newSelectedSkills;
    })

  };

  const handleManeuverClick = (skillId: number) => {
    setSelectedManeuvers((prevSkills) => {

      const isSelected = prevSkills.includes(skillId);

      const newSelectedSkills = isSelected
        ? prevSkills.filter(id => id !== skillId)
        : [...prevSkills, skillId];

      return newSelectedSkills;
    })

  };

  const handleOathClick = (skillId: number) => {
    setSelectedOaths((prevSkills) => {

      const isSelected = prevSkills.includes(skillId);

      const newSelectedSkills = isSelected
        ? prevSkills.filter(id => id !== skillId)
        : [...prevSkills, skillId];

      return newSelectedSkills;
    })

  };

  const handleTrickClick = (skillId: number) => {
    setSelectedTricks((prevSkills) => {

      const isSelected = prevSkills.includes(skillId);

      const newSelectedSkills = isSelected
        ? prevSkills.filter(id => id !== skillId)
        : [...prevSkills, skillId];

      return newSelectedSkills;
    })

  };

  return (
    <>
      {maxSelectable > 0 || maxMagics > 0 || maxTechniques > 0 || maxManeuvers > 0 || maxOaths > 0 || maxTricks > 0 ?
        <>

          <form method="post">

            <h1 className="title-container">Escolha seus Talentos<NavLink to={`../../skills/`} style={{ color: 'red' }} className="question-button">X</NavLink></h1>

            <table>
              <tbody>

                <SkillTableHead onClick={() => showRow()} />

                {characteristics.map(skill => (
                  <SkillTableData
                    key={skill.id}
                    skill={skill}
                    show={show === 1}
                    selected={selectedSkills.includes(skill.id)}
                    onClick={() => !isMaxSelected || selectedSkills.includes(skill.id) ? handleSkillClick(skill.id) : alert((`Você já escolheu o seu limite de Características.`))}
                  />
                ))}

                {maneuvers.map(skill => (
                  <SkillTableData
                    key={skill.id}
                    skill={skill}
                    show={show === 1}
                    selected={selectedManeuvers.includes(skill.id) || selectedTechniques.includes(skill.id) || selectedSkills.includes(skill.id)}
                    onClick={() => !isMaxManeuvers || selectedManeuvers.includes(skill.id) ? handleManeuverClick(skill.id) : !isMaxTechniques || selectedTechniques.includes(skill.id) ? handleTechniqueClick(skill.id) : !isMaxSelected || selectedSkills.includes(skill.id) ? handleSkillClick(skill.id) : alert((`Você já escolheu o seu limite de Manobras.`))}
                  />
                ))}

                {oaths.map(skill => (
                  <SkillTableData
                    key={skill.id}
                    skill={skill}
                    show={show === 1}
                    selected={selectedOaths.includes(skill.id) || selectedTechniques.includes(skill.id) || selectedSkills.includes(skill.id)}
                    onClick={() => !isMaxOaths || selectedOaths.includes(skill.id) ? handleOathClick(skill.id) : !isMaxTechniques || selectedTechniques.includes(skill.id) ? handleTechniqueClick(skill.id) : !isMaxSelected || selectedSkills.includes(skill.id) ? handleSkillClick(skill.id) : alert((`Você já escolheu o seu limite de Juramentos.`))}
                  />
                ))}
                {tricks.map(skill => (
                  <SkillTableData
                    key={skill.id}
                    skill={skill}
                    show={show === 1}
                    selected={selectedTricks.includes(skill.id) || selectedTechniques.includes(skill.id) || selectedSkills.includes(skill.id)}

                    onClick={() => !isMaxTricks || selectedTricks.includes(skill.id) ? handleTrickClick(skill.id) : !isMaxTechniques || selectedTechniques.includes(skill.id) ? handleTechniqueClick(skill.id) : !isMaxSelected || selectedSkills.includes(skill.id) ? handleSkillClick(skill.id) : alert((`Você já escolheu o seu limite de Truques.`))}
                  />
                ))}
                {magics.map(skill => (
                  <SkillTableData
                    key={skill.id}
                    skill={skill}
                    show={show === 1}
                    selected={selectedMagics.includes(skill.id) || selectedSkills.includes(skill.id)}
                    onClick={() => !isMaxMagics || selectedMagics.includes(skill.id) ? handleMagicClick(skill.id) : !isMaxSelected || selectedSkills.includes(skill.id) ? handleSkillClick(skill.id) : alert((`Você já escolheu o seu limite de Mágicas.`))}
                  />
                ))}

              </tbody>

            </table>

            {nonPureLineageSkills.length > 0 ? <h1>Talento(s) Exclusivos de Linhagem</h1> : ''}

            <div className="nonpure-lineage-skills">
              {nonPureLineageSkills.map(ls => (
                <SkillCircle
                  key={ls.skill.id}
                  skill={ls.skill}
                  isSelected={selectedSkills.includes(ls.skill.id)}
                  onClick={() => !isMaxSelected || selectedSkills.includes(ls.skill.id) ? handleSkillClick(ls.skill.id) : alert((`Você já escolheu o seu limite de Talentos.`))}
                  isPureLineage={false}
                />
              ))}
            </div>

            {isPure && pureLineageSkills.length > 0 ? <h1>Talento(s) Exclusivos de Linhagem Pura</h1> : ''}

            <div className="pure-lineage-skills">
              {pureLineageSkills.map(ls => (
                <SkillCircle
                  key={ls.skill.id}
                  skill={ls.skill}
                  isSelected={selectedSkills.includes(ls.skill.id)}
                  onClick={() => !isMaxSelected || selectedSkills.includes(ls.skill.id) ? handleSkillClick(ls.skill.id) : alert((`Você já escolheu o seu limite de Talentos.`))}
                  isPureLineage={true}
                />
              ))}
            </div>
            {
              selectedManeuvers.map(skillId => (
                <input type="hidden" key={skillId} name="skills" value={skillId} />
              ))
            }
            {
              selectedOaths.map(skillId => (
                <input type="hidden" key={skillId} name="skills" value={skillId} />
              ))
            }

            {
              selectedTricks.map(skillId => (
                <input type="hidden" key={skillId} name="skills" value={skillId} />
              ))
            }

            {
              selectedTechniques.map(skillId => (
                <input type="hidden" key={skillId} name="skills" value={skillId} />
              ))
            }

            {
              selectedMagics.map(skillId => (
                <input type="hidden" key={skillId} name="skills" value={skillId} />
              ))
            }

            {selectedSkills.map(skillId => (
              <input type="hidden" key={skillId} name="skills" value={skillId} />
            ))
            }

            <input type="hidden" key={maxSelectable} name="pendingSkills" value={maxSelectable} />

            <button type="submit" className="button">Confirmar</button>

          </form>

        </>

        :

        <>
          <h1 className="title-container">Máximo de escolhas atingido</h1>
          <NavLink to={`../../skills/`} className="button">Sair</NavLink>
        </>
      }

    </>

  );
}