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
  const handleRollDice = () => {
    const value = Math.floor(Math.random()*6) + 1;
    alert(`You rolled a ${value}!`);
    };  
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
      </body>
    </html>
  );
}



export default function App() {
  return <Outlet />;
}
