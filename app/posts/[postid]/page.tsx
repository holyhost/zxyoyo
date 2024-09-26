import PostDetail from '@/components/POSTS/PostDetail'
import { PostItemProps } from '@/components/POSTS/PostItem'
import { AppLayout } from '@/components/layout/AppLayout'
import { ResType } from '@/types/base.type'
import { Metadata } from 'next'
import React from 'react'
import { getPostById } from '@/app/api/posts/[id]/route'

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
  const data = await getPostById(id as string)
  if (!data) {
    // This will activate the closest `error.js` Error Boundary
    return {fail: true}
  }
  if(data.open !== 1){
    data.content = '******Hello Kitty'
  }
  
  // const jsonData = await res.json()
  return JSON.parse(JSON.stringify(data))
}

// We'll prerender only the params from `generateStaticParams` at build time.
// If a request comes in for a path that hasn't been generated,
// Next.js will server-render the page on-demand.
export const dynamicParams = true // or false, to 404 on unknown paths

export async function generateStaticParams() {
  const res = await fetch(process.env.NEXT_PUBLIC_APP_HOST + '/api/posts?pageSize=1000')
  const jsonData: ResType<PostItemProps[]> = await res.json()
  const ids = jsonData.data.map((post) => ({id: post._id}))
  // console.log('generate static params')
  // console.log(jsonData)
  // console.log(ids)
  // console.log('-----end-------')
  return ids
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
      <AppLayout login={detail.open !== 1}>
        <PostDetail author={author} detail={detail} />
      </AppLayout>
    </>
  )
}

export default Page
