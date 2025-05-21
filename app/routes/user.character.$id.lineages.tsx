import { NavLink, useOutletContext } from "@remix-run/react";
import { lineage } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { GeneralExplain } from "~/components/explanations/general-explain";
import React, { useRef, useState } from "react";
import { TableData } from "~/components/character-sheet/table-data";
import { TableHead } from "~/components/character-sheet/table-head";
import { TableDropdown } from "~/components/character-sheet/table-dropdown";
import { useShowRow } from "~/components/context-providers/showRowContext";

export const loader: LoaderFunction = async ({ params }) => {
  const characterId = params.id;
  return (characterId)
}


export default function LineagesRoute() {
  const { lineages, isPure, isAuthor, characterId } = useOutletContext<{ lineages: lineage[], isPure: boolean, isAuthor: boolean, characterId: string }>();

  const { showRow, isShown } = useShowRow();


  return (
    <>
      <div className="title-container">
        <h1 style={{ marginTop: '0', marginBottom: '0', padding: '0' }}>Linhagens</h1>
        <button className="question-button" onClick={() => showRow(-3)}>?</button>
      </div>

      <GeneralExplain
        title={'Linhagens'}
        description="Linhagens são sua descendência, sua origem. Geralmente representam a quais espécies ou raças você e os seus pais pertencem, mas existem exceções."
        isHidden={!isShown(-3)}
        onCancel={() => showRow(-3)}
      />

      <table>
        <TableHead
          tableTitles={['Linhagem']}
          onClick={() => showRow(-2)}
          open={isShown(-2)}
          error={false}
        />
        {lineages.map(ln => (
          <React.Fragment key={ln.id}>
            <TableData
              key={`Data-${ln.id}`}
              tableData={isPure ? [String(ln.name) + ' Pura'] : [String(ln.name)]}
              show={isShown(-2)}
              onClick={() => showRow(ln.id)}
              selected={isShown(ln.id)}
              error={false}
            />
            <TableDropdown
              key={`Drop-${ln.id}`}
              show={isShown(-2) && isShown(ln.id)}
              categories={[]}
              subtitleIndexes={[]}
              items={[String(ln.description)]}
            />
          </React.Fragment>
        ))}
      </table>
    </>
  )
}
