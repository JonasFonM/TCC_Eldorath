/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink, useLoaderData } from "@remix-run/react";
import { json, LoaderFunction } from '@remix-run/node'
import { requireUserId } from '~/utils/auth.server'
import { CharacterPanel } from "~/components/character-panel";
import { getCharactersFromUser } from "~/utils/character.server";

export const loader: LoaderFunction = async ({ request }) => {
    const userId = await requireUserId(request)
    const characters = await getCharactersFromUser(userId)
    return json({ characters })
  }


export default function CharactersIndexRoute() {
    const { characters } = useLoaderData<any>()
    
    return (<>
        <div className="container">
            <div className="block">
                <h2>New</h2>
                <p></p>
                <NavLink to={`new`}><button className="button"></button></NavLink>

            </div>
            <div className="block">
        <CharacterPanel characters ={characters}/>
      </div>
        </div>
    </>);
}

