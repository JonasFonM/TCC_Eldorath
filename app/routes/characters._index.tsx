import { NavLink } from "@remix-run/react";

export default function CharactersIndexRoute() {
    
    const handleRollDice = () => {
    const value = Math.floor(Math.random()*6) + 1;
    alert(`You rolled a ${value}!`);
    };
    return (<>
            <div className="container">
        <div className="block">
            <h2>Dados</h2>
            <p></p>
            <button type="button" onClick={handleRollDice}>
        Roll Dice
      </button>        </div>
        <div className="block">
            <h2>Find</h2>
            <p></p>
            <NavLink to={`find`}><button className="button"></button></NavLink>
        </div>
    </div>
    </>);
  }
  