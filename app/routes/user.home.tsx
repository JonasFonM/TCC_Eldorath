import { user } from "@prisma/client";
import { Outlet, useOutletContext } from "@remix-run/react";
import { useSidebar } from "~/components/side-bars/side-bar-context";
import { SideBars } from "~/components/side-bars/side-bars";
import { UserPanel } from "~/components/user-panel";

export default function UserRoute() {
    const { userId, user, friends } = useOutletContext<{ userId: number, user: user, friends: user[] }>()
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

                <Outlet context={{ userId, user, friends }} />

            </div >

        </>

    );
}
