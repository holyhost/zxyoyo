import PoemList from '@/components/gushi/PoemList'
import { AppLayout } from '@/components/layout/AppLayout'
import { Container } from '@mantine/core'
import React from 'react'

const getData = async () =>{
    const res = await fetch( 'http://localhost:3000/api/gsc')
    try {
      let json = await res.json()
      console.log("------jsontype-----")
      console.log(typeof(json))
      console.log(json)
      console.log("------jsontype-----")
      return json
    } catch (error) {
      console.log('home page got error😅😅😅', error)
    }finally{
      return {
        data: []
      }
    }
}

const Home = async() => {
    const data = await getData()
  return (
    <AppLayout>
        <Container mt={'lg'}>
            <PoemList data={data.data.data} />
        </Container>
    </AppLayout>
  )
}

export default Home
