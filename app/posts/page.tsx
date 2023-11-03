import GradientSegmentedControl from '@/components/GradientSegmentedControl/GradientSegmentedControl'
import PostList from '@/components/POSTS/PostList'
import MantineLayout from '@/components/layout/MantineLayout'
import { Button, Center, Container } from '@mantine/core'
import Link from 'next/link'
import React from 'react'

const getData = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_APP_HOST + '/api/posts?pageSize=' + 30 + "&pageNum=0")
  // const res = await fetch('http://localhost:3000/api/posts')

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return {
      data: []
    }
  }
  try {
    let json = await res.json()
    console.log("------jsontype-----")
    console.log(typeof(json))
    console.log(json)
    console.log("------jsontype-----")
    return json
  } catch (error) {
    console.log('😅😅😅posts page got error😅😅😅', error)
  }finally{
    return {
      data: []
    }
  }
  
}

const Page = async () => {
  const data = await getData()
  return (
    <Container>
      <MantineLayout>
        <Center>
          <GradientSegmentedControl />
        </Center>

        <p>
          <Link href={'/posts/new'}>upload file</Link>
          <Button color='red' component='a' href={'/posts/new'}>new post</Button>
          <Button component='a' href={'/posts/my'}>my post</Button>
        </p>
        {data.data && <PostList data={data.data}/>}
      </MantineLayout>
    </Container>
  )
}

export default Page