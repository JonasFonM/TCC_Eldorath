/* eslint-disable @typescript-eslint/no-explicit-any */
import { json, LoaderFunction, redirect } from "@remix-run/node"
import { requireUserId } from '~/utils/auth.server'
import { submitCharacter } from "~/utils/character.server"

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request)

  try {
    const character = await submitCharacter({ name: 'Nome', level: 1, tier: 1, agility: 1, body: 1, mind: 1, authorId: userId });

    return (
      json({ character }, { status: 201 }),
      redirect(`/user/character/new/${character}/basic/`)
    );
  } catch (error) {
    console.error(error);
    return json({ error: "Failed to create character" }, { status: 500 });
  }

}