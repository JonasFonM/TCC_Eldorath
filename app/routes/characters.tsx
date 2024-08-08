import { LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { getUserIdFromSession, requireUserId } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request)
  const userId = await getUserIdFromSession(request)
  return (userId)
}

export default function CharactersRoute() {
  return (
    <div>
      <h1>Browse your Characters</h1>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
