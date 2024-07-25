import {
  Links,
  Meta,
  NavLink,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { useState, useEffect, useRef } from 'react';
import type { MetaFunction } from "@remix-run/node";
import "~/styles.css";


export const meta: MetaFunction = () => {
  return [
    { title: "AEternida" },
    { name: "description", content: "Welcome to AEternida!" },
  ];
};


export function DiceRoll(die: number) {
  const value = Math.floor(Math.random() * die) + 1;
  return (value);
}

export function Layout({ children }: { children: React.ReactNode }) {
  const [logs, setLogs] = useState<string[]>([]);
  const logEndRef = useRef<HTMLDivElement | null>(null);

  const rollDice = (die: number) => {
    const result = DiceRoll(die)
    const newLog = `D${die}: ${result}`;
    setLogs((prevLogs) => [...prevLogs, newLog]);
  }
  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);


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
          <NavLink to={`/home`}>Home</NavLink>
          <NavLink to={`/campaigns`}>Campaigns</NavLink>
          <NavLink to={`/characters`}>Characters</NavLink>
          <NavLink to={`/logout`}>Logout</NavLink>
        </div>
        {children}
        <ScrollRestoration />
        <Scripts />

        <div className="dice-box">
          <button id="d4" className="dice" type="button" onClick={() => rollDice(4)}>D4</button>
          <button id="d6" className="dice" type="button" onClick={() => rollDice(6)}>D6</button>
          <button id="d8" className="dice" type="button" onClick={() => rollDice(8)}>D8</button>
          <button id="d10" className="dice" type="button" onClick={() => rollDice(10)}>D10</button>
          <button id="d12" className="dice" type="button" onClick={() => rollDice(12)}>D12</button>
          <button id="d20" className="dice" type="button" onClick={() => rollDice(20)}>D20</button>
          <button id="d100" className="dice" type="button" onClick={() => rollDice(100)}>D100</button>
        </div>
      </body>


    </html>
  );
}


/*
<div className="log" id="log">
          <h2>Log</h2>
          <ul>
            {logs.map((log, index) => (
              <li key={index}>{log}</li>
            ))}
          </ul>
          <div ref={logEndRef} />
        </div>
        */ 


export default function App() {
  return <Outlet />;
}
