/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoaderFunction } from "@remix-run/node"
import { Outlet } from "@remix-run/react"
import { requireUserId } from '~/utils/auth.server'

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request)
  return userId;
}

export default function NewCharacterRoute() {

  return (
    <Outlet />
  );
}