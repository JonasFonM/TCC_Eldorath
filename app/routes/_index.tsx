import type { MetaFunction } from "@remix-run/node";
import "~/styles.css";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (<><div className="block">
    <h2>Block 1</h2>
    <p></p>
    <button className="button"></button>
  </div><div className="block">
      <h2>Block 2</h2>
      <p></p>
      <button className="button"></button>
    </div><div className="block">
      <h2>Block 3</h2>
      <p></p>
      <button className="button"></button>
    </div></>
  );
}
