import GradientSegmentedControl from '@/components/GradientSegmentedControl/GradientSegmentedControl'
import PostList from '@/components/POSTS/PostList'
import { AppLayout } from '@/components/layout/AppLayout'
import { Button, Center, Container } from '@mantine/core'
import React from 'react'


const getData = async (postType: string = '') => {
  let data = null
  try {
    const url = process.env.NEXT_PUBLIC_APP_HOST + '/api/posts?pageSize=' + 30 + "&pageNum=0" + "&type=" + postType
    const res = await fetch(url, {next: {tags: ['post']}})
  
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      return {
        data: []
      }
    }
    data = await res.json()
  } catch (error) {
    console.log('😅😅😅posts page got error😅😅😅', error)
  }finally{
    return data ?? {data: []}
  }
  
}

const Page = async ({searchParams}: {searchParams: { [key: string]: string | string[] | undefined }}) => {
  const data = await getData(searchParams.type as string)
  return (
    <Container>
      <AppLayout>
        <Center>
          <GradientSegmentedControl />
        </Center>
        {data.data && <PostList data={data.data}/>}
      </AppLayout>
    </Container>
  )
}

export default Page