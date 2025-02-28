import { NavLink, useOutletContext } from "@remix-run/react";
import { path } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { PathExplain } from "~/components/explanations/path-explain";
import { TableData } from "~/components/character-sheet/general-table-data";
import { TableHead } from "~/components/character-sheet/general-table";
import React, { useState } from "react";

export const loader: LoaderFunction = async ({ params }) => {
  const characterId = params.id;
  return (characterId)
}

export default function PathsRoute() {
  const { paths, isAuthor } = useOutletContext<{ paths: path[], isAuthor: boolean }>();
  const [show, setShow] = useState<number>();

  const tier1 = paths.filter(p => p.pathTier == 1);
  const tier2 = paths.filter(p => p.pathTier == 2);
  const tier3 = paths.filter(p => p.pathTier == 3);
  const tier4 = paths.filter(p => p.pathTier == 4);

  const [showPath, setShowPath] = useState<number>();

  const explainPath = (id: number) => {
    showPath != id ?
      setShowPath(() => {
        return id;
      })
      :
      setShowPath(() => {
        return 0;
      })
  }

  const tableTitles = ["Caminho", "Vit", "Pod", "Tec", "Man", "Jur", "Tru", "Mag"]

  return (
    <React.Fragment>
      <div className="title-container">
        {isAuthor ?
          <NavLink to={`../new/paths/`}> <h1 style={{ marginTop: '0', marginBottom: '0', padding: '0' }}>Caminhos</h1></NavLink>
          :
          <h1 style={{ marginTop: '0', marginBottom: '0', padding: '0' }}>Caminhos</h1>
        }
        <NavLink className="question-button" to={`/user/home/atr/`}>?</NavLink>
      </div>


      <h2 style={{ fontVariant: 'small-caps' }}>Caminhos Iniciantes</h2>
      <table>
        <tbody>
          <TableHead tableTitles={tableTitles} onClick={show != 1 ? () => setShow(1) : () => setShow(0)} />

          {tier1.map(p => (
            <React.Fragment key={p.id}>


              <TableData
                key={p.id}
                tableData={[p.name, String(p.vitality), String(p.power), String(p.addTechniques), String(p.addManeuvers), String(p.addOaths), String(p.addTricks), String(p.addMagics)]}
                show={show === (p.pathTier)}
                onClick={() => explainPath(p.id)}
                selected={false}

              />

              <PathExplain style={'linear-gradient(to bottom right, gold, goldenrod)'} path={p} isHidden={showPath != p.id} onCancel={() => setShowPath(0)} />

            </React.Fragment>

          ))}
        </tbody>
      </table>



      <h2 style={{ fontVariant: 'small-caps' }}>Caminhos Veteranos</h2>
      <table>
        <tbody>
          <TableHead tableTitles={tableTitles} onClick={show != 2 ? () => setShow(2) : () => setShow(0)} />

          {tier2.map(p => (
            <React.Fragment key={p.id}>


              <TableData
                key={p.id}
                tableData={[p.name, String(p.vitality), String(p.power), String(p.addTechniques), String(p.addManeuvers), String(p.addOaths), String(p.addTricks), String(p.addMagics)]}
                show={show === (p.pathTier)}
                onClick={() => explainPath(p.id)}
                selected={false}

              />

              <PathExplain style={'linear-gradient(to bottom right, gold, goldenrod)'} path={p} isHidden={showPath != p.id} onCancel={() => setShowPath(0)} />

            </React.Fragment>

          ))}
        </tbody>
      </table>

      <h2 style={{ fontVariant: 'small-caps' }}>Caminhos Mestres</h2>
      <table>
        <tbody>
          <TableHead tableTitles={tableTitles} onClick={show != 3 ? () => setShow(3) : () => setShow(0)} />

          {tier3.map(p => (
            <React.Fragment key={p.id}>


              <TableData
                key={p.id}
                tableData={[p.name, String(p.vitality), String(p.power), String(p.addTechniques), String(p.addManeuvers), String(p.addOaths), String(p.addTricks), String(p.addMagics)]}
                show={show === (p.pathTier)}
                onClick={() => explainPath(p.id)}
                selected={false}

              />

              <PathExplain style={'linear-gradient(to bottom right, gold, goldenrod)'} path={p} isHidden={showPath != p.id} onCancel={() => setShowPath(0)} />

            </React.Fragment>

          ))}
        </tbody>
      </table>

      <h2 style={{ fontVariant: 'small-caps' }}>Caminhos Lendários</h2>
      <table>
        <tbody>
          <TableHead tableTitles={tableTitles} onClick={show != 4 ? () => setShow(4) : () => setShow(0)} />

          {tier4.map(p => (
            <React.Fragment key={p.id}>


              <TableData
                key={p.id}
                tableData={[p.name, String(p.vitality), String(p.power), String(p.addTechniques), String(p.addManeuvers), String(p.addOaths), String(p.addTricks), String(p.addMagics)]}
                show={show === (p.pathTier)}
                onClick={() => explainPath(p.id)}
                selected={false}

              />

              <PathExplain style={'linear-gradient(to bottom right, gold, goldenrod)'} path={p} isHidden={showPath != p.id} onCancel={() => setShowPath(0)} />

            </React.Fragment>

          ))}
        </tbody>
      </table>

    </React.Fragment>
  )
}
