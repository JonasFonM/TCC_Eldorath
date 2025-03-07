import { user } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { SidebarProvider } from "~/components/side-bars/side-bar-context";
import { getUserIdFromSession, requireUserId } from "~/utils/auth.server";
import { prisma } from "~/utils/prisma.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request)
  const userId = await getUserIdFromSession(request)

  const user = await prisma.user.findUnique({
    where: { id: Number(userId) }
  })

  const friendships = await prisma.friendship.findMany({
    where: {
      status: 'ACCEPTED',
      OR: [
        { user1Id: Number(userId) },
        { user2Id: Number(userId) }
      ],
    }
  })

  const friendshipIds = friendships.map(fr => fr.user1Id).concat(friendships.map(fr => fr.user2Id))

  const friends = await prisma.user.findMany({
    where: {
      id: { in: friendshipIds },
      NOT: [
        { id: Number(userId) }
      ]
    }
  })

  return ({ userId, user, friends })
}

export default function UserRoute() {
  const { userId, user, friends } = useLoaderData<{ userId: number, user: user, friends: user[] }>()

  return (
    <>
      <ul className="topnav">
        <li key={0}><NavLink to={`/user/home/profile/`}>Perfil</NavLink></li>
        <li key={1}><NavLink to={`/user/character/`}>Personagens</NavLink></li>
        <li key={2}><NavLink to={`/user/campaign/`}>Campanhas</NavLink></li>
        <li key={9} style={{ float: 'right' }}><NavLink className={'logout'} to={`/logout`}>Logout</NavLink></li>
      </ul>

      <SidebarProvider>
        <div className="user">
          <Outlet context={{ userId, user, friends }} />
        </div>
      </SidebarProvider>
    </>
  );
}
