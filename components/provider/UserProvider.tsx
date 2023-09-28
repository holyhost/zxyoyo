"use client"
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

const UserProvider = ({children, session}:{children: ReactNode, session: any}) => {
  return (
    <SessionProvider session={session}>
        {children}
    </SessionProvider>
  )
}

export default UserProvider
