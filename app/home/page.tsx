import PoemList from '@/components/gushi/PoemList'
import { AppLayout } from '@/components/layout/AppLayout'
import { Container } from '@mantine/core'
import React from 'react'

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
