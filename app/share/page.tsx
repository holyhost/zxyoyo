import { AppLayout } from '@/components/layout/AppLayout'
import { Container } from '@mantine/core'
import React from 'react'
import ShareMenu from '@/components/Share/ShareMenu/ShareMenu';


const SharePage = () => {
  
  return (
    <AppLayout>
      <Container mt={'lg'}>
        <ShareMenu/>
      </Container>
    </AppLayout>
  )
}

export default SharePage
