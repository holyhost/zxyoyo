import { AppLayout } from '@/components/layout/AppLayout'
import { Container } from '@mantine/core'
import React from 'react'
import ShareTest from '@/components/Share/ShareTest/ShareTest';
import Go2Top from '@/components/Go2Top/Go2Top';


const ShareTestPage = () => {
  
  return (
    <AppLayout>
      <Container mt={'lg'}>
        <ShareTest/>
      </Container>
      <Go2Top/>
    </AppLayout>
  )
}

export default ShareTestPage
