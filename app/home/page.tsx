import PoemList from '@/components/gushi/PoemList'
import { AppLayout } from '@/components/layout/AppLayout'
import { Container } from '@mantine/core'
import React from 'react'

const getData = async () =>{
    const res = await fetch( 'http://localhost:3000/api/gsc')
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.
   
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      throw new Error('Failed to fetch data')
    }
   
    return res.json()
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
