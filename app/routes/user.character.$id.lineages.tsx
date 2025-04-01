import { NavLink, useOutletContext } from "@remix-run/react";
import { lineage } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { GeneralExplain } from "~/components/explanations/general-explain";
import React, { useRef, useState } from "react";
import { TableData } from "~/components/character-sheet/general-table-data";
import { TableHead } from "~/components/character-sheet/general-table";

export const loader: LoaderFunction = async ({ params }) => {
  const characterId = params.id;
  return (characterId)
}


export default function LineagesRoute() {
  const { lineages, isPure, isAuthor, characterId } = useOutletContext<{ lineages: lineage[], isPure: boolean, isAuthor: boolean, characterId: string }>();

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

  return (
    <>
      <div className="title-container">
        <h1 style={{ marginTop: '0', marginBottom: '0', padding: '0' }}>Linhagens</h1>

        <button className="question-button" onClick={() => showRow(-3)}>?</button>

      </div>
      <GeneralExplain
        style={'linear-gradient(to bottom, white, gold)'}
        color={'black'}
        title={'Linhagens'}
        description="Linhagens são sua descendência, sua origem. Geralmente representam a quais espécies ou raças você e os seus pais pertencem, mas existem exceções."
        isHidden={!show.current.includes(-3)}
        onCancel={() => showRow(-3)} />

      <table>
        <thead>
          <TableHead
            tableTitles={['Linhagem']}
            onClick={() => showRow(-2)}
            open={show.current.includes(-2)}
          />
        </thead>

        {lineages.map(ln => (
          <React.Fragment key={ln.id}>
            <tbody>

              <TableData
                key={ln.id}
                tableData={isPure ? [String(ln.name) + ' Pura'] : [String(ln.name)]}
                show={show.current.includes(-2)}
                onClick={() => showRow(ln.id)}
                selected={show.current.includes(ln.id)}
              />
            </tbody>
          </React.Fragment>
        ))}

      </table >

      {lineages.map(ln => (
        <React.Fragment key={ln.id}>
          <GeneralExplain 
          title={String(ln.name)} 
          description={String(ln.description)} 
          isHidden={!show.current.includes(ln.id)} 
          onCancel={() => showRow(ln.id)} 
          style={'linear-gradient(to bottom right, white, gold)'} color="black" />
        </React.Fragment>
      ))}

    </>
  )
}
