/* eslint-disable @typescript-eslint/no-explicit-any */
import { useOutletContext } from "@remix-run/react";
import { StatsAndRes } from "~/components/character-sheet/main-page";

export default function StatsRoute() {
    const { character, stats, resistances } = useOutletContext<{character: any, stats: any, resistances: any }>();

    return (
        <StatsAndRes
            key={character.id}
            character={character}
            resistances={resistances}
            stats={stats} />
    )
}