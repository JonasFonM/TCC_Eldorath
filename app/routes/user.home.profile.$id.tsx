import { user } from "@prisma/client";
import { ActionFunction, LoaderFunction, redirect } from "@remix-run/node";
import { NavLink, Outlet, useLoaderData } from "@remix-run/react";
import React from "react";
import { getUserIdFromSession, requireUserId } from "~/utils/auth.server";
import { prisma } from "~/utils/prisma.server";
import { checkFriendshipExistance, sendFriendshipInvite } from "~/utils/user.server";

export const loader: LoaderFunction = async ({ params, request }) => {
    await requireUserId(request)
    const userId = await getUserIdFromSession(request)
    const profileUserId = params.id

    const user = await prisma.user.findUnique({
        where: { id: Number(userId) }
    })

    const profileUser = await prisma.user.findUnique({
        where: { id: Number(profileUserId) }
    })

    const isFriend = await checkFriendshipExistance(Number(userId), Number(profileUserId))

    return ({ user, profileUser, isFriend })
}

export default function UserRoute() {
    const { user, profileUser, isFriend } = useLoaderData<{ user: user, profileUser: user, isFriend: boolean }>()

    return (

        <React.Fragment>
            <h1>{profileUser.username}</h1>
            <table>
                <thead>
                    <tr>{isFriend ?
                        <th><NavLink to={`/user/friend/invite/${String(profileUser.id)}`} className="lineBtn">Bloquear Amizade</NavLink></th>
                        :
                        <th><NavLink to={`/user/friend/invite/${String(profileUser.id)}`} className="lineBtn">Solicitar Amizade</NavLink></th>

                    }
                    </tr>
                </thead>
            </table>
            <Outlet />
        </React.Fragment>
    );
}
