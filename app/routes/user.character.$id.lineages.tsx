import { NavLink, useOutletContext } from "@remix-run/react";
import { lineage } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { LineageCircle } from "~/components/lineage-circle";

export const loader: LoaderFunction = async ({ params }) => {
  const characterId = params.id;
  return (characterId)
}

export default function LineagesRoute() {
  const { lineages, isPure } = useOutletContext<{ lineages: lineage[], isPure: boolean }>();

  return (
    <>

      <div className="title-container">
        <NavLink to={`../new/lineages/`}> <h1 style={{ marginTop: '0', marginBottom: '0', padding: '0' }}>Linhagens</h1></NavLink>
        <NavLink className="question-button" to={`/user/home/atr/`}>?</NavLink>
      </div>

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