"use client"
import { SessionProvider } from 'next-auth/react'
import React, { ReactNode } from 'react'

// type UserSession = {
//   email?: string
//   image?: string, 
//   keys?: string, 
//   name?: string, 
//   password?: string, 
//   role?: string, 
//   _id?: string, 
// }

// type MySession = {
//   expires: string,
//   user: UserSession
// }

const UserProvider = ({children, session}:{children: ReactNode, session: any}) => {
  return (
    <SessionProvider session={session}>
        {children}
    </SessionProvider>
  )
}

export default UserProvider
