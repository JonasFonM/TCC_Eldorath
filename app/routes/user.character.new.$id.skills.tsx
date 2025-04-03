import { lineage, lineage_skill, skill } from "@prisma/client";
import { ActionFunction, redirect } from "@remix-run/node";
import { NavLink, useOutletContext } from "@remix-run/react";
import React, { useRef, useState } from "react";
import { TableHead } from "~/components/character-sheet/general-table";
import { TableData } from "~/components/character-sheet/general-table-data";
import { submitCharSkills } from "~/utils/character.server";


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
    selectableNonPureLineageSkills,
    selectablePureLineageSkills,
    isPure,
    selectableSkills,
    maxSelectableSkills, maxMagics, maxTechniques, maxManeuvers, maxOaths, maxTricks, }
    =
    useOutletContext<{
      characterId: string,
      selectablePureLineageSkills: (lineage_skill & { skill: skill, lineage: lineage })[],
      selectableNonPureLineageSkills: (lineage_skill & { skill: skill, lineage: lineage })[],
      isPure: boolean,
      selectableSkills: skill[],
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

  const handleSkillClick = (skillId: number, skillType: string, techniqueSubtype: string | null) => {

    if (skillType === 'MAGIC' && !isMaxMagics || selectedMagics.includes(skillId)) {
      setSelectedMagics((prevSkills) => {

        const isSelected = prevSkills.includes(skillId);

        const newSelectedSkills = isSelected
          ? prevSkills.filter(id => id !== skillId)
          : [...prevSkills, skillId];
        return newSelectedSkills
      }
      )
    }

    if (techniqueSubtype === 'MANEUVER' && !isMaxManeuvers || selectedManeuvers.includes(skillId)) {
      setSelectedManeuvers((prevSkills) => {

        const isSelected = prevSkills.includes(skillId);

        const newSelectedSkills = isSelected
          ? prevSkills.filter(id => id !== skillId)
          : [...prevSkills, skillId];

        return newSelectedSkills;
      }
      )
    }

    if (techniqueSubtype === 'OATH' && !isMaxOaths || selectedOaths.includes(skillId)) {
      setSelectedOaths((prevSkills) => {

        const isSelected = prevSkills.includes(skillId);

        const newSelectedSkills = isSelected
          ? prevSkills.filter(id => id !== skillId)
          : [...prevSkills, skillId];

        return newSelectedSkills;
      })
    }

    if (techniqueSubtype === 'TRICK' && !isMaxTricks || selectedTricks.includes(skillId)) {
      setSelectedTricks((prevSkills) => {

        const isSelected = prevSkills.includes(skillId);

        const newSelectedSkills = isSelected
          ? prevSkills.filter(id => id !== skillId)
          : [...prevSkills, skillId];

        return newSelectedSkills;
      }
      )
    }

    if (skillType === 'TECHNIQUE' && !isMaxTechniques || selectedTechniques.includes(skillId)) {
      setSelectedTechniques((prevSkills) => {

        const isSelected = prevSkills.includes(skillId);

        const newSelectedSkills = isSelected
          ? prevSkills.filter(id => id !== skillId)
          : [...prevSkills, skillId];

        return newSelectedSkills;
      }
      )
    }

    if (!isMaxSelected || selectedSkills.includes(skillId)
    ) {
      setSelectedSkills((prevSkills) => {

        const isSelected = prevSkills.includes(skillId);

        const newSelectedSkills = isSelected
          || selectedTechniques.includes(skillId)
          || selectedTricks.includes(skillId)
          || selectedOaths.includes(skillId)
          || selectedManeuvers.includes(skillId)
          || selectedMagics.includes(skillId)
          ? prevSkills.filter(id => id !== skillId)
          : [...prevSkills, skillId];

        return newSelectedSkills;
      });
    }

  };

  const handleSubmit = async (event: React.FormEvent) => {
    if (!selectedSkills || selectedSkills.length === 0) {
      event.preventDefault();
      return alert("Selecione pelo menos um Talento.")
    }

  };

  return (
    <>
      <h1>Talentos</h1>
      {maxSelectableSkills > 0 || maxMagics > 0 || maxTechniques > 0 || maxManeuvers > 0 || maxOaths > 0 || maxTricks > 0 ?
        <>

          <form method="post" onSubmit={handleSubmit}>

            <h2>Escolha seus Talentos</h2>

            <table>
              <thead>
                <TableHead
                  tableTitles={['Talentos']}
                  onClick={() => showRow(1)}
                  open={show.current.includes(1)}
                />
              </thead>

              {selectableSkills.map(sk => (
                <React.Fragment key={sk.id}>
                  <tbody className={!isMaxSelected
                    || sk.type === 'MAGIC' && !isMaxMagics
                    || sk.techniqueSubtype === 'MANEUVER' && !isMaxManeuvers
                    || sk.techniqueSubtype === 'OATH' && !isMaxOaths
                    || sk.techniqueSubtype === 'TRICK' && !isMaxTricks
                    || sk.type === 'TECHNIQUE' && !isMaxTechniques
                    || selectedSkills.includes(sk.id)
                    || selectedMagics.includes(sk.id)
                    || selectedManeuvers.includes(sk.id)
                    || selectedOaths.includes(sk.id)
                    || selectedTricks.includes(sk.id)
                    || selectedTechniques.includes(sk.id)
                    ? '' : 'error'}>
                    <TableData
                      key={sk.id}
                      tableData={[`${sk.name}`]}
                      show={show.current.includes(1)}
                      onClick={() => handleSkillClick(sk.id, sk.type, sk.techniqueSubtype)}
                      selected={
                        selectedSkills.includes(sk.id)
                        || selectedMagics.includes(sk.id)
                        || selectedManeuvers.includes(sk.id)
                        || selectedOaths.includes(sk.id)
                        || selectedTricks.includes(sk.id)
                        || selectedTechniques.includes(sk.id)}
                    />
                  </tbody>

                  <tbody style={{
                    display: selectedSkills.includes(sk.id)
                      || selectedMagics.includes(sk.id)
                      || selectedManeuvers.includes(sk.id)
                      || selectedOaths.includes(sk.id)
                      || selectedTricks.includes(sk.id)
                      || selectedTechniques.includes(sk.id)
                      && show.current.includes(1) ? '' : 'none', width: '100%'
                  }} className="table-extension">
                    <tr><td>{String(sk.description)}</td></tr>
                    <tr><th>Tipo</th></tr>
                    <tr><td>{String(sk.type)}</td></tr>
                    {sk.techniqueSubtype
                      ? <>
                        <tr><th>Tipo de Técnica</th></tr>
                        <tr><td>{String(sk.techniqueSubtype)}</td></tr>
                      </>
                      : ''
                    }
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

              {selectableNonPureLineageSkills.length > 0
                ? <thead>
                  <TableHead
                    tableTitles={['Talentos de Linhagem']}
                    onClick={() => showRow(2)}
                    open={show.current.includes(2)}
                  />
                </thead>
                : ''
              }

              {selectableNonPureLineageSkills.map(ls => (
                <React.Fragment key={ls.id}>
                  <tbody className={!isMaxSelected || selectedSkills.includes(ls.skill.id) ? '' : 'error'}>
                    <TableData
                      key={ls.id}
                      tableData={[`${ls.skill.name}`]}
                      show={show.current.includes(2)}
                      onClick={() => handleSkillClick(ls.skill.id, ls.skill.type, ls.skill.techniqueSubtype)}
                      selected={selectedSkills.includes(ls.skill.id)}
                    />
                  </tbody>

                  <tbody style={{ display: selectedSkills.includes(ls.skill.id) && show.current.includes(2) ? '' : 'none', width: '100%' }} className="table-extension">
                    <tr><td>{String(ls.skill.description)}</td></tr>
                    <tr><th>Linhagem</th></tr>
                    <tr><td style={{ fontVariant: 'small-caps', fontSize: '1.3rem' }}>{String(ls.lineage.name)}</td></tr>
                    <tr><th>Tipo</th></tr>
                    <tr><td>{String(ls.skill.type)}</td></tr>
                    {ls.skill.techniqueSubtype
                      ? <>
                        <tr><th>Tipo de Técnica</th></tr>
                        <tr><td>{String(ls.skill.techniqueSubtype)}</td></tr>
                      </>
                      : ''}
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

              {isPure && selectablePureLineageSkills.length > 0
                ? <thead>
                  <TableHead
                    tableTitles={['Talentos de Linhagem Pura']}
                    onClick={() => showRow(3)}
                    open={show.current.includes(3)}
                  />
                </thead>
                : ''}

              {selectablePureLineageSkills.map(ls => (
                <React.Fragment key={ls.id}>
                  <tbody className={!isMaxSelected || selectedSkills.includes(ls.skill.id) ? '' : 'error'}>
                    <TableData
                      key={ls.id}
                      tableData={[`${ls.skill.name}`]}
                      show={show.current.includes(3)}
                      onClick={() => handleSkillClick(ls.skill.id, ls.skill.type, ls.skill.techniqueSubtype)}
                      selected={selectedSkills.includes(ls.skill.id)}
                    />

                  </tbody>
                  <tbody style={{ display: selectedSkills.includes(ls.skill.id) && show.current.includes(3) ? '' : 'none', width: '100%' }} className="table-extension">
                    <tr><td>{String(ls.skill.description)}</td></tr>
                    <tr><th>Linhagem</th></tr>
                    <tr><td style={{ fontVariant: 'small-caps', fontSize: '1.3rem' }}>{String(ls.lineage.name) + ' Pura'}</td></tr>
                    <tr><th>Tipo</th></tr>
                    <tr><td>{String(ls.skill.type)}</td></tr>
                    {ls.skill.techniqueSubtype
                      ? <>
                        <tr><th>Tipo de Técnica</th></tr>
                        <tr><td>{String(ls.skill.techniqueSubtype)}</td></tr>
                      </>
                      : ''}
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