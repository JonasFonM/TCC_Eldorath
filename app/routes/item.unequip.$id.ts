/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect, LoaderFunction } from "@remix-run/node";
import { unequipItem } from "~/utils/inventory.server";

export const loader: LoaderFunction = async ({ params, request }) => {
    const character_itemId = Number(params.id);

    await unequipItem(character_itemId);

    const referer = request.headers.get("Referer") || "/";

    return redirect(referer);
};