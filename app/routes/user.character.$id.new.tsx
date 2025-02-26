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
        <Outlet />
    );
}