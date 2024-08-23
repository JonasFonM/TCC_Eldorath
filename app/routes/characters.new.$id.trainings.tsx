import { training } from ".prisma/client";
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { TrainingCircle } from "~/components/training-circle";
import { requireUserId } from "~/utils/auth.server";
import { submitCharTrainings } from "~/utils/character.server";
import { prisma } from "~/utils/prisma.server";
import { PTrelations } from "~/utils/types.server";


export const loader: LoaderFunction = async ({ request, params }) => {
  const userId = await requireUserId(request)
  const characterId = Number(params.id)
  const character_paths = await prisma.character_path.findMany({
    where: { characterId },
    include: { path: true }
  });

  const general_trainings = await prisma.training.findMany();

  const pathTrainings = await prisma.path_training.findMany({
    where: {
      pathId: { in: character_paths.map(cp => cp.pathId) },
    },
    include: {
      training: true,
    },
  });


  
  return json({ userId, general_trainings, pathTrainings });
}


export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData();
  const selectedTrainings = form.getAll('trainings') as string[];
  const selectedTrainingIds = selectedTrainings.map(id => parseInt(id))
  const characterId = params.id
  const tier = 1

  await submitCharTrainings(selectedTrainingIds, Number(characterId), tier)

  return redirect(`/characters/new/${characterId}/`)
}

export default function TrainingSelectionRoute() {
  const { general_trainings, pathTrainings } = useLoaderData<{ general_trainings: training[], pathTrainings: PTrelations}>();
  const [selectedTrainings, setSelectedTrainings] = useState<number[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [tierMap, setTierMap] = useState<{ [key: number]: number }>({});

  const pathTierSum = pathTrainings.reduce((acc, pt) => acc + pt.trainingTier, 0);

  const handleTrainingClick = (trainingId: number) => {
    setSelectedTrainings((prevTrainings) => {
      const isSelected = prevTrainings.includes(trainingId);
      const newTierMap = { ...tierMap };

      if (isSelected) {
        // Deselect training
        delete newTierMap[trainingId];
      } else {
        // Select training with an initial Tier of 1
        const newTierValue = 1;
        const currentTotalTier = Object.values(newTierMap).reduce((sum, tier) => sum + tier, 0) + pathTierSum;

        if (currentTotalTier + newTierValue > 3) {
          setError("You can't select this training because it would exceed the Tier limit.");
          return prevTrainings;
        }

        newTierMap[trainingId] = newTierValue;
        setError(null);
      }

      setTierMap(newTierMap);
      return isSelected ? prevTrainings.filter(id => id !== trainingId) : [...prevTrainings, trainingId];
    });
  };

  return (
    <form method="post">
      <div className="path-trainings">
        {pathTrainings.map(pt => (
          <TrainingCircle
            key={pt.training.id}
            training={pt.training}
            isSelected={true}
            onClick={() => null}
          />
        ))}
      </div>
      {pathTrainings.map(pt => (
        <input type="hidden" key={pt.trainingId} name="tier" value={pt.trainingTier} />
      ))}

      <div className="trainings-grid">
        {general_trainings.map(training => (
          <TrainingCircle
            key={training.id}
            training={training}
            isSelected={selectedTrainings.includes(training.id)}
            onClick={() => handleTrainingClick(training.id)}
          />
        ))}
      </div>
      {selectedTrainings.map(trainingId => (
        <input type="hidden" key={trainingId} name="trainings" value={trainingId} />
      ))}
      {Object.entries(tierMap).map(([trainingId, tierValue]) => (
        <input type="hidden" key={trainingId} name="tier" value={tierValue} />
      ))}
       
      {error && <p>{error}</p>}

      <button type="submit" className="submit-button">Submit Trainings</button>
    </form>
  );
}