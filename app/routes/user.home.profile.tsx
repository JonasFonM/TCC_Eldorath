import { campaign, character, user } from "@prisma/client";
import { LoaderFunction, redirect } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import { getUserIdFromSession } from "~/utils/auth.server";
import { getCharactersFromUser } from "~/utils/character.server";
import { prisma } from "~/utils/prisma.server";
import { checkFriendshipStatus, checkPendingFriendInvite } from "~/utils/user.server";

export const loader: LoaderFunction = async ({ params, request }) => {

    const userId = await getUserIdFromSession(request)

    if (!params.id) {
        return redirect(`/user/home/profile/${String(userId)}`)
    }

    const user = await prisma.user.findUnique({
        where: { id: Number(userId) }
    })

    const profileUserId = Number(params.id)

    const profileUser = await prisma.user.findUnique({
        where: { id: profileUserId }
    })

    const profileCampaigns = await prisma.campaign.findMany({
        where: {
            masterId: profileUserId
        }
    })

    const profileCharacters = await getCharactersFromUser(profileUserId)



    const friendStatus = await checkFriendshipStatus(Number(userId), profileUserId)

    const isFriend = friendStatus === 'ACCEPTED'

    const isPendingInvite = await checkPendingFriendInvite(Number(userId), profileUserId)

    return ({ user, profileUser, isFriend, friendStatus, isPendingInvite, profileCampaigns, profileCharacters })
}

export default function UserRoute() {
    const { user, profileUser, isFriend, friendStatus, profileCampaigns, profileCharacters, isPendingInvite } = useLoaderData<{ user: user, profileUser: user, isFriend: boolean, friendStatus: string, isPendingInvite: boolean, profileCampaigns: campaign[], profileCharacters: character[] }>()
    const users = useLoaderData<typeof loader>();

    return (
        <Outlet context={{ user, users, profileUser, isFriend, friendStatus, profileCampaigns, profileCharacters, isPendingInvite }} />);
}
