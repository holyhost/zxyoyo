"use client"
import { AppLayout } from '@/components/layout/AppLayout'
import { Center, Loader } from '@mantine/core'
import { useRouter } from 'next/navigation'
import React, { ReactElement, useEffect, useState } from 'react'

const defaultLayout = <AppLayout><div>this is home page </div></AppLayout>
const loading = <Center p="xl"><Loader size="xl" /></Center>
const Home = ({params}: {params: {uid: string}}) => {
    const [inited, setInited] = useState<boolean>(false)
    useEffect(()=> setInited(true),[])
    const router = useRouter()

  return (
  <>
    {inited ? <AppLayout>
      <div>{params.uid}</div>
    
    </AppLayout> : loading}
  </>)
}

export default Home
