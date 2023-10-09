"use client"
import React from 'react'
import { Text, Group, Button, Container, Paper, Stack, Checkbox, TextInput, Select, Center } from '@mantine/core';
import { AppLayout } from '@/components/layout/AppLayout';
import { useForm } from '@mantine/form';
import { POST_TYPE } from '@/utils/constants/data.enum';

const NewPost = () => {
  const form = useForm({
    initialValues: {
      title: '',
      type: 'account',
      content: '',
      open: 0,
      secret: 1,
    },

    validate: {
    },
  });
  const submitPost = ()=>{
    console.log(form.values)
  }
  return (
    <AppLayout>
      <Paper mt={'xl'} radius="md" p="xl" withBorder>

        <form onSubmit={form.onSubmit(() => submitPost())}>
          <Stack>
            <TextInput
              label="标题"
              placeholder="请输入标题"
              value={form.values.title}
              onChange={(event) => form.setFieldValue('title', event.currentTarget.value)}
              radius="md"
            />
            <TextInput
              label="内容"
              placeholder="Your name"
              value={form.values.content}
              onChange={(event) => form.setFieldValue('content', event.currentTarget.value)}
              radius="md"
            />

            <Group justify="space-between">
              <Select
                maw={'10rem'}
                label="记录类型"
                placeholder="选择一个类型"
                value={form.values.type}
                data={POST_TYPE.map(item => item.value)}
              />
              <Group>
                <Checkbox
                value={form.values.secret}
                label="加密存储"
                checked={form.values.secret > 0}
                onChange={(event) => form.setFieldValue('secret', event.currentTarget.checked ? 1 : 0)}
              />
              <Checkbox
                value={form.values.open}
                label="公开"
                checked={form.values.open > 0}
                onChange={(event) => form.setFieldValue('open', event.currentTarget.checked ? 1 : 0)}
              />
              </Group>
              
            </Group>
          </Stack>

          <Group justify="flex-end" mt="xl">

            <Button type="submit" radius="xl">
              提交
            </Button>
          </Group>
        </form>
      </Paper>

    </AppLayout>
  )
}

export default NewPost
