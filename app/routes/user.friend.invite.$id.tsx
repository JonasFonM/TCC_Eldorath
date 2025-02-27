/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect, LoaderFunction } from "@remix-run/node";
import { useOutletContext } from "@remix-run/react";
import { getUserIdFromSession } from "~/utils/auth.server";
import { checkFriendshipExistance, sendFriendshipInvite } from "~/utils/user.server";

export const loader: LoaderFunction = async ({ params, request }) => {
    const userId = await getUserIdFromSession(request);

    const friendId = await Number(params.id)
    const referer = request.headers.get("Referer") || `/user/home`;

    const isAlreadyFriend = await checkFriendshipExistance(Number(userId), friendId)

    {
        isAlreadyFriend ?
            ''
            :
            await sendFriendshipInvite(Number(userId), friendId)
    }
    
    return redirect(referer);
};