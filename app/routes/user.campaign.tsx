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
  return weekDays[(i - 1) % weekDays.length]
}

export const months = [
  "Solmáris",
  "Dracorius",
  "Aethis",
  "Sombríel",
  "Véltar",
  "Nocturnis",
  "Glacirion",
  "Umbraeth",
  "Renováris",
  "Luzális",
  "Verthar",
  "Floravélis"
];

export function translateMonth(i: number) {
  return months[i - 1]
}

export default function CampaignsRoute() {

  return (
    <div>
      <Outlet />
    </div>
  );
}

