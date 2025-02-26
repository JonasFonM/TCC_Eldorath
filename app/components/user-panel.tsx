import { user } from '@prisma/client'
import { UserCircle } from '~/components/user-circle'
import "~/styles.css";

export function UserPanel({ users }: { users: user[] }) {
  return (
    <ul>
      {users.map(user => (
        <UserCircle key={user.id} user={user} />
      ))}
    </ul>
  )
}