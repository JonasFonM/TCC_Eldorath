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
        return redirect(`/characters/new/${characterId}/`)
    } catch (error) {
        console.error(error);
        return json({ error: "Failed to save lineages." }, { status: 500 });
    }

}

export default function LineageSelection() {
    const { lineages } = useLoaderData<{ lineages: lineage[] }>();
    const [selectedLineages, setSelectedLineages] = useState<number[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleLineageClick = (lineageId: number) => {
        if (selectedLineages.includes(lineageId)) {
            setSelectedLineages(selectedLineages.filter(id => id !== lineageId));
        } else {
            if (selectedLineages.length >= 2) {
                setError("You can select up to 2 lineages only.");
            } else {
                setSelectedLineages([...selectedLineages, lineageId]);
                setError(null);
            }
        }
    };
   /* const handleSubmit = async (event: React.FormEvent) => {
        if (selectedLineages.length === 0) {
            event.preventDefault();
            setError("You must select at least one lineage.");
            return;
        }

        const isPure = selectedLineages.length === 1;

        const form = new FormData();
        selectedLineages.forEach(lineageId => {
            form.append('lineages', lineageId.toString());
        });
        form.append('pure', isPure.toString());
        return;

    };
*/
    return (
            <form method="post">
                <div className="lineages-grid">
                    {lineages.map(lineage => (
                        <LineageCircle
                            key={lineage.id}
                            lineage={lineage}
                            isSelected={selectedLineages.includes(lineage.id)}
                            onClick={() => handleLineageClick(lineage.id)}
                        />
                    ))}
                </div>
                {selectedLineages.map(lineageId => (
                    <input type="hidden" key={lineageId} name="lineages" value={lineageId} />
                ))}
              {error && <p>{error}</p>}
                <button type="submit" className="submit-button">Submit Lineages</button>
            </form>
    );
}
