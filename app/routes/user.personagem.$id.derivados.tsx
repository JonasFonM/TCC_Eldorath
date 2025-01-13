/* eslint-disable @typescript-eslint/no-explicit-any */
import { useOutletContext } from "@remix-run/react";
import { Derivados } from "~/components/character-sheet/main-page";

export default function DerivadosRoute() {
    const { character, derivados, resistances } = useOutletContext<{character: any, derivados: any, resistances: any }>();

    return (
        <Derivados
            key={character.id}
            character={character}
            resistances={resistances}
            derivados={derivados} />
    )
}