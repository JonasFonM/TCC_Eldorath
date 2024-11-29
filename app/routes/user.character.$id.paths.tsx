import { NavLink, useOutletContext } from "@remix-run/react";
import { path } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { PathExplain } from "~/components/explanations/path-explain";
import { PathTableData } from "~/components/character-sheet/path-table-data";
import { PathTableHead } from "~/components/character-sheet/path-table";
import { useState } from "react";

export const loader: LoaderFunction = async ({ params }) => {
  const characterId = params.id;
  return (characterId)
}

export default function PathsRoute() {
  const { paths } = useOutletContext<{ paths: path[] }>();
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
  return (
    <>

      <div className="title-container">
        <NavLink to={`../new/paths/`}> <h1 style={{ marginTop: '0', marginBottom: '0', padding: '0' }}>Caminhos</h1></NavLink>
        <NavLink className="question-button" to={`/user/home/atr/`}>?</NavLink>
      </div>

      <table >
        <PathTableHead onClick={() => showRow()} />
        {paths.map(p => (
          <>
            <PathTableData
              key={p.id}
              path={p}
              show={show === 1}
              onClick={() => explainPath(p.id)}
              selected={false}

            />
            <PathExplain style={'linear-gradient(to bottom right, gold, goldenrod)'} path={p} isHidden={showPath != p.id} onCancel={() => setShowPath(0)} />

          </>

        ))}
      </table>

    </>
  )
}