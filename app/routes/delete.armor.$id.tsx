/* eslint-disable @typescript-eslint/no-explicit-any */
import {  redirect, LoaderFunction } from "@remix-run/node";
import { prisma } from "~/utils/prisma.server";

export const loader: LoaderFunction = async ({ params, request }) => {
    const character_armorId = Number(params.id);
  
    await prisma.character_armor.deleteMany({
        where: { id: character_armorId },
    });
   

    const referer = request.headers.get("Referer") || "/";

    return redirect(referer);
};