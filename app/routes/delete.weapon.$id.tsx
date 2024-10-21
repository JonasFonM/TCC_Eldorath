/* eslint-disable @typescript-eslint/no-explicit-any */
import {  redirect, LoaderFunction } from "@remix-run/node";
import { prisma } from "~/utils/prisma.server";

export const loader: LoaderFunction = async ({ params, request }) => {
    const character_weaponId = Number(params.id);
  
    await prisma.character_weapon.deleteMany({
        where: { id: character_weaponId },
    });
   

    const referer = request.headers.get("Referer") || "/"; // Fallback to "/" if no referer

    return redirect(referer);
};