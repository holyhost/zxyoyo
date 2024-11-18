import { AppLayout } from '@/components/layout/AppLayout'
import { Container } from '@mantine/core'
import React from 'react'
import ShareTest from '@/components/Share/ShareTest/ShareTest';


const ShareTestPage = () => {
  
  return (
    <AppLayout>
      <Container mt={'lg'}>
        <ShareTest/>
      </Container>
    </AppLayout>
  )
}

export default ShareTestPage
