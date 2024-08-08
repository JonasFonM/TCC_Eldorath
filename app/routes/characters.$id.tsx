/* eslint-disable @typescript-eslint/no-explicit-any */
import { json, LoaderFunction, } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/utils/prisma.server";
import { character } from '@prisma/client'

export const loader: LoaderFunction = async ({ params }) => {
  const characterId = params.id;
  const character = await prisma.character.findUnique({
    where: {
      id: Number(characterId),
    },
  });

  return json(character);
};

export default function CharacterRoute() {
  const character = useLoaderData<character>()
  return (
    <div>
      <h2> {character.name}</h2>
      <div className="container">
        <div className="block">Agility:{character.agility}</div>
        <div className="block">Body:{character.body}</div>
        <div className="block">Mind:{character.mind}</div>
      </div>
    </div>
  );
}