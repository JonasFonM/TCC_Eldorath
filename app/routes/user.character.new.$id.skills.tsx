import { lineage, lineage_skill, skill } from "@prisma/client";
import { ActionFunction, redirect } from "@remix-run/node";
import { NavLink, useOutletContext } from "@remix-run/react";
import React, { useRef, useState } from "react";
import { TableHead } from "~/components/character-sheet/general-table";
import { TableData } from "~/components/character-sheet/general-table-data";
import { submitCharSkills, updateMagicPendencies, updateManeuverPendencies, updateSkillPendencies } from "~/utils/character.server";


export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData();
  const selectedSkills = form.getAll('skills') as string[];
  const selectedManeuvers = form.getAll('maneuvers') as string[];
  const selectedMagics = form.getAll('magics') as string[];

  const pendingSkills = form.get('pendingSkills') as string;
  const pendingManeuvers = form.get('pendingManeuvers') as string;
  const pendingMagics = form.get('pendingMagics') as string;

  const selectedSkillIds = selectedSkills.map(id => parseInt(id)).concat(selectedMagics.map(id => parseInt(id))).concat(selectedManeuvers.map(id => parseInt(id)))
  const characterId = params.id

  await submitCharSkills(selectedSkillIds, Number(characterId))
  await updateSkillPendencies(Number(characterId), selectedSkills.length, Number(pendingSkills))
  await updateManeuverPendencies(Number(characterId), selectedManeuvers.length, Number(pendingManeuvers))
  await updateMagicPendencies(Number(characterId), selectedMagics.length, Number(pendingMagics))
  return redirect(`/user/character/new/${characterId}/inventory/`)
}
export default function SkillSelectionRoute() {
  const {
    characterId,
    skills,
    selectableNonPureLineageSkills,
    selectablePureLineageSkills,
    isPure,
    selectableSkills,
    maxSelectableSkills, maxMagics, maxManeuvers }
    =
    useOutletContext<{
      characterId: string,
      skills: skill[],
      selectablePureLineageSkills: (lineage_skill & { skill: skill, lineage: lineage })[],
      selectableNonPureLineageSkills: (lineage_skill & { skill: skill, lineage: lineage })[],
      isPure: boolean,
      selectableSkills: skill[],
      maxSelectableSkills: number, maxMagics: number, maxManeuvers: number
    }>();

  const [selectedSkills, setSelectedSkills] = useState<number[]>([]);
  const [selectedMagics, setSelectedMagics] = useState<number[]>([]);
  const [selectedManeuvers, setSelectedManeuvers] = useState<number[]>([]);

  const isMaxSelected = selectedSkills.length >= maxSelectableSkills;
  const isMaxMagics = selectedMagics.length >= maxMagics;
  const isMaxManeuvers = selectedManeuvers.length >= maxManeuvers;


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

  const handleSkillClick = (skillId: number, skillType: string) => {

    if (skillType === 'Magia' && !isMaxMagics || selectedMagics.includes(skillId)) {
      setSelectedMagics((prevSkills) => {

        const isSelected = prevSkills.includes(skillId);

        const newSelectedSkills = isSelected
          ? prevSkills.filter(id => id !== skillId)
          : [...prevSkills, skillId];
        return newSelectedSkills
      }
      )
    }

    if (skillType === 'Manobra' && !isMaxManeuvers || selectedManeuvers.includes(skillId)) {
      setSelectedManeuvers((prevSkills) => {

        const isSelected = prevSkills.includes(skillId);

        const newSelectedSkills = isSelected
          ? prevSkills.filter(id => id !== skillId)
          : [...prevSkills, skillId];

        return newSelectedSkills;
      }
      )
    }

    if (skillType === 'Passiva' && !isMaxSelected
      || !isMaxSelected && (skillType === 'Manobra' && isMaxManeuvers && !selectedManeuvers.includes(skillId))
      || !isMaxSelected && (skillType === 'Magia' && isMaxMagics && !selectedMagics.includes(skillId))
      || selectedSkills.includes(skillId)
    ) {
      setSelectedSkills((prevSkills) => {
        const isSelected = prevSkills.includes(skillId);

        const newSelectedSkills = isSelected
          ? prevSkills.filter(id => id !== skillId)
          : [...prevSkills, skillId];

        return newSelectedSkills;
      });
    }

  };

  const handleSubmit = async (event: React.FormEvent) => {
    if (selectedSkills.length + selectedMagics.length + selectedManeuvers.length === 0) {
      event.preventDefault();
      return alert("Selecione pelo menos um Talento.")
    }

  };

  return (
    <>
      <h1>Talentos</h1>
      {maxSelectableSkills > 0
        || maxMagics > 0
        || maxManeuvers > 0
        || maxManeuvers > 0
        ? <>

          <form method="post" onSubmit={handleSubmit}>

            <h2>Escolha seus Talentos</h2>
            <h3>Você pode escolher {maxManeuvers} Manobras, {maxMagics} Magias e {maxSelectableSkills} Talentos quaisquer</h3>

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
                    || sk.type === 'Magia' && !isMaxMagics
                    || sk.type === 'Manobra' && !isMaxManeuvers
                    || selectedSkills.includes(sk.id)
                    || selectedMagics.includes(sk.id)
                    || selectedManeuvers.includes(sk.id)
                    ? '' : 'error'}>
                    <TableData
                      key={sk.id}
                      tableData={[`${sk.name}`]}
                      show={show.current.includes(1)}
                      onClick={() => handleSkillClick(sk.id, sk.type)}
                      selected={
                        selectedSkills.includes(sk.id)
                        || selectedMagics.includes(sk.id)
                        || selectedManeuvers.includes(sk.id)}
                    />
                  </tbody>

                  <tbody style={{
                    display: show.current.includes(1)
                      && (selectedSkills.includes(sk.id)
                        || selectedMagics.includes(sk.id)
                        || selectedManeuvers.includes(sk.id)) ? '' : 'none', width: '100%'
                  }} className="table-extension">
                    <tr><td>{String(sk.description)}</td></tr>
                    <tr><th>Tipo</th></tr>
                    <tr><td>{String(sk.type)}</td></tr>
                    <tr><th>Requisitos</th></tr>
                    <tr><td>Nível: {String(sk.lvl)} | Agilidade: {String(sk.agi)} | Corpo: {String(sk.bdy)} | Mente: {String(sk.mnd)} | Tamanho Real: {String(sk.trSiz)} | Tamanho Efetivo: {String(sk.efSiz)}</td></tr>
                    {sk.prerequisiteId
                      ? <><tr><th>Talento Requerido</th></tr>
                        <tr><td> {String(skills.filter(s => s.id === sk.prerequisiteId).map(s => s.name))}</td></tr>
                      </>
                      : ''}
                  </tbody>
                </React.Fragment>
              ))
              }

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
                      onClick={() => handleSkillClick(ls.skill.id, ls.skill.type)}
                      selected={selectedSkills.includes(ls.skill.id)}
                    />
                  </tbody>

                  <tbody style={{ display: selectedSkills.includes(ls.skill.id) && show.current.includes(2) ? '' : 'none', width: '100%' }} className="table-extension">
                    <tr><td>{String(ls.skill.description)}</td></tr>
                    <tr><th>Linhagem</th></tr>
                    <tr><td style={{ fontVariant: 'small-caps', fontSize: '1.3rem' }}>{String(ls.lineage.name)}</td></tr>
                    <tr><th>Tipo</th></tr>
                    <tr><td>{String(ls.skill.type)}</td></tr>
                    <tr><th>Requisitos</th></tr>
                    <tr><td>Nível: {String(ls.skill.lvl)} | Agilidade: {String(ls.skill.agi)} | Corpo: {String(ls.skill.bdy)} | Mente: {String(ls.skill.mnd)} | Tamanho Real: {String(ls.skill.trSiz)} Tamanho Efetivo: {String(ls.skill.efSiz)}</td></tr>
                    {ls.skill.prerequisiteId
                      ? <><tr><th>Talento Requerido</th></tr>
                        <tr><td> {String(skills.filter(s => s.id === ls.skill.prerequisiteId).map(s => s.name))}</td></tr></>
                      : ''}
                  </tbody>
                </React.Fragment>
              ))
              }

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
                      onClick={() => handleSkillClick(ls.skill.id, ls.skill.type)}
                      selected={selectedSkills.includes(ls.skill.id)}
                    />

                  </tbody>
                  <tbody style={{ display: selectedSkills.includes(ls.skill.id) && show.current.includes(3) ? '' : 'none', width: '100%' }} className="table-extension">
                    <tr><td>{String(ls.skill.description)}</td></tr>
                    <tr><th>Linhagem</th></tr>
                    <tr><td style={{ fontVariant: 'small-caps', fontSize: '1.3rem' }}>{String(ls.lineage.name) + ' Pura'}</td></tr>
                    <tr><th>Tipo</th></tr>
                    <tr><td>{String(ls.skill.type)}</td></tr>
                    <tr><th>Requisitos</th></tr>
                    <tr><td>Nível: {String(ls.skill.lvl)} | Agilidade: {String(ls.skill.agi)} | Corpo: {String(ls.skill.bdy)} | Mente: {String(ls.skill.mnd)} | Tamanho Real: {String(ls.skill.trSiz)} Tamanho Efetivo: {String(ls.skill.efSiz)}</td></tr>
                    {ls.skill.prerequisiteId
                      ? <><tr><th>Talento Requerido</th></tr>
                        <tr><td> {String(skills.filter(s => s.id === ls.skill.prerequisiteId).map(s => s.name))}</td></tr></>
                      : ''}
                  </tbody>
                </React.Fragment>
              ))}

            </table>

            {
              selectedSkills.map(skillId => (
                <input type="hidden" key={skillId} name="skills" value={skillId} />
              ))
            }

            {
              selectedMagics.map(skillId => (
                <input type="hidden" key={skillId} name="magics" value={skillId} />
              ))
            }

            {selectedManeuvers.map(skillId => (
              <input type="hidden" key={skillId} name="maneuvers" value={skillId} />
            ))
            }

            <input type="hidden" key={"pendingSkills"} name="pendingSkills" value={maxSelectableSkills} />

            <input type="hidden" key={"pendingManeuvers"} name="pendingManeuvers" value={maxManeuvers} />

            <input type="hidden" key={"pendingMagics"} name="pendingMagics" value={maxMagics} />

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