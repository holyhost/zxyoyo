import PostDetail from '@/components/POSTS/PostDetail'
import { PostItemProps } from '@/components/POSTS/PostItem'
import { AppLayout } from '@/components/layout/AppLayout'
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
    title: res.fail ? 'Not Found:' + id : res.title
  }
}

const getData = async (id: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_APP_HOST + '/api/posts/' + id)

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return {fail: true}
  }
  const jsonData = await res.json()
  return jsonData.data
}

const Page = async ({ params }: Props) => {
  const result = await getData(params.postid)
  if(result?.fail) return <>123</>
  const author = {
    name: result.authorName ?? '晴天小猪',
    image: result.authorImage ?? '/admin.png'
  }
  const detail = result as PostItemProps
  return (
    <>
      <AppLayout>
        <PostDetail author={author} detail={detail} />
      </AppLayout>
    </>
  )
}

export default Page
