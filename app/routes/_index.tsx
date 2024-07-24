import type { MetaFunction } from "@remix-run/node";
import { NavLink } from "@remix-run/react";
import { LoaderFunction } from '@remix-run/node'
import { requireUserId } from '~/utils/auth.server'

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request)
  return null
}

export const meta: MetaFunction = () => {
  return [
    { title: "AEternida" },
    { name: "description", content: "Welcome to AEternida!" },
  ];
};

export default function Index() {
  return (<>
      <h1>Welcome</h1>
        <div className="block">
          <NavLink to={`login`}>Login</NavLink>
        </div>

    </>
  );
}
