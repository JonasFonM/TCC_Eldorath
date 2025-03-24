import { LoaderFunction } from "@remix-run/node";
import { Outlet } from "@remix-run/react";
import { getUserIdFromSession, requireUserId } from "~/utils/auth.server";

export const loader: LoaderFunction = async ({ request }) => {
  await requireUserId(request)
  const userId = await getUserIdFromSession(request)
  return (userId)
}

export const translateSlotTypes: { [key: string]: any } = {
  'slotAmulet': 'Pingente',
  'slotBelt': 'Cinturão',
  'slotCloak': 'Manto',
  'slotCuirass': 'Peitoral',
  'slotEarings': 'Brinco',
  'slotGauntlet': 'Manopla',
  'slotGreaves': 'Bota',
  'slotHelm': 'Elmo',
  'slotPauldron': 'Ombreira',
  'slotRings': 'Anel',
  'slotUpperLegs': 'Calças',
  'slotWeapon': 'Arma',
  'consumable': 'Consumível'
};



export default function CharactersRoute() {
  return (
    <Outlet />
  );
}
