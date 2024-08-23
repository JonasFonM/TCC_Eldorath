import { path } from "@prisma/client";
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
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
        where: { pathTier: character?.tier }}
    )


    return json({ userId, paths });
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
        return redirect(`/characters/new/${characterId}/`)
    } catch (error) {
        console.error(error);
        return json({ error: "Failed to save paths." }, { status: 500 });
    }

}

export default function PathSelection() {
    const { paths } = useLoaderData<{ paths: path[] }>();
    const [selectedPaths, setSelectedPaths] = useState<number[]>([]);
    const [error, setError] = useState<string | null>(null);
    const maxSelectable = 1;

    
    const isMaxSelected = selectedPaths.length >= maxSelectable;


    const handlePathClick = (pathId: number) => {
        setSelectedPaths((prevPaths) => {
            const isSelected = prevPaths.includes(pathId);
    
            const newSelectedLineages = isSelected
                ? prevPaths.filter(id => id !== pathId)
                : [...prevPaths, pathId];
    
            if (newSelectedLineages.length > 1) {
                setError("You can select 1 only path.");
                return prevPaths; 
            } else {
                setError(null);
            }
    
            return newSelectedLineages;
        });
    };

    return (
        <form method="post">
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

            <button type="submit" className="submit-button">Submit Paths</button>
        </form>
    );
}
