import PoemList from '@/components/gushi/PoemList'
import { AppLayout } from '@/components/layout/AppLayout'
import { Container } from '@mantine/core'
import { Metadata } from 'next'
import React from 'react'


export const metadata: Metadata = {
  title: '每日古诗词分享',
  description: '一起来学古诗词，每日古诗词分享，李白、杜甫、苏轼...'
}
export const revalidate = 3600 * 24 // revalidate at most every 2 hour

const getData = async () =>{
    const res = await fetch( process.env.NEXT_PUBLIC_APP_HOST + '/api/gsc')
    let result: any[] = []
    try {
      let json = await res.json()
      result = json.data.data
    } catch (error) {
      console.log('home page got error😅😅😅', error)
    }finally{
      return {
        data: result
      }
    }
}

const Home = async() => {
    const data = await getData()
  return (
    <AppLayout>
        <Container mt={'md'}>
            <PoemList data={data.data} />
        </Container>
    </AppLayout>
  )
}

export default Home
