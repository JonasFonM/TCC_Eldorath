import { useOutletContext } from "@remix-run/react";
import { path } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { TableData } from "~/components/character-sheet/table-data";
import { TableHead } from "~/components/character-sheet/table-head";
import React, { useRef, useState } from "react";
import { GeneralExplain } from "~/components/explanations/general-explain";
import { TableDropdown } from "~/components/character-sheet/table-dropdown";
import { useShowRow } from "~/components/context-providers/showRowContext";

export const loader: LoaderFunction = async ({ params }) => {
  const characterId = params.id;
  return (characterId)
}

export default function PathsRoute() {
  const { characterId, paths, isAuthor } = useOutletContext<{ characterId: string, paths: path[], isAuthor: boolean }>();
  const { showRow, isShown } = useShowRow();


  const tier1 = paths.filter(p => p.pathTier == 1);
  const tier2 = paths.filter(p => p.pathTier == 2);
  const tier3 = paths.filter(p => p.pathTier == 3);
  const tier4 = paths.filter(p => p.pathTier == 4);

  return (
    <React.Fragment key={-1}>
      <div className="title-container">
        <h1 style={{ marginTop: '0', marginBottom: '0', padding: '0' }}>Caminhos</h1>
        <button className="question-button" onClick={() => showRow(-5)}>?</button>
      </div>

      <GeneralExplain
        style={'linear-gradient(to bottom, white, gold)'}
        color={'black'}
        title={'Caminhos'}
        description="Caminhos são especializações que agregam nas suas capacidades, e determinam uma parcela importante da sua Vitalidade e do seu Poder. Alguns Caminhos dão acesso a Talentos exclusivos."
        isHidden={!isShown(-5)}
        onCancel={() => showRow(-5)}
      />

      <table>
        <TableHead
          tableTitles={["Iniciante"]}
          onClick={() => showRow(-1)}
          open={isShown(-1)}
        />
        {tier1.map(p => (
          <React.Fragment key={p.id}>
            <TableData
              key={`Data-${p.id}`}
              tableData={[`${p.name}`]}
              show={isShown(-1)}
              onClick={() => showRow(p.id)}
              selected={isShown(p.id)}
            />
            <TableDropdown
              key={`Drop-${p.id}`}
              show={isShown(-1) && isShown(p.id)}
              categories={[`Benefícios`]}
              subtitleIndexes={[1]}
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

      {tier2.length > 0 ?
        <table>
          <TableHead
            tableTitles={['Veterano']}
            onClick={() => showRow(-2)}
            open={isShown(-2)}
          />
          {tier2.map(p => (
            <React.Fragment key={p.id}>
              <TableData
                key={`Data-${p.id}`}
                tableData={[`${p.name}`]}
                show={isShown(-2)}
                onClick={() => showRow(p.id)}
                selected={isShown(p.id)}
              />
              <TableDropdown
                key={`Drop-${p.id}`}
                show={isShown(-2) && isShown(p.id)}
                categories={[`Benefícios`]}
                subtitleIndexes={[1]}
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
        : ''
      }

      {tier3.length > 0 ?
        <table>
          <TableHead
            tableTitles={['Mestre']}
            onClick={() => showRow(-3)}
            open={isShown(-3)}
          />
          {tier3.map(p => (
            <React.Fragment key={p.id}>
              <TableData
                key={`Data-${p.id}`}
                tableData={[`${p.name}`]}
                show={isShown(-3)}
                onClick={() => showRow(p.id)}
                selected={isShown(p.id)}
              />
              <TableDropdown
                key={`Drop-${p.id}`}
                show={isShown(-3) && isShown(p.id)}
                categories={[`Benefícios`]}
                subtitleIndexes={[1]}
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
        : ''}

      {tier4.length > 0 ?
        <table>
          <TableHead
            tableTitles={['Lenda']}
            onClick={() => showRow(-4)}
            open={isShown(-4)}
          />
          {tier4.map(p => (
            <React.Fragment key={p.id}>
              <TableData
                key={`Data-${p.id}`}
                tableData={[`${p.name}`]}
                show={isShown(-4)}
                onClick={() => showRow(p.id)}
                selected={isShown(p.id)}
              />
              <TableDropdown
                key={`Drop-${p.id}`}
                show={isShown(-4) && isShown(p.id)}
                categories={[`Benefícios`]}
                subtitleIndexes={[1]}
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
        : ''
      }
    </React.Fragment>
  )
}
