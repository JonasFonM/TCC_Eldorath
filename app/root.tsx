import {
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import "~/styles.css";



export function Layout({ children }: { children: React.ReactNode }) {
  const diceRoll = (die: number) => {const value = Math.floor(Math.random()*die) + 1;
  alert(`You rolled a ${value}!`);
  }
  const dFour = () => {
    diceRoll(4);};
  const dSix = () => {
      diceRoll(6);};
  const dEight = () => {
      diceRoll(8);};      
  const dTen = () => {
      diceRoll(10);};      
  const dTwelve = () => {
      diceRoll(12);};      
  const dTwenty = () => {
      diceRoll(20);};      
  const dHundred = () => {
      diceRoll(100);};      
  
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
            <button id ="d4" type="button" onClick={dFour}>D4</button>
            <button id ="d6" type="button" onClick={dSix}>D6</button>
            <button id ="d8" type="button" onClick={dEight}>D8</button>
            <button id ="d10" type="button" onClick={dTen}>D10</button>
            <button id ="d12" type="button" onClick={dTwelve}>D12</button>
            <button id ="d20" type="button" onClick={dTwenty}>D20</button>
            <button id ="d100" type="button" onClick={dHundred}>D100</button>
          </footer>
      </body>
    </html>
  );
}



export default function App() {
  return <Outlet />;
}
