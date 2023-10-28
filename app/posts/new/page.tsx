import React from 'react'
import { Container } from '@mantine/core';
import { AppLayout } from '@/components/layout/AppLayout';
import SimplePostForm from '@/components/POSTS/SimplePostForm';




const NewPost = async() => {
  
  return (
    <AppLayout login={true}>
      <Container>
        <SimplePostForm/>
      </Container>
    </AppLayout>
  )
}

export default NewPost
