import { NavLink, useOutletContext } from "@remix-run/react";
import { lineage } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { LineageCircle } from "~/components/lineage-circle";
import { GeneralExplain } from "~/components/explanations/general-explain";
import { useState } from "react";

export const loader: LoaderFunction = async ({ params }) => {
  const characterId = params.id;
  return (characterId)
}


export default function LineagesRoute() {
  const { lineages, isPure, isAuthor } = useOutletContext<{ lineages: lineage[], isPure: boolean, isAuthor: boolean }>();
  const [showLineage, setShowLineage] = useState<number>(0);

  return (
    <>
      <div className="title-container">
        {isAuthor ?
          <NavLink to={`../new/lineages/`}> <h1 style={{ marginTop: '0', marginBottom: '0', padding: '0' }}>Linhagens</h1></NavLink>
          :
          <h1 style={{ marginTop: '0', marginBottom: '0', padding: '0' }}>Linhagens</h1>
        }
        <button className="question-button" onClick={showLineage === 0 ? () => setShowLineage(1) : () => setShowLineage(0)}>?</button>

      </div>
      <GeneralExplain style={'linear-gradient(to bottom, white, gold)'} color={'black'} title={'Linhagens'} description="Linhagens são sua descendência, sua origem. Geralmente representam a quais espécies ou raças você e os seus pais pertencem, mas existem exceções." isHidden={showLineage != 1} onCancel={() => setShowLineage(0)} />

      <div className="lineages-grid">
        {lineages.map(ln => (
          <LineageCircle
            key={ln.id}
            lineage={ln}
            isPure={isPure}
            isSelected={false}
            onClick={() => null}
          />
        ))}
      </div>
    </>
  )
}