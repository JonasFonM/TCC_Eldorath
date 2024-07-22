import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "AEternida" },
    { name: "description", content: "Welcome to AEternida!" },
  ];
};

export default function Index() {
  return (<>
      <h1>Welcome</h1>
      <div className="container">
        
    </div>
    </>
  );
}
