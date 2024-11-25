import { lineage } from "@prisma/client";
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { LineageCircle } from "~/components/lineage-circle";
import { requireUserId } from "~/utils/auth.server";
import { submitCharLineages } from "~/utils/character.server";
import { prisma } from "~/utils/prisma.server";

export const loader: LoaderFunction = async ({ request, params }) => {
    const userId = await requireUserId(request)
    const lineages = await prisma.lineage.findMany()

    const characterId = Number(params.id)

    const character = await prisma.character.findUnique({
        where: { id: characterId },
        include: { skills: true }
    });

    const maxSelectable = character?.pendingLineages;

    return json({ userId, lineages, maxSelectable });
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
        return redirect(`/user/character/${characterId}/`)
    } catch (error) {
        console.error(error);
        return json({ error: "Failed to save lineages." }, { status: 500 });
    }

}

export default function LineageSelection() {
    const { lineages, maxSelectable } = useLoaderData<{ lineages: lineage[], maxSelectable: number }>();
    const [selectedLineages, setSelectedLineages] = useState<number[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [isPure, setPure] = useState<boolean>(true);

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
            if (newSelectedLineages.length > maxSelectable) {
                setError("You cannot select any more lineages.");
                return prevSelectedLineages; // Prevent the addition if limit is exceeded
            } else {
                setError(null);
            }

            return newSelectedLineages;
        });
    };

    const handleSubmit = async (event: React.FormEvent) => {

        if (!selectedLineages || selectedLineages.length <= 0) {
            event.preventDefault();

            return alert(`Please select at least one Lineage.`);
        }
        return;
    }



return (
    <form method="post" onSubmit={handleSubmit}>

        <h1>Choose up to {maxSelectable} Lineages</h1>
        <h3>Choosing a single Lineage makes it Pure</h3>

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

        <button type="submit" className="button">Submit Lineages</button>
    </form>
);
}
