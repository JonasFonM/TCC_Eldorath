import { Outlet } from "@remix-run/react";

export const weekDays = [
  "Aelthis",
  "Orundis",
  "Vaelnis",
  "Zathros",
  "Nymeris",
  "Sylthos"
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

