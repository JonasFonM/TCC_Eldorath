import { path } from "@prisma/client";
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { PathCircle } from "~/components/path-circle";
import { requireUserId } from "~/utils/auth.server";
import { submitCharPaths } from "~/utils/character.server";
import { prisma } from "~/utils/prisma.server";

export const loader: LoaderFunction = async ({ request }) => {
    const userId = await requireUserId(request)
    const paths = await prisma.path.findMany()
    return json({ userId, paths });
}

export const action: ActionFunction = async ({ request, params }) => {
    const form = await request.formData();
    const selectedPaths = form.getAll('paths') as string[];
    const selectedPathIds = selectedPaths.map(id => parseInt(id))
    const pure = form.get('pure') === 'true';
    const characterId = params.id

    if (!selectedPaths || selectedPaths.length === 0) {
        return json({ error: "You must select at least one path." }, { status: 400 });
    }
    try {
        await submitCharPaths(selectedPathIds, Number(characterId), pure)
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
    const [isPure, setPure] = useState<boolean>(true);
    const maxSelectable = 2;

    
    const isMaxSelected = selectedPaths.length >= maxSelectable;


    const handlePathClick = (pathId: number) => {
        setSelectedPaths((prevSelectedPaths) => {
            const newSelectedPaths = prevSelectedPaths.includes(pathId)
                ? prevSelectedPaths.filter(id => id !== pathId)
                : [...prevSelectedPaths, pathId];

            setPure(newSelectedPaths.length === 1); 
            if (selectedPaths.length >= 2) {
                setError("You can select up to 2 paths only.");
            } else {
                setSelectedPaths([...selectedPaths, pathId]);
                setError(null);
            }
            return newSelectedPaths;
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
                        onClick={() => !isMaxSelected ? handlePathClick(path.id) : null}
                    />
                ))}
            </div>
            {selectedPaths.map(pathId => (
                <input type="hidden" key={pathId} name="paths" value={pathId} />
            ))}

            <input type="hidden" key='pure' name="pure" value={isPure ? 'true' : 'false'} />
            
            {error && <p>{error}</p>}
            <button type="submit" className="submit-button">Submit Paths</button>
        </form>
    );
}
