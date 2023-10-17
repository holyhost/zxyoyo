"use client"
import { formatDate } from '@/utils/date-helpers'
import { Card, Grid, Text, Image, Stack  } from '@mantine/core'
import { IconEye } from '@tabler/icons-react'
import React from 'react'
import { useRouter } from 'next/navigation'

export type PostItemProps = {
  _id: string,
  title: string,
  type: string,
  content: string,
  tag: string,
  open: number,
  secret: number,
  view: number,
  uid: string,
  createTime: string,
  image?: string,
}

const PostItem = ({ data }: { data: PostItemProps }) => {
  const router = useRouter()
  return (
    <Card withBorder mt={'md'} onClick={() => router.push('/posts/' + data._id)}>
      <Grid>
        <Grid.Col span={8}>
          <Stack justify="space-between">
          <Text fw={800}>{data.title}</Text>
          <Text c={'indigo'}>{data.content}</Text>
          <Text c={'gray'}><IconEye/> {formatDate(new Date(parseInt(data.createTime)))}</Text>
          </Stack>
        </Grid.Col>
        <Grid.Col span={4}>
          <Image mah={'9rem'} radius={'sm'} src={data.image ?? '/static-files/default_cover.jpeg'} />
        </Grid.Col>
      </Grid>
    </Card>

  )
}

export default PostItem
