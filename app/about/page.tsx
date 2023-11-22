import UpdateHistory from '@/components/UpdateHistory/UpdateHistory'
import { AppLayout } from '@/components/layout/AppLayout'
import { Code, Container, Divider, Text } from '@mantine/core'
import React from 'react'


const AboutPage = async() => {
  return (
    <AppLayout>
        <Container mt={'lg'}>
          <Text fw={700} >简介</Text>
          <Code block mb={'md'}>
            学习古诗词，陶冶情操，弘扬中国传统文化！
            <br/>
            记录生活点点滴滴，还有一些奇怪的bug，以及解决方案！
            
          </Code>
          <Text fw={700} mt={'md'} >技术栈</Text>
          <Code block mb={'md'}>
            Framework: Nextjs;
            <br/>
            UI component: Mantine
            <br/>
            Third backend: Flask
            <br/>
            Database: MongoDB
            
          </Code>
          <Divider/>
          <UpdateHistory/>
        </Container>
    </AppLayout>
  )
}

export default AboutPage
