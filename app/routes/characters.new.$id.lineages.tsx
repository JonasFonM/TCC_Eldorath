import { lineage } from "@prisma/client";
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { LineageCircle } from "~/components/lineage-circle";
import { requireUserId } from "~/utils/auth.server";
import { submitCharLineages } from "~/utils/character.server";
import { prisma } from "~/utils/prisma.server";

export const loader: LoaderFunction = async ({ request }) => {
    const userId = await requireUserId(request)
    const lineages = await prisma.lineage.findMany()
    return json({ userId, lineages });
}

export const action: ActionFunction = async ({ request, params }) => {
    const form = await request.formData();
    const selectedLineages = form.getAll('lineages') as string[];
    const selectedLineageIds = selectedLineages.map(id => parseInt(id))
    const pure = form.get('pure') === 'true';
    const characterId = params.id
 
    if (!selectedLineages || selectedLineages.length === 0) {
        return json({ error: "You must select at least one lineage." }, { status: 400 });
    }
    try {
        await submitCharLineages(selectedLineageIds, Number(characterId), pure)
        return redirect(`/characters/${characterId}/`)
    } catch (error) {
        console.error(error);
        return json({ error: "Failed to save lineages." }, { status: 500 });
    }

}

export default function LineageSelection() {
    const { lineages } = useLoaderData<{ lineages: lineage[] }>();
    const [selectedLineages, setSelectedLineages] = useState<number[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isPure, setPure] = useState<boolean>(true);
    const maxSelectable = 2;
   
    const isMaxSelected = selectedLineages.length >= maxSelectable;

    const handleLineageClick = (lineageId: number) => {
        setSelectedLineages((prevSelectedLineages) => {
            // Determine if the lineage is already selected
            const isSelected = prevSelectedLineages.includes(lineageId);
    
            // Filter out the lineage if it's already selected, otherwise add it
            const newSelectedLineages = isSelected
                ? prevSelectedLineages.filter(id => id !== lineageId)
                : [...prevSelectedLineages, lineageId];
    
            // Update the 'pure' state based on the number of selected lineages
            setPure(newSelectedLineages.length === 1);
    
            // Handle error state based on the number of selected lineages
            if (newSelectedLineages.length > 2) {
                setError("You can select up to 2 lineages only.");
                return prevSelectedLineages; // Prevent the addition if limit is exceeded
            } else {
                setError(null);
            }
    
            return newSelectedLineages;
        });
    };


    return (
        <form method="post">
            <div className="lineages-grid">
                {lineages.map(lineage => (
                    <LineageCircle
                        key={lineage.id}
                        lineage={lineage}
                        isSelected={selectedLineages.includes(lineage.id)}
                        onClick={() => !isMaxSelected || selectedLineages.includes(lineage.id) ? handleLineageClick(lineage.id) : null}
                    />
                ))}
            </div>
            {selectedLineages.map(lineageId => (
                <input type="hidden" key={lineageId} name="lineages" value={lineageId} />
            ))}

            <input type="hidden" key='pure' name="pure" value={isPure ? 'true' : 'false'} />
            
            {error && <p>{error}</p>}
            
            <button type="submit" className="submit-button">Submit Lineages</button>
        </form>
    );
}
