/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect, LoaderFunction } from "@remix-run/node";
import { publishCharacter } from "~/utils/character.server";
import { prisma } from "~/utils/prisma.server";

export const loader: LoaderFunction = async ({ params, request }) => {
    const characterId = Number(params.id);

    const character = await prisma.character.findUnique({
        where: { id: characterId },
    });

    if (!character) {
        throw new Response("Character not found", { status: 404 });
    }

    await publishCharacter(characterId);

    const referer = request.headers.get("Referer") || "/";

    return redirect(referer);
};