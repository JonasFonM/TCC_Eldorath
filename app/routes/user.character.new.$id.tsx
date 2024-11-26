/* eslint-disable @typescript-eslint/no-explicit-any */
import { json, LoaderFunction } from "@remix-run/node"
import { Outlet } from "@remix-run/react"
import { requireUserId } from '~/utils/auth.server'

export const loader: LoaderFunction = async ({ request, params }) => {
    const userId = await requireUserId(request)
    const characterId = params.id
    return json({ userId, characterId });
}

export default function NewCharacterRoute() {
    return (
        <>
            <main>
                <Outlet />
            </main>
        </>
    );
}

/*



    const { characterId } = useLoaderData<{ characterId: string }>()


<ul className="charnav">
                <li><NavLink to={`/user/character/${characterId}`}>Character</NavLink></li>
                <li><NavLink to={`/user/character/new/${characterId}/skills`}>Skills</NavLink></li>
                <li><NavLink to={`/user/character/new/${characterId}/lineages`}>Lineages</NavLink></li>
                <li><NavLink to={`/user/character/new/${characterId}/paths`}>Paths</NavLink></li>
                <li><NavLink to={`/user/character/new/${characterId}/trainings`}>Trainings</NavLink></li>
                <li><NavLink to={`/user/character/new/${characterId}/inventory`}>Items</NavLink></li>
            </ul>*/