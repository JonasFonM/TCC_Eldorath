import { campaign, character, user } from "@prisma/client";
import { NavLink, useOutletContext } from "@remix-run/react";
import React, { useState } from "react";
import { CampaignPanel } from "~/components/campaign/campaign-panel";
import { CharacterPanel } from "~/components/character-panel";
import { useShowRow } from "~/components/context-providers/showRowContext";
import { BlockConfirm } from "~/components/profiles/block-confirm";

export default function UserProfileRoute() {
    const { user, profileUser, isFriend, friendStatus, profileCampaigns, profileCharacters, isPendingInvite } = useOutletContext<{ user: user, profileUser: user, isFriend: boolean, friendStatus: string, isPendingInvite: boolean, profileCampaigns: campaign[], profileCharacters: character[] }>();
    const isOwnProfile = user.id === profileUser.id;
    const [blockConfirm, setBlockConfirm] = useState<number>(0);
    const { showRow, isShown } = useShowRow();


    const getFriendAction = () => {
        if (isOwnProfile) return null;

        if (isPendingInvite) return <NavLink to={`/user/friend/accept/${profileUser.id}`} className="lineBtn">Aceitar Amizade</NavLink>;

        if (friendStatus === 'BLOCKED') return <NavLink to={`/user/friend/accept/${profileUser.id}`} className="lineBtn">Desbloquear Amizade</NavLink>;

        if (friendStatus === 'PENDING') return <React.Fragment>Solicitação Enviada</React.Fragment>;

        if (isFriend) {
            return (
                <BlockConfirm
                    name={profileUser.username}
                    isHidden={blockConfirm !== 1}
                    onShow={() => setBlockConfirm(1)}
                    onCancel={() => setBlockConfirm(0)}
                    userId={String(profileUser.id)}
                />
            );
        }

        return <NavLink to={`/user/friend/invite/${profileUser.id}`} className="lineBtn">Solicitar Amizade</NavLink>;
    };


    return (
        <React.Fragment>
            <h1 className="title-input">{profileUser.username}</h1>
            <table>
                <thead>
                    <tr>{getFriendAction() && <th>{getFriendAction()}</th>}</tr>
                </thead>
            </table>

            <h1 id="Campanhas" className="title-input" style={isShown("Campanhas") ? { backgroundColor: 'black', boxShadow: '1px 1px 8px 1px gold' } : {}}>
                <button className="lineBtn" onClick={() => showRow("Campanhas")} >
                    {isOwnProfile ? 'Suas Campanhas' : `Campanhas de ${profileUser.username}`}
                </button>
            </h1>

            <div className="container" style={isShown("Campanhas") ? { display: 'inherit' } : { display: 'none' }}>
                <CampaignPanel isAuthor={isOwnProfile} campaigns={profileCampaigns} />
                {isOwnProfile
                    ? <div className="col-12">
                        <div className='title-container' style={{ backgroundColor: 'black', boxShadow: '1px 1px 8px 1px gold' }}>
                            <NavLink className={'lineBtn'} to={`/user/campaign/new`}><h1>Criar Campanha</h1></NavLink>
                        </div>
                        <p></p> {/*Espaço */}
                    </div>

                    : ''
                }
            </div>


            <h1 id="Personagens" className="title-input" style={isShown("Personagens") ? { backgroundColor: 'black', boxShadow: '1px 1px 8px 1px gold' } : {}}>
                <button className="lineBtn" onClick={() => showRow("Personagens")}>
                    {isOwnProfile ? 'Seus Personagens' : `Personagens de ${profileUser.username}`}
                </button>
            </h1>

            <div className="container" style={isShown("Personagens") ? { display: 'inherit' } : { display: 'none' }}>
                <CharacterPanel isAuthor={isOwnProfile} characters={profileCharacters} />
                {isOwnProfile
                    ? <div className="col-12">
                        <div className='title-container' style={{ backgroundColor: 'black', boxShadow: '1px 1px 8px 1px gold' }}>
                            <NavLink className={'lineBtn'} to={`/user/character/new/basic`}><h1>Criar Personagem</h1></NavLink>
                        </div>
                        <p></p> {/*Espaço */}
                    </div>

                    : ''
                }
            </div>

        </React.Fragment>
    );
}
