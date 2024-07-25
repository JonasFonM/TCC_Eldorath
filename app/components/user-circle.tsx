/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { user } from '@prisma/client'

interface props {
user: user
className?: string
  onClick?: (...args: any) => any
}

export function UserCircle({ user, onClick, className }: props) {
  return (
    <div
      className={`${className} cursor-pointer bg-gray-400 rounded-full flex justify-center items-center`}
      onClick={onClick}
    >
      <h2>
        {user.username.charAt(0).toUpperCase()}
      </h2>
    </div>
  )
}