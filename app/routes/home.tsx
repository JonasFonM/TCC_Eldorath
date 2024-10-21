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
      <h1 className='title-screen'>Welcome<br></br>to<br></br> Aeternida</h1>
      <main>
          <UserPanel users={users} />
      </main>
    </>
  )
}