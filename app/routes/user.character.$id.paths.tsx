import { useOutletContext } from "@remix-run/react";
import { path } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { TableData } from "~/components/character-sheet/general-table-data";
import { TableHead } from "~/components/character-sheet/general-table";
import React, { useRef, useState } from "react";
import { GeneralExplain } from "~/components/explanations/general-explain";
import { TableDropdown } from "~/components/character-sheet/table-dropdown";

export const loader: LoaderFunction = async ({ params }) => {
  const characterId = params.id;
  return (characterId)
}

export default function PathsRoute() {
  const { characterId, paths, isAuthor } = useOutletContext<{ characterId: string, paths: path[], isAuthor: boolean }>();
  const show = useRef<number[]>([]);

  const forceUpdate = useState(0)[1];

  const showRow = (n: number) => {
    if (show.current.includes(n)) {
      const newShow = show.current.filter(ns => ns != n)
      show.current = newShow
      return forceUpdate(n => n + 1);
    }
    show.current.push(n);
    return forceUpdate(n => n + 1);
  }

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
        isHidden={!show.current.includes(-5)}
        onCancel={() => showRow(-5)}
      />

      <table>
        <TableHead
          tableTitles={["Iniciante"]}
          onClick={() => showRow(-1)}
          open={show.current.includes(-1)}
        />
        {tier1.map(p => (
          <React.Fragment key={p.id}>
            <TableData
              key={`Data-${p.id}`}
              tableData={[`${p.name}`]}
              show={show.current.includes(-1)}
              onClick={() => showRow(p.id)}
              selected={show.current.includes(p.id)}
            />
            <TableDropdown
              key={`Drop-${p.id}`}
              show={show.current.includes(-1) && show.current.includes(p.id)}
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
            open={show.current.includes(-2)}
          />
          {tier2.map(p => (
            <React.Fragment key={p.id}>
              <TableData
                key={`Data-${p.id}`}
                tableData={[`${p.name}`]}
                show={show.current.includes(-2)}
                onClick={() => showRow(p.id)}
                selected={show.current.includes(p.id)}
              />
              <TableDropdown
                key={`Drop-${p.id}`}
                show={show.current.includes(-2) && show.current.includes(p.id)}
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
            open={show.current.includes(-3)}
          />
          {tier3.map(p => (
            <React.Fragment key={p.id}>
              <TableData
                key={`Data-${p.id}`}
                tableData={[`${p.name}`]}
                show={show.current.includes(-3)}
                onClick={() => showRow(p.id)}
                selected={show.current.includes(p.id)}
              />
              <TableDropdown
                key={`Drop-${p.id}`}
                show={show.current.includes(-3) && show.current.includes(p.id)}
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
            open={show.current.includes(-4)}
          />
          {tier4.map(p => (
            <React.Fragment key={p.id}>
              <TableData
                key={`Data-${p.id}`}
                tableData={[`${p.name}`]}
                show={show.current.includes(-4)}
                onClick={() => showRow(p.id)}
                selected={show.current.includes(p.id)}
              />
              <TableDropdown
                key={`Drop-${p.id}`}
                show={show.current.includes(-4) && show.current.includes(p.id)}
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
