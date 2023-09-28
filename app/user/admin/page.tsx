import React from 'react'
import { getServerSession } from "next-auth/next"
import { authOptions } from '@/app/api/auth/[...nextauth]/route'

const Page = async() => {
  const session = await getServerSession(authOptions)
  return (
    <div>
      this is hello kitty
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </div>
  )
}

export default Page
