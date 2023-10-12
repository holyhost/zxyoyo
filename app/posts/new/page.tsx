import React from 'react'
import { Container } from '@mantine/core';
import { AppLayout } from '@/components/layout/AppLayout';
import SimplePostForm from '@/components/POSTS/SimplePostForm';

const getUserDetail = async ()=> {

  const res = await fetch( process.env.NEXT_PUBLIC_APP_HOST + '/api/user')
  if (!res.ok) {
    return null
  }
 
  return res.json()

}


const NewPost = async() => {
  const data = await getUserDetail()
  console.log(123,data)
  
  return (
    <AppLayout login={true}>
      <Container>
        <SimplePostForm/>
      </Container>
    </AppLayout>
  )
}

export default NewPost
