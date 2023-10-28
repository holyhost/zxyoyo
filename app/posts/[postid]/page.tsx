import PostDetail from '@/components/POSTS/PostDetail'
import { AppLayout } from '@/components/layout/AppLayout'
import { Metadata } from 'next'
import React from 'react'

type Props = {
  params: { postid: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
 
export async function generateMetadata(
  { params, searchParams }: Props
): Promise<Metadata> {
  // read route params
  const id = params.postid
 
  // fetch data
  const res = await getData(id)
 
 
  return {
    title: res.data.title
  }
}

const getData = async (id: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_APP_HOST + '/api/posts/' + id)

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

const Page = async ({ params }: Props) => {
  const result = await getData(params.postid)
  const author = {
    name: result.data.authorName ?? '晴天小猪',
    image: result.data.authorImage ?? '/admin.png'
  }
  const detail = {
    content: result.data.content,
    secret: result.data.secret,
    type: result.data.type
  }
  return (
    <>
      <AppLayout>
        <PostDetail author={author} detail={detail} />
      </AppLayout>
    </>
  )
}

export default Page
