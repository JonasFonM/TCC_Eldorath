import { Outlet } from "@remix-run/react";

export const weekDays = [
  "Partilha",
  "Vigília",
  "Jornada",
  "Batalha",
  "Luto",
  "Descanso"
];

export function translateWeekDays(i: number) {
  return weekDays[i % weekDays.length]
}

export default function CampaignsRoute() {

  return (
    <div>
      <Outlet />
    </div>
  );
}

