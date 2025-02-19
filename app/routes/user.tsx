import { user } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { UserPanel } from "~/components/user-panel";
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

  const [selectHeader, setHeader] = useState<number>(0);

  const showHeader = () => {
    setHeader(() => {
      return userId;
    });
  };

  const cancelHeader = () => {
    setHeader(() => {
      return 0
    });
  };
  const [selectTemp, setTemp] = useState<number>(0);

  const showTemp = () => {
    setTemp(() => {
      return userId;
    });
  };

  const cancelTemp = () => {
    setTemp(() => {
      return 0
    });
  };

  const [selectAmg, setAmg] = useState<number>(0);

  const isAllOpen = selectHeader === 0 && selectTemp === 0
  const isHeaderOpen = selectHeader === 0 && selectTemp != 0
  const isTempOpen = selectTemp === 0 && selectHeader != 0


  return (
    <>
      <ul className="topnav">
        <li><NavLink to={`/user/home`}>Introdução</NavLink></li>
        <li><NavLink to={`/user/character/`}>Personagens</NavLink></li>
        <li><NavLink to={`/user/campaign/`}>Campanhas</NavLink></li>
        <li style={{ float: 'right' }}><NavLink className={'logout'} to={`/logout`}>Logout</NavLink></li>
      </ul>


      <div className="header" style={selectHeader === 0 ? {} : { transform: 'translate(-200px)' }}>

        <h1 >{user.username}</h1>

        <ul style={{ zIndex: '900' }} className="skillnav">
        </ul>

      </div>
      <button className="toggle-menu" style={selectHeader === 0 ? {} : { transform: 'translate(-200px)' }}
        onClick={selectHeader === 0 ? showHeader : cancelHeader}></button>

      <div className="temp" style={selectTemp === 0 ? {} : { transform: 'translate(200px)' }}>

        <ul>
          <li><button style={selectAmg <= 1 ? { display: 'inherit' } : { display: 'none' }}
            onClick={() => selectAmg === 0 ? setAmg(1) : setAmg(0)}>Amigos</button></li>

          {selectAmg === 1 ?
            <UserPanel
              users={friends}
            />
            : ''}
        </ul>

      </div>

      <button className="toggle-temp" style={selectTemp === 0 ? {} : { transform: 'translate(200px)' }}
        onClick={selectTemp === 0 ? showTemp : cancelTemp}></button>


      <div className="user" style={isAllOpen ? { marginLeft: '200px', marginRight: '200px' } : isHeaderOpen ?
        { marginLeft: '200px' } : isTempOpen ? { marginRight: '200px' } : {}}>
        <Outlet />
      </div >

    </>
  );
}
