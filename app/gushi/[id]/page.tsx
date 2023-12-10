import { PoemBean } from '@/bean/PoemBean'
import PostDetail from '@/components/POSTS/PostDetail'
import { PostItemProps } from '@/components/POSTS/PostItem'
import PoemDetail from '@/components/gushi/PoemDetail'
import { AppLayout } from '@/components/layout/AppLayout'
import { Center } from '@mantine/core'
import { Metadata } from 'next'
import React from 'react'

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}
 
export async function generateMetadata(
  { params, searchParams }: Props
): Promise<Metadata> {
  // read route params
  const id = params.id
 
  // fetch data
  const res = await getData(id)
 
 
  return {
    title: res.fail ? 'Not Found:' + id : res.title
  }
}

const getData = async (id: string) => {
  const res = await fetch(process.env.NEXT_PUBLIC_APP_HOST + '/api/gsc/' + id)

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    return {fail: true}
  }
  const jsonData = await res.json()
  return jsonData.data
}

const Page = async ({ params }: Props) => {
  console.log(params)
  const result = await getData(params.id) 
  if(result?.fail) return <>404</>
  return (
    <>
      <AppLayout>
        <Center>
          <PoemDetail {...result as PoemBean}/>
        </Center>
        
      </AppLayout>
    </>
  )
}

export default Page
