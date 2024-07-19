import { Outlet } from "@remix-run/react";

export default function CharactersRoute() {
  return (
    <div>
      <h1>Create a new Character</h1>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
