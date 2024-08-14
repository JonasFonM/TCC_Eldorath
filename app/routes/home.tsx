/* eslint-disable @typescript-eslint/no-explicit-any */
import { LoaderFunction, json } from '@remix-run/node'
import { requireUserId } from '~/utils/auth.server'
import { UserPanel } from '~/components/user-panel'
import { getOtherUsers } from '~/utils/user.server'
import { useLoaderData } from '@remix-run/react'


export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request)
  const users = await getOtherUsers(userId)
  return json({ users })
}

export default function Home() {
  const { users } = useLoaderData<any>()
  return (
    <>
      <h1>Welcome</h1>
      <main>
        <div className="container">
          <UserPanel users={users} />
        </div>
      </main>
    </>
  )
}