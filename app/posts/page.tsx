"use client"
import MantineLayout from '@/components/layout/MantineLayout'
import { Button, Container } from '@mantine/core'
import Link from 'next/link'
import React from 'react'

const Page = async () => {
  return (
    <Container>
      <MantineLayout>
        <p>
          <Link href={'/posts/new'}>new post</Link>
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
      </MantineLayout>
    </Container>
  )
}

export default Page