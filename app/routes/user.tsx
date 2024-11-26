import { LoaderFunction } from "@remix-run/node";
import { NavLink, Outlet } from "@remix-run/react";
import { getUserIdFromSession, requireUserId } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request)
  const userId = await getUserIdFromSession(request)
  return (userId)
}

export default function UserRoute() {
  return (
    <>
    <ul className="topnav">
          <li><NavLink to={`/user/home`}>Home</NavLink></li>
          <li><NavLink to={`/user/character/`}>Characters</NavLink></li>
          <li style={{ float: 'right' }}><NavLink className={'logout'} to={`/logout`}>Logout</NavLink></li>
        </ul>
      <div className="user">
        <Outlet />
      </div>
    </>
  );
}
