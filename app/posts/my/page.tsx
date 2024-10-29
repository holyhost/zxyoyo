"use client"
import GradientSegmentedControl from '@/components/GradientSegmentedControl/GradientSegmentedControl'
import PostList from '@/components/POSTS/PostList'
import { AppLayout } from '@/components/layout/AppLayout'
import { Button, Center, Container } from '@mantine/core'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'



const Page = () => {
  const [data, setData] = useState([])
  const { data: session } = useSession()
  
  useEffect(()=>{
    const getData = async () => {
      const res = await fetch(process.env.NEXT_PUBLIC_APP_HOST 
        + '/api/posts?pageSize=' + 38 
        + "&pageNum=0", {next: {tags: ['note']}})
      const resJson = await res.json()
      if (!res.ok) {
        // show error
        return
      }
      setData(resJson.data)
    }
    getData()
  }, [])
  return (
      <AppLayout login={true}>
        <Center>
          <GradientSegmentedControl />
        </Center>
        {data && <PostList data={data}/>}
      </AppLayout>
  )
}

export default Page