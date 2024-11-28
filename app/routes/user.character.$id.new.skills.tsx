import { skill } from "@prisma/client";
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import { useState } from "react";
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


  const stats = await prisma.charStats.findUnique({
    where: { characterId: characterId }
  });

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
          lte: stats?.trueSize,
        },
        rlSiz: {
          lte: stats?.relativeSize,
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

  return json({
    userId, maxSelectable, maxMagics, maxTechniques, maxManeuvers, maxOaths, maxTricks,
    characteristics, magics, techniques, oaths, maneuvers, tricks,
    pureLineageSkills, nonPureLineageSkills, isPure, characterId
  });
}


export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData();
  const selectedSkills = form.getAll('skills') as string[];
  const pendingSkills = form.get('pendingSkills') as string;
  const selectedSkillIds = selectedSkills.map(id => parseInt(id))
  const characterId = params.id

  await submitCharSkills(selectedSkillIds, Number(characterId), Number(pendingSkills))
  await prisma.charStats.delete({
    where: { characterId: Number(characterId) }
  })
  return redirect(`/user/character/${characterId}/capabilities`)
}

export default function SkillSelectionRoute() {
  const {
    characterId,
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
          <ul className="skillnav">
            <li><NavLink to={`/user/character/${characterId}`}>Todos</NavLink></li>
            <li><NavLink to={`/user/character/new/${characterId}/skills`}>Características</NavLink></li>
            <li><NavLink to={`/user/character/new/${characterId}/lineages`}>Técnicas</NavLink></li>
            <li><NavLink to={`/user/character/new/${characterId}/paths`}>Manobras</NavLink></li>
            <li><NavLink to={`/user/character/new/${characterId}/trainings`}>Juramentos</NavLink></li>
            <li><NavLink to={`/user/character/new/${characterId}/inventory`}>Trapaças</NavLink></li>
            <li><NavLink to={`/user/character/new/${characterId}/inventory`}>Mágicas</NavLink></li>
          </ul>
          <form method="post">

            <h1 style={{ marginLeft: '164px' }} className="title-container">Escolha seus Talentos<NavLink to={`/user/character/${characterId}/capabilities/`} style={{ color: 'red' }} className="question-button">X</NavLink></h1>

            <div className="skill-container">

              <div className="col-12">

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

              </div>

              <div className="col-12">

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

              </div>

              <div className="col-12">
                
                <h1>Características</h1>

                <div className="skills-grid">
                  {characteristics.map(skill => (
                    <SkillCircle
                      key={skill.id}
                      skill={skill}
                      isSelected={selectedSkills.includes(skill.id)}
                      onClick={() => !isMaxSelected || selectedSkills.includes(skill.id) ? handleSkillClick(skill.id) : alert((`Você já escolheu o seu limite de Características.`))}
                      isPureLineage={false}
                    />
                  ))}
                </div>
              </div>

              <div className="col-12">

                <div className="col-4">

                  <h1>Manobras</h1>

                  <div className="skills-grid">
                    {maneuvers.map(skill => (
                      <SkillCircle
                        key={skill.id}
                        skill={skill}
                        isSelected={selectedManeuvers.includes(skill.id) || selectedTechniques.includes(skill.id) || selectedSkills.includes(skill.id)}
                        onClick={() => !isMaxManeuvers || selectedManeuvers.includes(skill.id) ? handleManeuverClick(skill.id) : !isMaxTechniques || selectedTechniques.includes(skill.id) ? handleTechniqueClick(skill.id) : !isMaxSelected || selectedSkills.includes(skill.id) ? handleSkillClick(skill.id) : alert((`Você já escolheu o seu limite de Manobras.`))}
                        isPureLineage={false}
                      />
                    ))}
                  </div>
                </div>

                {
                  selectedManeuvers.map(skillId => (
                    <input type="hidden" key={skillId} name="skills" value={skillId} />
                  ))
                }

                <div className="col-4">

                  <h1>Juramentos</h1>

                  <div className="skills-grid">
                    {oaths.map(skill => (
                      <SkillCircle
                        key={skill.id}
                        skill={skill}
                        isSelected={selectedOaths.includes(skill.id) || selectedTechniques.includes(skill.id) || selectedSkills.includes(skill.id)}
                        onClick={() => !isMaxOaths || selectedOaths.includes(skill.id) ? handleOathClick(skill.id) : !isMaxTechniques || selectedTechniques.includes(skill.id) ? handleTechniqueClick(skill.id) : !isMaxSelected || selectedSkills.includes(skill.id) ? handleSkillClick(skill.id) : alert((`Você já escolheu seu limite de Juramentos.`))}
                        isPureLineage={false}
                      />
                    ))}
                  </div>
                </div>

                {
                  selectedOaths.map(skillId => (
                    <input type="hidden" key={skillId} name="skills" value={skillId} />
                  ))
                }

                <div className="col-4">

                  <h1>Trapaças</h1>

                  <div className="skills-grid">
                    {tricks.map(skill => (
                      <SkillCircle
                        key={skill.id}
                        skill={skill}
                        isSelected={selectedTricks.includes(skill.id) || selectedTechniques.includes(skill.id) || selectedSkills.includes(skill.id)}
                        onClick={() => !isMaxTricks || selectedTricks.includes(skill.id) ? handleTrickClick(skill.id) : !isMaxTechniques || selectedTechniques.includes(skill.id) ? handleTechniqueClick(skill.id) : !isMaxSelected || selectedSkills.includes(skill.id) ? handleSkillClick(skill.id) : alert((`Você já escolheu seu limite de Trapaças.`))}
                        isPureLineage={false}
                      />
                    ))}
                  </div>
                </div>

                {
                  selectedTricks.map(skillId => (
                    <input type="hidden" key={skillId} name="skills" value={skillId} />
                  ))
                }
              </div>

              {
                selectedTechniques.map(skillId => (
                  <input type="hidden" key={skillId} name="skills" value={skillId} />
                ))
              }

              <div className="col-12">

                <h1>Mágicas</h1>

                <div className="skills-grid">
                  {magics.map(skill => (
                    <SkillCircle
                      key={skill.id}
                      skill={skill}
                      isSelected={selectedMagics.includes(skill.id) || selectedSkills.includes(skill.id)}
                      onClick={() => !isMaxMagics || selectedMagics.includes(skill.id) ? handleMagicClick(skill.id) : !isMaxSelected || selectedSkills.includes(skill.id) ? handleSkillClick(skill.id) : alert((`Você já escolheu seu limite de Mágicas.`))}
                      isPureLineage={false}
                    />
                  ))}
                </div>

              </div>

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
            </div>

          </form>

        </>

        :

        <>
          <h1 className="title-container">Máximo de escolhas atingido</h1>
          <NavLink to={`/user/character/${characterId}/capabilities/`} className="button">Sair</NavLink>
        </>
      }

    </>

  );
}