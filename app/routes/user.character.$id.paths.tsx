import { useOutletContext } from "@remix-run/react";
import { character, path } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { TableData } from "~/components/character-sheet/table-data";
import { TableHead } from "~/components/character-sheet/table-head";
import React from "react";
import { GeneralExplain } from "~/components/explanations/general-explain";
import { TableDropdown } from "~/components/character-sheet/table-dropdown";
import { useShowRow } from "~/components/context-providers/showRowContext";

export const loader: LoaderFunction = async ({ params }) => {
  const characterId = params.id;
  return (characterId)
}

export default function PathsRoute() {
  const { character, paths, isAuthor } = useOutletContext<{ character: character, paths: path[], isAuthor: boolean }>();
  const { showRow, isShown } = useShowRow();

  const tier1 = paths.filter(p => p.pathTier == 1);
  const tier2 = paths.filter(p => p.pathTier == 2);
  const tier3 = paths.filter(p => p.pathTier == 3);
  const tier4 = paths.filter(p => p.pathTier == 4);

  const allTiers = [tier1, tier2, tier3, tier4]
  const tierTitles = ["Iniciante", "Veterano", "Mestre", "Lenda"]



  return (
    <React.Fragment key={-1}>
      <div style={{ position: "sticky", top: '64px', zIndex: '1' }} className="title-input">
        <h1 className="title-container">
          Caminhos
          <button className="question-button" onClick={() => showRow("ECaminhos")}>?</button>
        </h1>
      </div>

      <GeneralExplain
        title={'Caminhos'}
        description="Caminhos são especializações que agregam nas suas capacidades, e determinam uma parcela importante da sua Vitalidade e do seu Poder. Alguns Caminhos dão acesso a Talentos exclusivos."
        isHidden={!isShown("ECaminhos")}
        onCancel={() => showRow("ECaminhos")}
      />

      {allTiers.map((t, index) =>
        <table key={"Tier" + index + 1}>
          <TableHead
            tableTitles={[tierTitles[index]]}
            onClick={() => character.tier >= (index + 1)
              ? showRow(`Tier-${index + 1}`)
              : null
            }
            open={isShown(`Tier-${index + 1}`)}
            error={character.tier < index + 1}
          />
          {t.map(p => (
            <React.Fragment key={p.id}>
              <TableData
                key={p.id}
                tableData={[`${p.name}`]}
                show={isShown(`Tier-${p.pathTier}`)}
                onClick={() => showRow(`Caminho-${p.id}`)}
                selected={isShown(`Caminho-${p.id}`)}
                error={false}
              />
              <TableDropdown
                key={`Drop-${p.id}`}
                show={isShown(`Caminho-${p.id}`) && isShown(`Tier-${p.pathTier}`)}
                categories={['Descrição', `Benefícios`]}
                subtitleIndexes={[0, 1]}
                items={[
                  String(p.description),
                  `Vitalidade: ${String(p.vitality)}`,
                  `Poder: ${String(p.power)}`,
                  `Manobras: ${String(p.addManeuvers)}`,
                  `Magias: ${String(p.addMagics)}`
                ]}
              />
            </React.Fragment>
          ))
          }
        </table>
      )}
    </React.Fragment >
  )
}
