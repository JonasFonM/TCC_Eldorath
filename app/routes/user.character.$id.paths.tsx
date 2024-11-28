import { NavLink, useOutletContext } from "@remix-run/react";
import {  path } from "@prisma/client";
import { PathCircle } from "~/components/path-circle";
import { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ params }) => {
  const characterId = params.id;
  return (characterId)
}

export default function PathsRoute() {
  const { paths } = useOutletContext<{  paths: path[] }>();

  return (
    <>

        <div className="title-container">
                <NavLink to={`../new/paths/`}> <h1 style={{marginTop: '0', marginBottom: '0', padding: '0'}}>Caminhos</h1></NavLink>
                <NavLink className="question-button" to={`/user/home/atr/`}>?</NavLink>
            </div>

        <div className="paths-grid">
          {paths.map(pa => (
            <PathCircle
              key={pa.id}
              path={pa}
              isSelected={false}
              onClick={() => null}
            />
          ))}
        </div>

    </>
  )
}