import type { MetaFunction } from "@remix-run/node";
import "~/styles.css";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (<>
      <h1>Welcome</h1>
      <div className="container">
        <div className="block">
            <h2>Create an Encounter</h2>
            <p></p>
            <button className="button"></button>
        </div>
        <div className="block">
            <h2>Create an NPC</h2>
            <p></p>
            <button className="button"></button>
        </div>
        <div className="block">
            <h2>Create an Opponent</h2>
            <p></p>
            <button className="button"></button>
        </div>
    </div>
    </>
  );
}
