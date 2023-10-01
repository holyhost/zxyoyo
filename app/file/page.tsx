"use client"
import { AppLayout } from '@/components/layout/AppLayout'
import MantineLayout from '@/components/layout/MantineLayout'
import { Button, Container } from '@mantine/core'
import Link from 'next/link'
import React from 'react'

const Page = async () => {
  return (
    <Container>
      <AppLayout>
        <p>
          <Link href={'/file/upload'}>upload file </Link>
          <Button  color='red'>new post</Button>
          <Button>my post</Button>
        </p>
        <p>this is post 1</p>
        <p>this is post 1</p>
        <p>this is post 1</p>
        <p>this is post 1</p>
        <p>this is post 1</p>
        <p>this is post 1</p>
        <p>this is post 1</p>
        <p>this is post 1</p>
        <p>this is post 1</p>
      </AppLayout>
    </Container>
  )
}

export default Page