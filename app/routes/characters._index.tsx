import { NavLink } from "@remix-run/react";
import { diceRoll } from "~/root";

export default function CharactersIndexRoute() {
    return (<>
        <div className="container">
                <div className="block">
                    <h2>Dados</h2>
                    <p></p>
                    <button type="button" onClick={() => diceRoll(6)}>Roll D6</button>
                </div>
                <div className="block">
                    <h2>Find</h2>
                    <p></p>
                    <NavLink to={`find`}><button className="button"></button></NavLink>
                </div>
        </div>
    </>);
}
