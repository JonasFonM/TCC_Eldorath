/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect, LoaderFunction } from "@remix-run/node";
import { getUserIdFromSession } from "~/utils/auth.server";
import { unmakeFriendship } from "~/utils/user.server";

export const loader: LoaderFunction = async ({ params, request }) => {
    const userId = await getUserIdFromSession(request);

    const friendId = Number(params.id)
    const referer = request.headers.get("Referer") || `/user/home`;

    await unmakeFriendship(Number(userId), friendId)

    return redirect(referer);
};