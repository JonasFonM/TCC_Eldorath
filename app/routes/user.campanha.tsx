import { Outlet } from "@remix-run/react";

export default function CampaignsRoute() {
  return (
    <div>
      <h1>Suas Campanhas</h1>
        <Outlet />
    </div>
  );
}

/*export default function Campaigns() {
    return(<>
    <h1>Campaign View</h1>
            <div className="container">
        <div className="block">
            <h2>Make an Encounter</h2>
            <p></p>
            <button className="button"></button>
        </div>
        <div className="block">
            <h2>Make a Creature</h2>
            <p></p>
            <NavLink to={`/creatures`}><button className="button"></button></NavLink>
        </div>      
    </div>
    </>);
}
*/
