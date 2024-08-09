/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { skill } from '@prisma/client'

interface props {
skill: skill
}

export function SkillCircle({skill}: props) {
  return (
    <div>
      <h3>
        {skill.name}
      </h3>
      <p>
        {skill.description}
      </p>
    </div>
  )
}