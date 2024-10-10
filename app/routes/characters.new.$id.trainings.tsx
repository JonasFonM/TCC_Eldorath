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
    },
    include: {
      training: true,
    },
  });

  const charTrainings = await prisma.character_training.findMany({
    where: {
      trainingId: { in: character?.trainings.map(pc => pc.trainingId) },
      AND: [{
        NOT: [{
          trainingId: { in: pathTrainings?.map(pt => pt.trainingId) }
        }],
      }],
    },
    include: {
      training: true,
    },

  });

  const selectable_trainings = await prisma.training.findMany({
    where: {
      OR:
        [{
          AND: [
            {
              NOT:
                { id: { in: character?.trainings.map(t => t.trainingId) } },
            },
            {
              NOT:
                { id: { in: pathTrainings?.map(pt => pt.trainingId) } },
            },
            {
              NOT:
              {
                AND: [
                  { tier: { in: charTrainings?.map(ct => ct.training.tier) } },
                  { type: { in: charTrainings?.map(ct => ct.training.type) } }
                ],
              },
            },
          ]
        },
        {
          AND: [
            {
              NOT:
                { id: { in: character?.trainings.map(t => t.trainingId) } },
            },
            {
              NOT:
                { id: { in: pathTrainings?.map(pt => pt.trainingId) } },
            },
            {tier: 1},
          ]
        }
      ]

    },
    orderBy: { type: 'asc' }

  });



  return json({ userId, selectable_trainings, pathTrainings });
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
  const { selectable_trainings, pathTrainings } = useLoaderData<{ selectable_trainings: training[], pathTrainings: PTrelations }>();
  const [selectedTrainings, setSelectedTrainings] = useState<number[]>([]);
  const hasPath = pathTrainings.length >= 1;

  const handleTrainingClick = (trainingId: number) => {
    setSelectedTrainings((prevTrainings) => {
      const isSelected = prevTrainings.includes(trainingId);
      const newSelectedTrainings =
        isSelected ? prevTrainings.filter(id => id !== trainingId) : [...prevTrainings, trainingId];

      if (newSelectedTrainings.length > 1) {
        alert("You can select only 1 training.");
        return prevTrainings;
      }
      return newSelectedTrainings
    });
  };

  return (
    <form method="post">
      <h2 style={{ display: hasPath ? 'block' : 'none'}}>Trainings gained from your Paths</h2>
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

      <h2>Choose your Trainings</h2>
      <div className="trainings-grid">
        {selectable_trainings.map(training => (
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

      <button type="submit" className="button">Submit Trainings</button>
    </form>
  );
}