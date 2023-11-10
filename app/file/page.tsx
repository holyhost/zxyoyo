import { AppLayout } from '@/components/layout/AppLayout'
import { Button, Container, Divider, Grid } from '@mantine/core'
import { getServerSession } from 'next-auth'
import Link from 'next/link'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import FileManage from '@/components/FileUpload/FileManage'

const getData = async () => {
  const session = await getServerSession(authOptions)
  if(!session || !session.user) return {
    total: 0,
    data: []
  }
  const res = await fetch(process.env.NEXT_PUBLIC_APP_HOST + '/api/file?pageSize='+30+"&pageNum=0" + "&id=" + session.user._id)
    // The return value is *not* serialized
    // You can return Date, Map, Set, etc.

    if (!res.ok) {
        // This will activate the closest `error.js` Error Boundary
        console.log(res.status)
        throw new Error('Failed to fetch data')
    }

    return res.json()
}

const Page = async () => {
  const data = await getData()
  return (
    <Container>
      <AppLayout>
        <p>
          <Link href={'/file/upload'}>upload file </Link>
          <Button  color='red'>new post</Button>
          <Button>my post</Button>
        </p>
        <Divider my="xs" label={`共有文件${data.total}个`} labelPosition="center" />
        <FileManage data={data.data} />
      </AppLayout>
    </Container>
  )
}

export default Page