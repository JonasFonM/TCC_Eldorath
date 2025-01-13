import { training } from ".prisma/client";
import { ActionFunction, json, LoaderFunction, redirect } from "@remix-run/node";
import { NavLink, useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { TrainingCircle } from "~/components/training-circle";
import { requireUserId } from "~/utils/auth.server";
import { submitCharTrainings } from "~/utils/personagem.server";
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
            { tier: 1 },
          ]
        }
        ]

    },
    orderBy: { type: 'asc' }

  });

  const maxSelectable = character?.pendingTrainings;



  return json({ userId, selectable_trainings, pathTrainings, maxSelectable, characterId });
}


export const action: ActionFunction = async ({ request, params }) => {
  const form = await request.formData();
  const selectedTrainings = form.getAll('trainings') as string[];
  const pendingTrainings = form.get('pendingTrainings') as string;
  const selectedTrainingIds = selectedTrainings.map(id => parseInt(id))
  const characterId = params.id

  await submitCharTrainings(selectedTrainingIds, Number(characterId), Number(pendingTrainings))

  return redirect(`../../trainings`)
}

export default function TrainingSelectionRoute() {
  const { selectable_trainings, pathTrainings, maxSelectable } = useLoaderData<{ selectable_trainings: training[], pathTrainings: PTrelations, maxSelectable: number, characterId: string }>();
  const [selectedTrainings, setSelectedTrainings] = useState<number[]>([]);
  const hasPath = pathTrainings.length >= 1;

  const handleTrainingClick = (trainingId: number) => {
    setSelectedTrainings((prevTrainings) => {
      const isSelected = prevTrainings.includes(trainingId);
      const newSelectedTrainings =
        isSelected ? prevTrainings.filter(id => id !== trainingId) : [...prevTrainings, trainingId];

      if (newSelectedTrainings.length > maxSelectable) {
        alert("Você já escolheu o máximo de Treinos possível.");
        return prevTrainings;
      }
      return newSelectedTrainings
    });
  };

  return (
    <> {maxSelectable > 0 ?
      <>
        <form method="post">
          <h1 className="title-container">Escolha até {maxSelectable} Treino(s)<NavLink to={`../../trainings`} style={{ color: 'red' }} className="question-button">X</NavLink></h1>

          <h2 style={{ display: hasPath ? 'block' : 'none' }}>Treinos recebidos por seu Caminho:</h2>
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
          <input type="hidden" key={maxSelectable} name="pendingTrainings" value={maxSelectable} />


          <button type="submit" className="button">Confirmar</button>
        </form>
      </>
      :

      <>
        <h1 className="title-container">Máximo de escolhas atingido</h1>
        <NavLink to={`../../trainings`} className="button">Sair</NavLink>

      </>
    }
    </>
  );
}