import { getPostById } from '@/app/api/posts/[id]/route'
import SimplePostForm from '@/components/POSTS/SimplePostForm'
import { AppLayout } from '@/components/layout/AppLayout'
import { Container } from '@mantine/core'
import { Metadata } from 'next'
import React from 'react'

type Props = {
  params: { postid: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
export const revalidate = 60 // revalidate at most per minute 
export async function generateMetadata(
  { params, searchParams }: Props
): Promise<Metadata> {
  // read route params
  const id = params.postid
 
  // fetch data
  const res = await getData(id)
 
 
  return {
    title: "编辑:" + res.data.title
  }
}

const getData = async (id: string) => {
  const res = await getPostById(id)

  if (!res) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  return {data: res}
}

const EditPostPage = async ({ params }: Props) => {
  const result = await getData(params.postid)

  return (
    <>
      <AppLayout login={true}>
        <Container>
          <SimplePostForm detail={result.data}/>
        </Container>
      </AppLayout>
    </>
  )
}

export default EditPostPage
