/* eslint-disable @typescript-eslint/no-explicit-any */
import { json, LoaderFunction } from '@remix-run/node'
import { requireUserId } from '~/utils/auth.server'
import { getCharactersFromUser } from "~/utils/character.server";

export const loader: LoaderFunction = async ({ request }) => {
    const userId = await requireUserId(request)
    const characters = await getCharactersFromUser(userId)
    return json({ characters })
}


export default function CharactersIndexRoute() {
    return (
        <>
            <h1>O que fazer em Æternida?</h1>

            <div className='col-1'>

            </div>

            <div className='col-7'>
                <p>Teste</p>
            </div>

            <div className='col-4'>

            </div>

        </>
    );
}

