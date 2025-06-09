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
      <div style={{ position: "sticky", top: '64px', zIndex: '1' }} className="title-input">
        <h1 className="title-container">
          Linhagens
          <button className="question-button" onClick={() => showRow("ELinhagem")}>?</button>
        </h1>
      </div>

      <GeneralExplain
        title={'Linhagens'}
        description="Linhagens são sua descendência, sua origem. Geralmente representam a quais espécies ou raças você e os seus pais pertencem, mas existem exceções."
        isHidden={!isShown("ELinhagem")}
        onCancel={() => showRow("ELinhagem")}
      />

      <table>
        <TableHead
          tableTitles={['Linhagem']}
          onClick={() => showRow("TBLinhagem")}
          open={isShown("TBLinhagem")}
          error={false}
        />
        {lineages.map(ln => (
          <React.Fragment key={ln.id}>
            <TableData
              key={`Data-${ln.id}`}
              tableData={isPure ? [String(ln.name)] : ['Meio ' + String(ln.name)]}
              show={isShown("TBLinhagem")}
              onClick={() => showRow(`Linhagem-${ln.id}`)}
              selected={isShown(`Linhagem-${ln.id}`)}
              error={false}
            />
            <TableDropdown
              key={`Drop-${ln.id}`}
              show={isShown("TBLinhagem") && isShown(`Linhagem-${ln.id}`)}
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
