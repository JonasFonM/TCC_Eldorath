import { user } from "@prisma/client";
import { LoaderFunction } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { useSidebar } from "~/components/side-bars/side-bar-context";
import { SideBars } from "~/components/side-bars/side-bars";
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
    const { user, friends } = useLoaderData<{ userId: number, user: user, friends: user[] }>()
    const { isAllOpen, isHeaderOpen, isTempOpen } = useSidebar();

    return (
        <>
            <SideBars entity={user}
                title={user.username}
                subtitle={''}
                tableHeaders={[]}
                tableDatas={[]}
                tableExplain={[]}
                links={[]}
                linkNames={[]}
                temp={
                    <UserPanel users={friends} />

                }
            />

            <div className="user" style={isAllOpen ? { marginLeft: '200px', marginRight: '200px' } : isHeaderOpen ?
                { marginLeft: '200px' } : isTempOpen ? { marginRight: '200px' } : {}}>

                <div className="container">
                    <Outlet />
                </div>

            </div >

        </>
    );
}
