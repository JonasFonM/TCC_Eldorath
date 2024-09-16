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
 
  const character = await prisma.character.findUnique({
    where: { id: characterId },
    include: {
      trainings: true,
      paths: true
    }
  });

  const pathTrainings = await prisma.path_training.findMany({
    where: {
      pathId: { in: character?.paths.map(pc => pc.pathId) },
      AND: [{
        NOT: [{
          trainingId: {in: character?.trainings.map(pt => pt.trainingId)}
      }],
    }],
    },
    include: {
      training: true,
    },
  });

  const general_trainings = await prisma.training.findMany({
      where: {
      NOT: [{
        id: { in: character?.trainings.map(t => t.trainingId) }
      }],
      OR: [{
        prerequisiteId: { in: character?.trainings.map(training => training.trainingId) },
      },
      { prerequisiteId: null }], 
    },

  });



  return json({ userId, general_trainings, pathTrainings });
}


export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData();
  const selectedTrainings = form.getAll('trainings') as string[];
  const selectedTrainingIds = selectedTrainings.map(id => parseInt(id))
  const characterId = params.id

  await submitCharTrainings(selectedTrainingIds, Number(characterId))

  return redirect(`/characters/${characterId}/`)
}

export default function TrainingSelectionRoute() {
  const { general_trainings, pathTrainings } = useLoaderData<{ general_trainings: training[], pathTrainings: PTrelations }>();
  const [selectedTrainings, setSelectedTrainings] = useState<number[]>([]);

  const handleTrainingClick = (trainingId: number) => {
    setSelectedTrainings((prevTrainings) => {
      const isSelected = prevTrainings.includes(trainingId);
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
        <input type="hidden" key={pt.trainingId} name="trainings" value={pt.trainingId} />
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

      <button type="submit" className="submit-button">Submit Trainings</button>
    </form>
  );
}