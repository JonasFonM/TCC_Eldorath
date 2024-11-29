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
            <h1>O que é Æternida?</h1>

            <div className='container'>
                <div className='col-2'>
                    <p>Teste</p>

                </div>

                <div className='col-6'>
                </div>

                <div className='col-4'>

                </div>
            </div>
        </>
    );
}

