import { NavLink } from "@remix-run/react";
import { useSidebar } from "./context-providers/side-bar-context";

interface props {
    backBtnName: string,
    backLink: string;
    advLink: string | null;
    advBtnName: string;
    showAdv: boolean;
}

export function SpecialFooter({ backBtnName, backLink, showAdv, advLink, advBtnName }: props) {
    const { isAllOpen, isHeaderOpen } = useSidebar();
    const getStyle = () => {
        if (isAllOpen || isHeaderOpen) {
            return { width: 'calc(100% - 25%)' }
        }
    }

    const getAdv = () => {
        if (advLink === null) {
            return (<button style={showAdv
                ? {}
                : { display: "hidden" }}
                className="button col-3" type="submit">{advBtnName}</button>)
        }

        if (advLink != null) {
            return (
                <NavLink className="button col-3 " type="button"
                    to={advLink}>
                    {String(advBtnName)}
                </NavLink>)
        }
    }

    return (

        <div className="footer container"
            style={getStyle()}>
            <div className="col-2"></div>
            <NavLink className="logout button col-3 " type="button"
                to={backLink}>
                {backBtnName}
            </NavLink>
            <div className="col-2"></div>
            {getAdv()}
            <div className="col-2"></div>

        </div>

    )
}