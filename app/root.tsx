import {
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "~/styles.css";

export function diceRoll (die: number){const value = Math.floor(Math.random()*die) + 1;
    alert(`You rolled a ${value}!`);
   }

export function Layout({ children }: { children: React.ReactNode }) { 
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <div className="topnav">
          <NavLink to={``}>Home</NavLink>
          <NavLink to= {`/campaigns`}>Campaigns</NavLink>
          <NavLink to= {`/characters`}>Characters</NavLink>
        </div>
          {children}
          <ScrollRestoration />
          <Scripts />

          <footer className="fixed-footer">
            <button id ="d4" type="button" onClick={() => diceRoll(4)}>D4</button>
            <button id ="d6" type="button" onClick={() => diceRoll(6)}>D6</button>
            <button id ="d8" type="button" onClick={() => diceRoll(8)}>D8</button>
            <button id ="d10" type="button" onClick={() => diceRoll(10)}>D10</button>
            <button id ="d12" type="button" onClick={() => diceRoll(12)}>D12</button>
            <button id ="d20" type="button" onClick={() => diceRoll(20)}>D20</button>
            <button id ="d100" type="button" onClick={() => diceRoll(100)}>D100</button>
          </footer>
      </body>
    </html>
  );
}



export default function App() {
  return <Outlet />;
}
