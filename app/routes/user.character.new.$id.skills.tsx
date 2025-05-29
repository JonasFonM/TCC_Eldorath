import { character, character_skill, lineage, lineage_skill, skill } from "@prisma/client";
import { ActionFunction, json, redirect } from "@remix-run/node";
import { NavLink, useOutletContext } from "@remix-run/react";
import React, { useState } from "react";
import { TableHead } from "~/components/character-sheet/table-head";
import { TableData } from "~/components/character-sheet/table-data";
import { TableDropdown } from "~/components/character-sheet/table-dropdown";
import { useShowRow } from "~/components/context-providers/showRowContext";
import { submitCharSkills, updateMagicPendencies, updateManeuverPendencies, updateSkillPendencies } from "~/utils/character.server";
import { CharacterCreationFooter } from "~/components/character-sheet/character-creator-footer";


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
  try {
    await submitCharSkills(selectedSkillIds, Number(characterId))
    await updateSkillPendencies(Number(characterId), selectedSkills.length, Number(pendingSkills))
    await updateManeuverPendencies(Number(characterId), selectedManeuvers.length, Number(pendingManeuvers))
    await updateMagicPendencies(Number(characterId), selectedMagics.length, Number(pendingMagics))
    return redirect(`/user/character/new/${characterId}/inventory/`)

  } catch (error) {
    console.error(error);
    return json({ error: "Falha ao salvar Talentos." }, { status: 500 });
  }
}
export default function SkillSelectionRoute() {
  const {
    characterId,
    character,
    skills,
    nonPureLineageSkills,
    pureLineageSkills,
    selectableNonPureLineageSkills,
    selectablePureLineageSkills,
    isPure,
    selectableSkills,
    maxSelectableSkills, maxMagics, maxManeuvers }
    =
    useOutletContext<{
      characterId: string,
      character: (character & { skills: character_skill[] }),
      skills: skill[],
      pureLineageSkills: (lineage_skill & { skill: skill, lineage: lineage })[],
      nonPureLineageSkills: (lineage_skill & { skill: skill, lineage: lineage })[],
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

  const { showRow, isShown } = useShowRow();

  const isPreSelected = (skillId: number) => {
    return character.skills.map(cs => cs.skillId).includes(skillId)
  }

  const handleSkillClick = (skillId: number, skillType: string) => {

    if (!selectableSkills.map(sk => sk.id).includes(skillId)
      && !selectableNonPureLineageSkills.map(sk => sk.skillId).includes(skillId)
      && !selectablePureLineageSkills.map(sk => sk.skillId).includes(skillId)
    ) return;

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

    if (skillType !== 'Manobra' && skillType !== 'Magia' && !isMaxSelected
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
    if (selectedSkills.length + selectedMagics.length + selectedManeuvers.length < 1 && character.skills.length < 1) {
      event.preventDefault();
      return alert("Selecione pelo menos um Talento.")
    }

  };

  return (
    <>
      <h1 className="title-input" style={{ position: 'sticky', top: '64px', backgroundColor: 'black' }}>Talentos</h1>

      <div className="container" style={{ position: 'sticky', top: '139px', backgroundColor: 'black', borderBottom: '1px solid gold' }}>
        <h3 className="col-12" style={{ margin: "2px" }}>Talentos: {maxSelectableSkills - selectedSkills.length} </h3>
        <h3 className="col-12" style={{ margin: "2px" }}>Manobras: {maxManeuvers - selectedManeuvers.length}</h3>
        <h3 className="col-12" style={{ margin: "2px" }}>Magias: {maxMagics - selectedMagics.length}</h3>
      </div>

      <form method="post" onSubmit={handleSubmit}>

        <table>
          <TableHead
            tableTitles={['Talentos']}
            onClick={() => showRow("Talentos")}
            open={isShown("Talentos")}
            error={false}
          />

          {skills.map(sk => (
            <React.Fragment key={sk.id}>
              <TableData
                key={sk.id}
                tableData={[`${sk.name}`]}
                show={isShown("Talentos")}
                onClick={() => handleSkillClick(sk.id, sk.type)}
                selected={
                  selectedSkills.includes(sk.id)
                  || selectedMagics.includes(sk.id)
                  || selectedManeuvers.includes(sk.id)
                  || isPreSelected(sk.id)
                }
                error={
                  !isPreSelected(sk.id) && isMaxSelected && !selectedSkills.includes(sk.id)
                  || sk.type === 'Magia' && isMaxMagics && isMaxSelected && selectedMagics.includes(sk.id)
                  || sk.type === 'Manobra' && isMaxManeuvers && isMaxSelected && selectedManeuvers.includes(sk.id)
                }
              />
              <TableDropdown
                key={`Drop-${sk.id}`}
                show={isShown("Talentos")
                  && (selectedSkills.includes(sk.id)
                    || selectedMagics.includes(sk.id)
                    || selectedManeuvers.includes(sk.id)
                    || isPreSelected(sk.id))
                }
                categories={["", "Tipo", "Requisitos"]}
                subtitleIndexes={[1, 2]}
                items={[String(sk.description),
                String(sk.type),
                `Agilidade: ${String(sk.agi)} | Corpo: ${String(sk.bdy)} | Mente: ${String(sk.mnd)} | Nível: ${String(sk.lvl)} | Tamanho Real: ${String(sk.trSiz)} | Tamanho Efetivo: ${String(sk.efSiz)} |
                     ${sk.prerequisiteId
                  ? `Talento: ${String(skills.filter(s => s.id === sk.prerequisiteId).map(s => s.name))}`
                  : `Não Requer outro Talento`}`]}
              />
            </React.Fragment>
          ))
          }

          <TableHead
            tableTitles={['Talentos de Linhagem']}
            onClick={() => showRow("TLinhagem")}
            open={isShown("TLinhagem")}
            error={false}
          />
          {nonPureLineageSkills.map(ls => (
            <React.Fragment key={ls.id}>
              <TableData
                key={ls.id}
                tableData={[`${ls.skill.name} | ${ls.lineage.name}`]}
                show={isShown("TLinhagem")}
                onClick={() => handleSkillClick(ls.skill.id, ls.skill.type)}
                selected={selectedSkills.includes(ls.skill.id) || isPreSelected(ls.skill.id)}
                error={
                  !isPreSelected(ls.skill.id) && isMaxSelected && !selectedSkills.includes(ls.skill.id)
                  || !selectableNonPureLineageSkills.includes(ls) && !isPreSelected(ls.skill.id)
                }
              />

              <TableDropdown
                key={`Drop-${ls.skill.id}`}
                show={isShown("TLinhagem")
                  && (selectedSkills.includes(ls.skill.id)
                    || selectedMagics.includes(ls.skill.id)
                    || selectedManeuvers.includes(ls.skill.id)
                    || isPreSelected(ls.skill.id))
                }
                categories={["", "Linhagem", "Tipo", "Requisitos"]}
                subtitleIndexes={[1, 2, 3]}
                items={[String(ls.skill.description),
                String(ls.lineage.name),
                String(ls.skill.type),
                `Agilidade: ${String(ls.skill.agi)} | Corpo: ${String(ls.skill.bdy)} | Mente: ${String(ls.skill.mnd)} | Nível: ${String(ls.skill.lvl)} | Tamanho Real: ${String(ls.skill.trSiz)} 
                    | Tamanho Efetivo: ${String(ls.skill.efSiz)} | ${ls.skill.prerequisiteId
                  ? `Talento: ${String(skills.filter(s => s.id === ls.skill.prerequisiteId).map(s => s.name))}`
                  : `Não Requer outro Talento`}`]}
              />
            </React.Fragment>
          ))
          }

          <TableHead
            tableTitles={['Talentos de Linhagem Única']}
            onClick={() => showRow("TLinhagemUnica")}
            open={isShown("TLinhagemUnica")}
            error={false}
          />

          {pureLineageSkills.map(ls => (
            <React.Fragment key={ls.id}>
              <TableData
                key={ls.id}
                tableData={[`${ls.skill.name} | ${ls.lineage.name} Única`]}
                show={isShown("TLinhagemUnica")}
                onClick={() => handleSkillClick(ls.skill.id, ls.skill.type)}
                selected={selectedSkills.includes(ls.skill.id) || isPreSelected(ls.skill.id)}
                error={
                  !isPreSelected(ls.skill.id) && isMaxSelected && !selectedSkills.includes(ls.skill.id)
                  || !selectablePureLineageSkills.includes(ls) && !isPreSelected(ls.skill.id)}
              />

              <TableDropdown
                key={`Drop-${ls.skill.id}`}
                show=
                {isShown("TLinhagemUnica")
                  && (selectedSkills.includes(ls.skill.id)
                    || selectedMagics.includes(ls.skill.id)
                    || selectedManeuvers.includes(ls.skill.id)
                    || isPreSelected(ls.skill.id))
                }
                categories={["", "Linhagem", "Tipo", "Requisitos"]}
                subtitleIndexes={[1, 2, 3]}
                items={[String(ls.skill.description),
                String(ls.lineage.name),
                String(ls.skill.type),
                `Agilidade: ${String(ls.skill.agi)} | Corpo: ${String(ls.skill.bdy)} | Mente: ${String(ls.skill.mnd)} | Nível: ${String(ls.skill.lvl)} | Tamanho Real: ${String(ls.skill.trSiz)} 
                    | Tamanho Efetivo: ${String(ls.skill.efSiz)} | ${ls.skill.prerequisiteId
                  ? `Talento: ${String(skills.filter(s => s.id === ls.skill.prerequisiteId).map(s => s.name))}`
                  : `Não Requer outro Talento`}`]}
              />
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

        <CharacterCreationFooter
          backBtnName={'Caminhos'}
          backLink={`/user/character/new/${characterId}/paths`}
          advBtnName="Itens"
          advLink={
            selectedMagics.length > 0 || selectedManeuvers.length > 0 || selectedManeuvers.length > 0 || character.skills.length > 0
              ? `/user/character/new/${characterId}/inventory/`
              : null
          }
          showAdv={true}
        />
      </form>

    </>

  );
}