import { user } from "@prisma/client";
import { json, LoaderFunction } from "@remix-run/node";
import { Outlet, useOutletContext, useFetcher } from "@remix-run/react";
import React, { useEffect } from "react";
import { useSidebar } from "~/components/context-providers/side-bar-context";
import { SideBars } from "~/components/context-providers/side-bars";
import { UserPanel } from "~/components/user-panel";
import { searchUsers } from "~/utils/user.server";

export const loader: LoaderFunction = async ({ request }) => {
    const url = new URL(request.url);
    const query = url.searchParams.get("q") || "";

    if (!query) {
        return json({ users: [], query });
    }

    const users = await searchUsers(query);
    return json({ users, query });
};

export default function UserRoute() {
    const { userId, user, friends, pendingInvites } = useOutletContext<{ userId: number; user: user; friends: user[]; pendingInvites: user[] }>();
    const { isAllOpen, isHeaderOpen, isTempOpen } = useSidebar();
    const fetcher = useFetcher<{ users: user[]; query: string }>();
    const users = fetcher.data?.users ?? [];
    const query = fetcher.data?.query ?? "";
    const friendProfileLinks = (pendingInvites.map((pi) => `/user/home/profile/${String(pi.id)}/`)).concat(friends.map((fr) => `/user/home/profile/${String(fr.id)}/`))

    useEffect(() => {
        const searchField = document.getElementById("q");
        if (searchField instanceof HTMLInputElement) {
            searchField.value = query;
            const handleInput = (e: Event) => {
                if (e.currentTarget instanceof HTMLInputElement) {
                    fetcher.submit(e.currentTarget.form);
                }
            };

            searchField.addEventListener("input", handleInput);

            return () => {
                searchField.removeEventListener("input", handleInput);
            };
        }
    }, [query, fetcher]);

    return (
        <>
            <SideBars
                entity={user}
                title={user.username}
                subtitle={""}
                tableHeaders={[]}
                tableDatas={[]}
                tableExplain={[]}
                links={[`/user/campaign/new/`,
                    `/user/character/new/basic/`,
                    `/user/character/new/npc/`,
                    `/user/character/new/boss/`,
                    `/user/home/profile/${String(userId)}/`].concat(friendProfileLinks)
                }
                linkNames={[`Criar Campanha`,
                    `Criar Personagem`,
                    `Criar NPC`,
                    `Criar Chefe`,
                    "Meu Perfil"].concat(pendingInvites.map((pi) => '! ' + String(pi.username) + ' !')).concat(friends.map((fr) => String(fr.username)))
                }
                temp={
                    <React.Fragment>
                        <fetcher.Form id="search-form" role="search">
                            <input
                                autoComplete="off"
                                style={{
                                    fontFamily: 'serif',
                                    fontSize: '1.2rem',
                                    color: 'gold',
                                    textAlign: 'center',
                                    width: '100%',
                                    borderBottom: '2px solid goldenrod',
                                    borderTop: '2px solid goldenrod',
                                    background: 'transparent',
                                    padding: '10px',
                                    outline: 'none',
                                }}
                                aria-label="Pesquisar perfis"
                                defaultValue={query}
                                id="q"
                                name="q"
                                placeholder="Buscar perfil..."
                                type="search"
                            />
                        </fetcher.Form>
                        <UserPanel users={users} />
                    </React.Fragment>

                }
                footer={null}
            />

            <div className="user" style={isAllOpen ? { marginLeft: '200px', marginRight: '200px' } : isHeaderOpen ?
                { marginLeft: '200px' } : isTempOpen ? { marginRight: '200px' } : {}}>

                <Outlet context={{ userId, user, friends }} />
            </div>
        </>
    );
}
