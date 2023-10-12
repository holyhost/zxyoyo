"use client"
import React, { useEffect, useState } from 'react'
import { Text, Group, Button, Container, Paper, Stack, Checkbox, TextInput, Select, Center } from '@mantine/core';
import { useForm } from '@mantine/form';
import { POST_TYPE } from '@/utils/constants/data.enum';
import { notifications } from '@mantine/notifications';
import { mymd5, toAesSource, toAesString } from '@/utils/crypto-helper';
import { useSession } from 'next-auth/react';
import { useCurrentUser, useUserStore } from '@/store/user.store';
import PinDialog from '../Dialog/PinDialog';
import { useDisclosure } from '@mantine/hooks';

const SimplePostForm = () => {
  const user = useCurrentUser()
  const userStore = useUserStore()
  const [opened, setOpened] = useState(false)
  const [errorPin, setErrorPin] = useState(false)
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
  const onDialogClose = () => {
    console.log('onDialogClose')
    setOpened(false)
    if(userStore.pin) {
      submitPost()
    }
  }
  const onPinComplete = (pin: string) => {
    const md5Key = mymd5(pin)
    console.log('md5Key', md5Key)
    if(user && md5Key === user.keys){
      console.log('pin: check successfully')
      userStore.setpin(pin)
      setOpened(false)
      // submitPost()
    }else{
      setErrorPin(true)
    }
  }
  const submitPost = async () => {

    const bodyData = form.values
    if (form.values.secret && user) {
      // check pin user input
      console.log(userStore.pin)
      if(!userStore.pin) {
        setOpened(true)
        return
      }
      console.log(userStore.pin)
      const secretContent = toAesString(JSON.stringify(form.values), userStore.pin)
      bodyData.content = secretContent
    }
    const response = await fetch('/api/posts', {
      method: 'POST',
      body: JSON.stringify(bodyData)
    })
    if (response.ok) {
      notifications.show({
        title: "🎉 🎉 🎉 恭喜 🎉 🎉 🎉",
        message: `数据保存成功！`
      })
      form.reset()

    } else {
      notifications.show({
        title: "😒 😒 😒 出错了 😒 😒 😒",
        message: `数据保存失败！`
      })
    }
  }
  return (
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
            placeholder="请输入内容"
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
              onChange={(event) => event && form.setFieldValue('type', event)}
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
      <PinDialog 
        opened={opened} 
        error={errorPin}
        onPinChange={()=> setErrorPin(false)}
        onComplete={onPinComplete} 
        onClose={onDialogClose}/>
    </Paper>

  )
}

export default SimplePostForm
