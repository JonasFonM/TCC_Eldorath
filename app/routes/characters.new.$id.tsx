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
            <h2>Create your Origin</h2>
            <main>
                <div className="topnav">
                    <NavLink to={`/characters/new/${characterId}/skills`}>Skills</NavLink>
                    <NavLink to={`/characters/new/${characterId}/lineages`}>Lineages</NavLink>
                    <NavLink to={`/characters/new/${characterId}/paths`}>Paths</NavLink>
                    <NavLink to={`/characters/new/${characterId}/trainings`}>Trainings</NavLink>
                    <NavLink to={`/characters/new/${characterId}/inventory`}>Items</NavLink>
                </div>
                <Outlet />
            </main>
        </div>
    );
}