/* eslint-disable @typescript-eslint/no-explicit-any */
import { json, LoaderFunction } from "@remix-run/node"
import { NavLink, Outlet, useLoaderData } from "@remix-run/react"
import { requireUserId } from '~/utils/auth.server'

export const loader: LoaderFunction = async ({ request, params }) => {
    const userId = await requireUserId(request)
    const characterId = params.id
    return json({userId, characterId});
}

export default function NewCharacterRoute() {
    const { characterId } = useLoaderData<{characterId: string}>()
    return (
        <div>
            <h1>Create your Origin</h1>
            <main>
                <div className="topnav">
                    <NavLink to={`/characters/new/${characterId}/skills`}>Skills</NavLink>
                    <NavLink to={`/characters/new/${characterId}/lineages`}>Lineages</NavLink>
                </div>
                <Outlet />
            </main>
        </div>
    );
}