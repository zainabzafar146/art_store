import { auth } from '@/auth';
import Profile from '@/components/artist/Profile';
import React from 'react'

const page = async () => {
  const session = await auth();
  return (
    <main className="flex flex-col justify-center items-center">
      <Profile session={session ?? null} />
    </main>
  )
}

export default page
