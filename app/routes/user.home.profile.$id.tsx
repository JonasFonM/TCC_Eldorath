import { campaign, character, user } from "@prisma/client";
import { NavLink, useOutletContext } from "@remix-run/react";
import React, { useState } from "react";
import { CampaignPanel } from "~/components/campaign/campaign-panel";
import { CharacterPanel } from "~/components/character-panel";


export default function UserProfileRoute() {
    const { user, profileUser, isFriend, friendStatus, profileCampaigns, profileCharacters, isPendingInvite } = useOutletContext<{ user: user, profileUser: user, isFriend: boolean, friendStatus: string, isPendingInvite: boolean, profileCampaigns: campaign[], profileCharacters: character[] }>()
    const isOwnProfile = user.id === profileUser.id
    const [showCreations, setShowCreations] = useState<number>(0)

    const getFriendAction = () => {
        if (isOwnProfile) return null;
        if (isFriend) {
            if (isPendingInvite) {
                return <NavLink to={`/user/friend/accept/${profileUser.id}`} className="lineBtn">Aceitar Amizade</NavLink>;
            }
            return <NavLink to={`/user/friend/block/${profileUser.id}`} className="lineBtn">Bloquear Amizade</NavLink>;
        }
        return <NavLink to={`/user/friend/invite/${profileUser.id}`} className="lineBtn">Solicitar Amizade</NavLink>;
    };

    return (

        <React.Fragment>
            <h1>{profileUser.username}</h1>
            <table>
                <thead>
                    <tr>{getFriendAction() && <th>{getFriendAction()}</th>}</tr>
                </thead>
            </table>
            <h1 className="title-input"><button className="lineBtn" onClick={showCreations != 1 ? () => setShowCreations(1) : () => setShowCreations(0)}>Personagens de {profileUser.username}</button></h1>

            <div className="container" style={showCreations != 1 ? { display: 'none' } : {}}>
                <CharacterPanel isAuthor={isOwnProfile} characters={profileCharacters} />
            </div>

            <h1 className="title-input"><button className="lineBtn" onClick={showCreations != 2 ? () => setShowCreations(2) : () => setShowCreations(0)}>Campanhas de {profileUser.username}</button></h1>

            <div className="container" style={showCreations != 2 ? { display: 'none' } : {}}>
                <CampaignPanel isAuthor={isOwnProfile} campaigns={profileCampaigns} />
            </div>
        </React.Fragment >
    );
}
