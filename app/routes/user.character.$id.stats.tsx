/* eslint-disable @typescript-eslint/no-explicit-any */
import { useOutletContext } from "@remix-run/react";
import { CharacterSheet } from "~/components/character-sheet/main-page";

export default function StatsRoute() {
    const { character, isAuthor } = useOutletContext<{ character: any, isAuthor: boolean }>();

    return (
        <CharacterSheet
            key={character.id}
            character={character}
            isAuthor={isAuthor}
        />
    )
}