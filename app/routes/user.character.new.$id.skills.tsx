import { skill } from "@prisma/client";
import { ActionFunction, redirect } from "@remix-run/node";
import { NavLink, useOutletContext } from "@remix-run/react";
import React, { useState } from "react";
import { TableHead } from "~/components/character-sheet/general-table";
import { TableData } from "~/components/character-sheet/general-table-data";
import { SkillCircle } from "~/components/skill-circle";
import { submitCharSkills } from "~/utils/character.server";
import { LSrelations } from "~/utils/types.server";


export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData();
  const selectedSkills = form.getAll('skills') as string[];
  const pendingSkills = form.get('pendingSkills') as string;
  const selectedSkillIds = selectedSkills.map(id => parseInt(id))
  const characterId = params.id

  await submitCharSkills(selectedSkillIds, Number(characterId), Number(pendingSkills))
  return redirect(`/user/character/new/${characterId}/inventory/`)
}
export default function SkillSelectionRoute() {
  const {
    characterId,
    nonPureLineageSkills, pureLineageSkills, isPure,
    skills, selectableSkills,
    maxSelectableSkills, maxMagics, maxTechniques, maxManeuvers, maxOaths, maxTricks, }
    =
    useOutletContext<{
      characterId: string,
      pureLineageSkills: LSrelations, nonPureLineageSkills: LSrelations, isPure: boolean,
      skills: skill[], selectableSkills: skill[],
      maxSelectableSkills: number, maxMagics: number, maxTechniques: number, maxManeuvers: number, maxOaths: number, maxTricks: number
    }>();

  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);
  const [selectedMagics, setSelectedMagics] = useState<number[]>([]);
  const [selectedTechniques, setSelectedTechniques] = useState<number[]>([]);
  const [selectedManeuvers, setSelectedManeuvers] = useState<number[]>([]);
  const [selectedOaths, setSelectedOaths] = useState<number[]>([]);
  const [selectedTricks, setSelectedTricks] = useState<number[]>([]);

  const isMaxSelected = selectedSkills.length >= maxSelectableSkills;
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


  const handleSkillClick = (skillId: number, skillType: string, techniqueSubtype: string | null) => {
    if (skillType === 'MAGIC' && !isMaxMagics) {
      setSelectedMagics((prevSkills) => {

        const isSelected = prevSkills.includes(skillId);

        const newSelectedSkills = isSelected
          ? prevSkills.filter(id => id !== skillId)
          : [...prevSkills, skillId];

        return newSelectedSkills
      }
      )
    }

    if (techniqueSubtype === 'MANEUVER' && !isMaxManeuvers) {
      setSelectedManeuvers((prevSkills) => {

        const isSelected = prevSkills.includes(skillId);

        const newSelectedSkills = isSelected
          ? prevSkills.filter(id => id !== skillId)
          : [...prevSkills, skillId];

        return newSelectedSkills;
      }
      )
    }

    if (techniqueSubtype === 'OATH' && !isMaxOaths) {
      setSelectedOaths((prevSkills) => {

        const isSelected = prevSkills.includes(skillId);

        const newSelectedSkills = isSelected
          ? prevSkills.filter(id => id !== skillId)
          : [...prevSkills, skillId];

        return newSelectedSkills;
      })
    }

    if (techniqueSubtype === 'TRICK' && !isMaxTricks) {
      setSelectedTricks((prevSkills) => {

        const isSelected = prevSkills.includes(skillId);

        const newSelectedSkills = isSelected
          ? prevSkills.filter(id => id !== skillId)
          : [...prevSkills, skillId];

        return newSelectedSkills;
      }
      )
    }

    if (skillType === 'TECHNIQUE' && !isMaxTechniques) {
      setSelectedTechniques((prevSkills) => {

        const isSelected = prevSkills.includes(skillId);

        const newSelectedSkills = isSelected
          ? prevSkills.filter(id => id !== skillId)
          : [...prevSkills, skillId];

        return newSelectedSkills;
      }
      )
    }

    if (!isMaxSelected || selectedSkills.includes(skillId)) {
      setSelectedSkills((prevSkills) => {

        const isSelected = prevSkills.includes(skillId);

        const newSelectedSkills = isSelected
          ? prevSkills.filter(id => id !== skillId)
          : [...prevSkills, skillId];

        return newSelectedSkills;
      });
    }

  };

  return (
    <>
      <h1>Talentos</h1>
      {maxSelectableSkills > 0 || maxMagics > 0 || maxTechniques > 0 || maxManeuvers > 0 || maxOaths > 0 || maxTricks > 0 ?
        <>

          <form method="post">

            <h2>Escolha seus Talentos</h2>

            <table>
              <thead>
                <TableHead
                  tableTitles={['Talentos']}
                  onClick={() => showRow()}
                  open={show === 1}
                />
              </thead>

              {selectableSkills.map(sk => (
                <React.Fragment key={sk.id}>
                  <tbody className={isMaxSelected ? 'error' : ''}>
                    <TableData
                      key={sk.id}
                      tableData={[`${sk.name}`]}
                      show={show === 1}
                      onClick={() => handleSkillClick(sk.id, sk.type, sk.techniqueSubtype)}
                      selected={selectedSkills.includes(sk.id)}
                    />

                  </tbody>
                  <tbody style={{ display: selectedSkills.includes(sk.id) && show === (1) ? '' : 'none', width: '100%' }} className="selected">
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


            </table>

            {nonPureLineageSkills.length > 0 ? <h1>Talento(s) Exclusivos de Linhagem</h1> : ''}

            <div className="nonpure-lineage-skills">
              {nonPureLineageSkills.map(ls => (
                <SkillCircle
                  key={ls.skill.id}
                  skill={ls.skill}
                  isSelected={selectedSkills.includes(ls.skill.id)}
                  onClick={() => !isMaxSelected || selectedSkills.includes(ls.skill.id) ? handleSkillClick(ls.skill.id, ls.skill.type, ls.skill.techniqueSubtype) : alert((`Você já escolheu o seu limite de Talentos.`))}
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
                  onClick={() => !isMaxSelected || selectedSkills.includes(ls.skill.id) ? handleSkillClick(ls.skill.id, ls.skill.type, ls.skill.techniqueSubtype) : alert((`Você já escolheu o seu limite de Talentos.`))}
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

            <input type="hidden" key={maxSelectableSkills} name="pendingSkills" value={maxSelectableSkills} />

            <button type="submit" className="button">Próximo</button>

          </form>

        </>

        :

        <>
          <h2>Você já escolheu o máximo de Talentos que pode</h2>
          <NavLink to={`/user/character/new/${characterId}/inventory/`} className="button">Itens Iniciais</NavLink>
        </>
      }

    </>

  );
}