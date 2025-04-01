import { NavLink, useOutletContext } from "@remix-run/react";
import { path } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { PathExplain } from "~/components/explanations/path-explain";
import { TableData } from "~/components/character-sheet/general-table-data";
import { TableHead } from "~/components/character-sheet/general-table";
import React, { useRef, useState } from "react";

export const loader: LoaderFunction = async ({ params }) => {
  const characterId = params.id;
  return (characterId)
}

export default function PathsRoute() {
  const { characterId, paths, isAuthor } = useOutletContext<{ characterId: string, paths: path[], isAuthor: boolean }>();
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
  const tier1 = paths.filter(p => p.pathTier == 1);
  const tier2 = paths.filter(p => p.pathTier == 2);
  const tier3 = paths.filter(p => p.pathTier == 3);
  const tier4 = paths.filter(p => p.pathTier == 4);

  return (
    <React.Fragment key={-1}>
      <div className="title-container">
        <h1 style={{ marginTop: '0', marginBottom: '0', padding: '0' }}>Caminhos</h1>


      </div>

      <table>
        <thead>
          <TableHead
            tableTitles={["Iniciante"]}
            onClick={() => showRow(-1)}
            open={show.current.includes(-1)}
          />
        </thead>
        {tier1.map(p => (
          <React.Fragment key={p.id}>
            <tbody>
              <TableData
                key={p.id}
                tableData={[`${p.name}`]}
                show={show.current.includes(-1)}
                onClick={() => showRow(p.id)}
                selected={show.current.includes(p.id)}
              />

            </tbody>
            <tbody style={{ display: show.current.includes(p.id) && show.current.includes(-1) ? '' : 'none', width: '100%' }} className="table-extension">
              <tr><th>Benefícios</th></tr>
              <tr><td>Vitalidade: {String(p.vitality)}</td></tr>
              <tr><td>Poder: {String(p.power)}</td></tr>
              <tr><td>Técnicas: {String(p.addTechniques)}</td></tr>
              <tr><td>Manobras: {String(p.addManeuvers)}</td></tr>
              <tr><td>Juramentos: {String(p.addOaths)}</td></tr>
              <tr><td>Truques: {String(p.addTricks)}</td></tr>
              <tr><td>Mágicas: {String(p.addMagics)}</td></tr>
            </tbody>
          </React.Fragment>
        ))
        }
      </table>


      {tier2.length > 0 ?
        <>
          <table>
            <tbody>
              <TableHead
                tableTitles={['Veterano']}
                onClick={() => showRow(-2)}
                open={show.current.includes(-2)}
              />

              {tier2.map(p => (
                <React.Fragment key={p.id}>
                  <tbody>
                    <TableData
                      key={p.id}
                      tableData={[`${p.name}`]}
                      show={show.current.includes(-2)}
                      onClick={() => showRow(p.id)}
                      selected={show.current.includes(p.id)}
                    />

                  </tbody>
                  <tbody style={{ display: show.current.includes(p.id) && show.current.includes(-2) ? '' : 'none', width: '100%' }} className="table-extension">
                    <tr><th>Benefícios</th></tr>
                    <tr><td>Vitalidade: {String(p.vitality)}</td></tr>
                    <tr><td>Poder: {String(p.power)}</td></tr>
                    <tr><td>Técnicas: {String(p.addTechniques)}</td></tr>
                    <tr><td>Manobras: {String(p.addManeuvers)}</td></tr>
                    <tr><td>Juramentos: {String(p.addOaths)}</td></tr>
                    <tr><td>Truques: {String(p.addTricks)}</td></tr>
                    <tr><td>Mágicas: {String(p.addMagics)}</td></tr>
                  </tbody>
                </React.Fragment>
              ))
              }
            </tbody>
          </table>
        </>
        : ''
      }

      {tier3.length > 0 ?
        <>
          <table>
            <tbody>

              <TableHead
                tableTitles={['Mestre']}
                onClick={() => showRow(-3)}
                open={show.current.includes(-3)}
              />

              {tier3.map(p => (
                <React.Fragment key={p.id}>
                  <tbody>
                    <TableData
                      key={p.id}
                      tableData={[`${p.name}`]}
                      show={show.current.includes(-3)}
                      onClick={() => showRow(p.id)}
                      selected={show.current.includes(p.id)}
                    />

                  </tbody>
                  <tbody style={{ display: show.current.includes(p.id) && show.current.includes(-3) ? '' : 'none', width: '100%' }} className="table-extension">
                    <tr><th>Benefícios</th></tr>
                    <tr><td>Vitalidade: {String(p.vitality)}</td></tr>
                    <tr><td>Poder: {String(p.power)}</td></tr>
                    <tr><td>Técnicas: {String(p.addTechniques)}</td></tr>
                    <tr><td>Manobras: {String(p.addManeuvers)}</td></tr>
                    <tr><td>Juramentos: {String(p.addOaths)}</td></tr>
                    <tr><td>Truques: {String(p.addTricks)}</td></tr>
                    <tr><td>Mágicas: {String(p.addMagics)}</td></tr>
                  </tbody>
                </React.Fragment>
              ))
              }
            </tbody>

          </table>
        </>
        : ''}

      {tier4.length > 0 ?
        <>
          <table>
            <tbody>
              <TableHead
                tableTitles={['Lenda']}
                onClick={() => showRow(-4)}
                open={show.current.includes(-4)}
              />

              {tier4.map(p => (
                <React.Fragment key={p.id}>
                  <tbody>
                    <TableData
                      key={p.id}
                      tableData={[`${p.name}`]}
                      show={show.current.includes(-4)}
                      onClick={() => showRow(p.id)}
                      selected={show.current.includes(p.id)}
                    />

                  </tbody>
                  <tbody style={{ display: show.current.includes(p.id) && show.current.includes(-4) ? '' : 'none', width: '100%' }} className="table-extension">
                    <tr><th>Benefícios</th></tr>
                    <tr><td>Vitalidade: {String(p.vitality)}</td></tr>
                    <tr><td>Poder: {String(p.power)}</td></tr>
                    <tr><td>Técnicas: {String(p.addTechniques)}</td></tr>
                    <tr><td>Manobras: {String(p.addManeuvers)}</td></tr>
                    <tr><td>Juramentos: {String(p.addOaths)}</td></tr>
                    <tr><td>Truques: {String(p.addTricks)}</td></tr>
                    <tr><td>Mágicas: {String(p.addMagics)}</td></tr>
                  </tbody>
                </React.Fragment>
              ))
              }
            </tbody>

          </table>
        </>
        : ''
      }
    </React.Fragment>
  )
}
