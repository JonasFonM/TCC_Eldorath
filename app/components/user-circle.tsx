/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { user } from '@prisma/client'
import { NavLink } from '@remix-run/react'

interface props {
  user: user,
}

export function UserCircle({ user }: props) {
  return (
    <li key={user.id}>
      <NavLink to={`/user/home/profile/${String(user.id)}`}>
        <h1>
          {user.username}
        </h1>
      </NavLink>
    </li>
  )
}