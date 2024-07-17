import { NavLink } from "@remix-run/react";

export default function CharactersIndexRoute() {
    return (<>
        <div className="container">
                <div className="block">
                    <h2>Dados</h2>
                    <p></p>
                </div>
                <div className="block">
                    <h2>Find</h2>
                    <p></p>
                    <NavLink to={`find`}><button className="button"></button></NavLink>
                </div>
        </div>
    </>);
}
