/* eslint-disable @typescript-eslint/no-explicit-any */
import { character } from "@prisma/client";
import { json, redirect, LoaderFunction, ActionFunction } from "@remix-run/node";
import { useLoaderData, Link } from "@remix-run/react";
import { prisma } from "~/utils/prisma.server";

export const loader: LoaderFunction = async ({ params }) => {
    const characterId = Number(params.id);

    const character = await prisma.character.findUnique({
        where: { id: characterId },
    });

    if (!character) {
        throw new Response("Character not found", { status: 404 });
    }

    return json({ character });
};

export const action: ActionFunction = async ({ params }) => {
    const characterId = Number(params.id);

    // Delete the character
    await prisma.character_armor.deleteMany({
        where: { characterId: characterId },
    });
    await prisma.character_weapon.deleteMany({
        where: { characterId: characterId },
    });
    await prisma.character_lineage.deleteMany({
        where: { characterId: characterId },
    });
    await prisma.character_skill.deleteMany({
        where: { characterId: characterId },
    });
    await prisma.character_training.deleteMany({
        where: { characterId: characterId },
    });
    await prisma.character_path.deleteMany({
        where: { characterId: characterId },
    });
    await prisma.charStats.deleteMany({
        where: { characterId: characterId },
    });
    

    await prisma.character.delete({
        where: { id: characterId },
    });

    return redirect('/characters'); // Redirect to the character list or a relevant page after deletion
};

export default function DeleteCharacter() {
    const { character } = useLoaderData<{ character: character }>();

    return (
        <main>
            <h2>Are you sure you want to delete {character.name}?</h2>
            <div className="block">
                <p>This action cannot be undone.</p>
                <form method="post">
                    <input type="text" name="name" placeholder="Type DELETE if you are sure:"></input>
                    <button type="submit">Delete</button>
                    <Link to={`/characters/${String(character.id)}`}>Cancel</Link>
                </form>
            </div>
        </main>
    );
}
