/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { user } from '@prisma/client'

interface props {
  user: user
}

export function UserCircle({ user }: props) {
  return (
    <li>
      <h1>
        {user.username}
      </h1>
    </li>
  )
}