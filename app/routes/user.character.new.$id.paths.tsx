import { path } from "@prisma/client";
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { PathCircle } from "~/components/path-circle";
import { requireUserId } from "~/utils/auth.server";
import { submitCharPaths } from "~/utils/character.server";
import { prisma } from "~/utils/prisma.server";

export const loader: LoaderFunction = async ({ request, params }) => {
    const userId = await requireUserId(request)
    const characterId = Number(params.id);

    const character = await prisma.character.findUnique({
        where: { id: characterId },
    });

    const paths = await prisma.path.findMany({
        where: { pathTier: character?.tier }
    }
    )

    const maxSelectable = character?.pendingPath


    return json({ userId, paths, maxSelectable, characterId });
}

export const action: ActionFunction = async ({ request, params }) => {
    const form = await request.formData();
    const selectedPaths = form.getAll('paths') as string[];
    const selectedPathIds = selectedPaths.map(id => parseInt(id))
    const characterId = params.id

    if (!selectedPaths || selectedPaths.length === 0) {
        return json({ error: "You must select at least one path." }, { status: 400 });
    }
    try {
        await submitCharPaths(selectedPathIds, Number(characterId))
        await prisma.charStats?.delete({
            where: { characterId: Number(characterId) }
        })
        return redirect(`/user/character/${characterId}/capabilities/`)
    } catch (error) {
        console.error(error);
        return json({ error: "Failed to save paths." }, { status: 500 });
    }

}

export default function PathSelection() {
    const { paths, characterId, maxSelectable } = useLoaderData<{ paths: path[], characterId: string, maxSelectable: number }>();
    const [selectedPaths, setSelectedPaths] = useState<number[]>([]);
    const [error, setError] = useState<string | null>(null);


    const isMaxSelected = selectedPaths.length >= maxSelectable;


    const handlePathClick = (pathId: number) => {
        setSelectedPaths((prevPaths) => {
            const isSelected = prevPaths.includes(pathId);

            const newSelectedPaths = isSelected
                ? prevPaths.filter(id => id !== pathId)
                : [...prevPaths, pathId];

            if (newSelectedPaths.length > 1) {
                setError("Você só pode selecionar 1 caminho por Categoria.");
                return prevPaths;
            } else {
                setError(null);
            }

            return newSelectedPaths;
        });
    };

    return (
        <>

            {maxSelectable > 0 ?
                <>
                    <form method="post">

                        <h1 className="title-container">Escolha seu Caminho<NavLink to={`/user/character/${characterId}/capabilities/`} className="question-button">X</NavLink></h1>
                        <div className="paths-grid">
                            {paths.map(path => (
                                <PathCircle
                                    key={path.id}
                                    path={path}
                                    isSelected={selectedPaths.includes(path.id)}
                                    onClick={() => !isMaxSelected || selectedPaths.includes(path.id) ? handlePathClick(path.id) : null}
                                />
                            ))}
                        </div>
                        {selectedPaths.map(pathId => (
                            <input type="hidden" key={pathId} name="paths" value={pathId} />
                        ))}
                        {error && <p>{error}</p>}

                        <button type="submit" className="button">Submit Paths</button>
                    </form>

                </>
                :
                <>
                    <h1 className="title-container">Você já tomou um Caminho para sua Categoria</h1>
                    <NavLink className='button' to={`/user/character/${characterId}/capabilities/`}>Sair</NavLink>
                </>

            }



        </>
    );
}
