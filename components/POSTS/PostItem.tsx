"use client"
import { formatDate } from '@/utils/date-helpers'
import { Card, Grid, Text, Image, Stack, Avatar, Center, Menu, Group, ActionIcon } from '@mantine/core'
import { IconDotsVertical, IconEdit, IconTrash } from '@tabler/icons-react'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { UserBean } from '@/bean/UserBean'

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

const PostItem = ({ data, deleteItem }: { data: PostItemProps, deleteItem?: ()=>void }) => {
  const router = useRouter()
  const { data : session } = useSession()
  const user = session?.user as UserBean
  const goDetail = ()=> router.push('/posts/' + data._id)
  return (
    <Card withBorder mt={'md'}>
      <Grid>
        <Grid.Col span={8} h={'100%'}>
          <Stack justify="space-between" h={'9rem'}>
            <Text fw={800} onClick={goDetail}>{data.title}</Text>
            <Text c={'teal'}
              style={{ overflow: 'hidden' }}
              onClick={goDetail}
              mah={'5rem'} >
              {data.content}
            </Text>
            <Group justify={'space-between'}>
              <Text c={'gray'}>😊 {formatDate(new Date(parseInt(data.createTime)))}</Text>
              {user && user._id === data.uid  && <Menu withArrow trigger="hover" transitionProps={{ exitDuration: 10 }} withinPortal>
                <Menu.Target>
                  <ActionIcon
                    variant="transparent"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                  >
                    <IconDotsVertical color='teal' />
                  </ActionIcon>
                  
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    onClick={()=> router.push(`/posts/${data._id}/edit`)}
                    leftSection={<IconEdit size={14} />}
                    key={'posts-item-edit'}>
                    <Text>编辑</Text>
                  </Menu.Item>
                  <Menu.Item
                    onClick={deleteItem}
                    leftSection={<IconTrash size={14} />}
                    key={'posts-item-delete'}>
                    <Text c={'red'}>删除</Text>
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>}
            </Group>

          </Stack>
        </Grid.Col>
        <Grid.Col span={4}>
          <Image onClick={goDetail} mah={'9rem'} radius={'sm'} src={data.image ?? '/static-files/default_cover.jpeg'} />
        </Grid.Col>
      </Grid>
    </Card>

  )
}

export default PostItem
