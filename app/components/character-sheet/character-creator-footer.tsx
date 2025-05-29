import { Link } from "@remix-run/react";
import { useSidebar } from "../context-providers/side-bar-context";

interface props {
    backBtnName: string,
    backLink: string;
    showAdv: boolean
}

export function CharacterCreationFooter({ backBtnName, backLink, showAdv }: props) {
    const { isAllOpen } = useSidebar();

    return (

        <div className="footer container"
            style={
                isAllOpen
                    ? { width: 'calc(100% - 200px)' }
                    : {}
            }>

            <div className="col-2"></div>
            <Link className="logout button col-3 " type="button"
                to={backLink}>
                {backBtnName}
            </Link>

            <div className="col-2"></div>
            <button style={showAdv ? {} : { display: "hidden" }} className="button col-3" type="submit">Avançar</button>
            <div className="col-2"></div>

        </div>

    )
}