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
        if (isPendingInvite) return <NavLink to={`/user/friend/accept/${profileUser.id}`} className="lineBtn col-12" style={{ padding: '16px' }}>Aceitar Amizade</NavLink>;

        if (friendStatus === 'BLOCKED') return <NavLink to={`/user/friend/unmake/${profileUser.id}`} className="lineBtn col-12" style={{ padding: '16px' }}>Desbloquear Usuário</NavLink>;

        if (friendStatus === 'PENDING') return 'Solicitação Enviada';

        if (isFriend) return <NavLink to={`/user/friend/unmake/${profileUser.id}/`} className="lineBtn col-12" style={{ padding: '16px' }}>Desfazer Amizade</NavLink>;

        return <NavLink to={`/user/friend/invite/${profileUser.id}`} className="lineBtn col-12" style={{ padding: '16px' }}>Solicitar Amizade</NavLink>;
    };

    const getUnmakeFriendship = () => {
        if (isPendingInvite) return <NavLink to={`/user/friend/unmake/${profileUser.id}/`} className="lineBtn col-12" style={{ padding: '16px' }}>Negar Amizade</NavLink>;

        if (friendStatus === 'PENDING') return <NavLink to={`/user/friend/unmake/${profileUser.id}/`} className="lineBtn col-12" style={{ padding: '16px' }}>Cancelar Solicitação</NavLink>;
    }

    return (
        <React.Fragment>
            <h1 className="title-input">{profileUser.username}</h1>
            <table>
                <thead>
                    {!isOwnProfile
                        ? <tr><th style={friendStatus === 'PENDING' && !isPendingInvite ? { color: 'gold' } : { padding: '0' }}>{getFriendAction()}</th></tr>
                        : null
                    }

                    {!isOwnProfile
                        ? <tr><th style={{ padding: '0' }}>{getUnmakeFriendship()}</th></tr>
                        : null
                    }

                    {!isOwnProfile && friendStatus !== 'BLOCKED'
                        ? <tr><th style={{ padding: '0' }}>
                            <BlockConfirm
                                name={profileUser.username}
                                isHidden={blockConfirm !== 1}
                                onShow={() => setBlockConfirm(1)}
                                onCancel={() => setBlockConfirm(0)}
                                userId={String(profileUser.id)}
                            />
                        </th></tr>
                        : null
                    }
                </thead>
            </table>

            <div className="calendar-box"
                style={
                    {
                        padding: '0',
                        margin: '0',
                        borderRadius: '0',
                        boxShadow: '0',
                        height: '85vh'
                    }
                }>
                <div className="col-6">
                    <div id="Campanhas" className="container col-12">
                        <button className="button" style={{ boxShadow: '1px 1px 8px 1px gold', width: '100%' }} onClick={() => showRow("Campanhas")} >
                            <h3> {isOwnProfile ? 'Suas Campanhas' : `Campanhas de ${profileUser.username}`}</h3>
                        </button>


                        <div className="container col-12" style={isShown("Campanhas") ? { display: 'inherit', marginRight: '8px' } : { display: 'none' }}>
                            <CampaignPanel isAuthor={isOwnProfile} campaigns={profileCampaigns} />
                            <div className="col-12">
                                {isOwnProfile
                                    ? <NavLink className={'button'}
                                        style={{ boxShadow: '1px 1px 8px 1px gold', width: '100%' }}
                                        to={`/user/campaign/new`}><h3>Criar Campanha</h3></NavLink>
                                    : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>

                <div id="Personagens" className="col-6">
                    <div className="container col-12">

                        <button className="button" style={{ boxShadow: '1px 1px 8px 1px gold', width: '100%' }} onClick={() => showRow("Personagens")}>
                            <h3>{isOwnProfile ? 'Seus Personagens' : `Personagens de ${profileUser.username}`}</h3>
                        </button>


                        <div className="container col-12" style={isShown("Personagens") ? { display: 'inherit' } : { display: 'none' }}>
                            <CharacterPanel isAuthor={isOwnProfile} characters={profileCharacters} />
                            <div className="col-12">
                                {isOwnProfile
                                    ? <NavLink className={'button'}
                                        style={{ boxShadow: '1px 1px 8px 1px gold', width: '100%' }}
                                        to={`/user/character/new/basic`}><h3>Criar Personagem</h3></NavLink>
                                    : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </React.Fragment >
    );
}
