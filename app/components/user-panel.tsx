import { user } from '@prisma/client'
import { UserCircle } from '~/components/user-circle'
import "~/styles.css";

export function UserPanel({ users }: { users: user[] }) {
  return (
    <>
      {users.map(user => (
        <UserCircle key={user.id} user={user} />
      ))}
    </>
  )
}