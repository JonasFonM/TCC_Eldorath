import { LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { getUserIdFromSession, requireUserId } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request)
  const userId = await getUserIdFromSession(request)
  return (userId)
}

export const translateSlotTypes: { [key: string]: any } = {
  'slotAccessory': 'Acessório',
  'slotArmor': 'Armadura',
  'slotWeapon': 'Arma',
  'consumable': 'Consumível'
};



export default function CharactersRoute() {

  return (
    <Outlet />
  );
}
