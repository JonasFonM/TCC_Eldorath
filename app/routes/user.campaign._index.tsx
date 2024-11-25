import { NavLink } from "@remix-run/react";
import { LoaderFunction } from '@remix-run/node'
import { requireUserId } from '~/utils/auth.server'

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request)
  return null
}
export default function CampaignsIndexRoute() {
    return (<>
            <div className="container">
        <div className="block">
            <h2>New</h2>
            <p></p>
            <NavLink to={`new`}><button className="button"></button></NavLink>
        </div>
        <div className="block">
            <h2>Find</h2>
            <p></p>
            <NavLink to={`find`}><button className="button"></button></NavLink>
        </div>
    </div>
    </>);
  }
  