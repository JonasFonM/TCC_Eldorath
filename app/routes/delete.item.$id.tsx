/* eslint-disable @typescript-eslint/no-explicit-any */
import {  redirect, LoaderFunction } from "@remix-run/node";
import { deleteItemById } from "~/utils/inventory.server";

export const loader: LoaderFunction = async ({ params, request }) => {
    const character_itemId = Number(params.id);
  
    await deleteItemById(character_itemId);
   
    const referer = request.headers.get("Referer") || "/"; // Fallback to "/" if no referer

    return redirect(referer);
};