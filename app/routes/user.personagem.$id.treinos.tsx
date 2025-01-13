import { NavLink, useOutletContext } from "@remix-run/react";
import { trainingWithTier } from "~/utils/types.server";
import { TrainingCircle } from "~/components/training-circle";
import { LoaderFunction } from "@remix-run/node";

export const loader: LoaderFunction = async ({ params }) => {
  const characterId = params.id;
  return (characterId)
}

export default function SkillsRoute() {
  const { trainingsWithTier } = useOutletContext<{ trainingsWithTier: trainingWithTier}>();

  return (
    <>

        <div className="title-container">
                <NavLink to={`../new/trainings/`}> <h1 style={{marginTop: '0', marginBottom: '0', padding: '0'}}>Treinos</h1></NavLink>
                <NavLink className="question-button" to={`/user/home/atr/`}>?</NavLink>
            </div>

        <div className="trainings-grid">
          {trainingsWithTier.map(tt => (
            <TrainingCircle
              key={tt.training.id}
              training={tt.training}
              isSelected={false}
              onClick={() => null}
            />
          ))}
        </div>

    </>
  )
}