/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink, useLoaderData } from "@remix-run/react";
import { LoaderFunction } from '@remix-run/node'
import { requireUserId } from '~/utils/auth.server'
import { CharacterPanel } from "~/components/character-panel";
import { getCharactersFromUser } from "~/utils/character.server";
import React, { useRef, useState } from "react";
import { useShowRow } from "~/components/context-providers/showRowContext";

export const loader: LoaderFunction = async ({ request }) => {
    const userId = await requireUserId(request)
    const characters = await getCharactersFromUser(userId)
    return ({ characters })
}


export default function CharactersIndexRoute() {
    const { characters } = useLoaderData<any>()
    const { showRow, isShown } = useShowRow();


    return (
        <>

            <React.Fragment>

                <h1 className="title-input">

                    <button className="lineBtn" onClick={() => showRow(-1)}>
                        Seus Personagens
                    </button>
                </h1>

                <div className="container" style={isShown(-1) ? { display: 'none' } : {}}>
                    <CharacterPanel isAuthor={true} characters={characters} />
                    <h1 className="title-input"><NavLink className={'lineBtn'} to={`new/basic`}>Criar Personagem</NavLink></h1>

                </div>

            </React.Fragment>

        </>);
}

