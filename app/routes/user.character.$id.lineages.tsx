import { NavLink, useOutletContext } from "@remix-run/react";
import { lineage } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { LineageCircle } from "~/components/lineage-circle";
import { GeneralExplain } from "~/components/explanations/general-explain";
import React, { useState } from "react";
import { TableData } from "~/components/character-sheet/general-table-data";
import { TableHead } from "~/components/character-sheet/general-table";

export const loader: LoaderFunction = async ({ params }) => {
  const characterId = params.id;
  return (characterId)
}


export default function LineagesRoute() {
  const { lineages, isPure, isAuthor } = useOutletContext<{ lineages: lineage[], isPure: boolean, isAuthor: boolean }>();
  const [showLineage, setShowLineage] = useState<number>(-3);

  return (
    <>
      <div className="title-container">
        {isAuthor ?
          <NavLink to={`../new/lineages/`}> <h1 style={{ marginTop: '0', marginBottom: '0', padding: '0' }}>Linhagens</h1></NavLink>
          :
          <h1 style={{ marginTop: '0', marginBottom: '0', padding: '0' }}>Linhagens</h1>
        }
        <button className="question-button" onClick={showLineage != -1 ? () => setShowLineage(-1) : () => setShowLineage(-3)}>?</button>

      </div>
      <GeneralExplain style={'linear-gradient(to bottom, white, gold)'} color={'black'} title={'Linhagens'} description="Linhagens são sua descendência, sua origem. Geralmente representam a quais espécies ou raças você e os seus pais pertencem, mas existem exceções." isHidden={showLineage != -1} onCancel={() => setShowLineage(-3)} />

      <table>
        <tbody>

          <TableHead tableTitles={['Nome']} onClick={showLineage != 0 ? () => setShowLineage(0) : () => setShowLineage(-3)} />

          {lineages.map(ln => (
            <React.Fragment key={ln.id}>
              <TableData
                key={ln.id}
                tableData={isPure ? [String(ln.name) + ' Pura'] : [String(ln.name)]}
                show={showLineage >= (0)}
                onClick={() => setShowLineage(Number(ln.id))}
                selected={false}
              />
            </React.Fragment>
          ))}

        </tbody>
      </table >
      {lineages.map(ln => (
        <React.Fragment key={ln.id}>
          <GeneralExplain title={String(ln.name)} description={String(ln.description)} isHidden={showLineage != Number(ln.id)} onCancel={() => setShowLineage(0)} style={'linear-gradient(to bottom right, gold, goldenrod)'} color="black" />
        </React.Fragment>
      ))}

    </>
  )
}
