import { Outlet } from "@remix-run/react";

export default function CharactersRoute() {
  return (
    <div>
      <h1>Characters</h1>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
