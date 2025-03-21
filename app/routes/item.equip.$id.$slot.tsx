/* eslint-disable @typescript-eslint/no-explicit-any */
import { redirect, LoaderFunction } from "@remix-run/node";
import { equipItemToSlot } from "~/utils/inventory.server";

export const loader: LoaderFunction = async ({ params, request }) => {
    const character_itemId = Number(params.id);
    const slot = Number(params.slot);

    await equipItemToSlot(character_itemId, slot);

    const referer = request.headers.get("Referer") || "/";

    return redirect(referer);
};