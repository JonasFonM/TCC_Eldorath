/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect, LoaderFunction } from "@remix-run/node";
import { getUserIdFromSession } from "~/utils/auth.server";
import { blockFriendship, checkFriendshipExistance, sendFriendshipInvite } from "~/utils/user.server";

export const loader: LoaderFunction = async ({ params, request }) => {
    const userId = await getUserIdFromSession(request);

    const friendId = await Number(params.id)
    const isfriend = await checkFriendshipExistance(Number(userId), friendId);
    if (isfriend) {
        await blockFriendship(Number(userId), friendId)
    }
    if (!isfriend) {
        await sendFriendshipInvite(Number(userId), friendId)
        await blockFriendship(Number(userId), friendId)
    }

    return redirect(`/user/home/profile/${friendId}/`);
};