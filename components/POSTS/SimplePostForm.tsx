"use client"
import React, { useEffect, useState } from 'react'
import { Text, Group, Button, Image, Paper, Stack, Checkbox, TextInput, Select, Center, Textarea, Overlay, Switch, TagsInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { POST_TYPE, constants } from '@/utils/constants/data.enum';
import { notifications } from '@mantine/notifications';
import { mymd5, toAesSource, toAesString } from '@/utils/crypto-helper';
import { useCurrentUser, useUserStore } from '@/store/user.store';
import PinDialog from '../Dialog/PinDialog';
import { PostItemProps } from './PostItem';
import { useSession } from 'next-auth/react';
import UploadFile from '../FileUpload/UploadFile';
import { MIME_TYPES } from '@mantine/dropzone';

type Props = {
  detail?: PostItemProps
}

const SimplePostForm = ({ detail }: Props) => {
  // const user = useCurrentUser()
  const userStore = useUserStore()
  const { data: session } = useSession()
  const [opened, setOpened] = useState(false)
  const [hasCover, setHasCover] = useState(detail?.cover ? true : false)
  const [errorPin, setErrorPin] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const imgHost = process.env.NEXT_PUBLIC_BACKEND_HOST + "/app"
  const form = useForm({
    initialValues: {
      title: detail?.title ?? '',
      cover: detail?.cover ?? '',
      type: detail?.type ?? 'account',
      content: detail?.content ?? '',
      tag: detail?.tag ?? '',
      open: detail?.open ?? 0,
      secret: detail?.secret ?? 1,
    },

    validate: {
    },
  })
  const onDialogClose = () => {
    setOpened(false)
    if (userStore.pin) {
      submitPost()
    }
  }
  useEffect(() => {
    if (session && !userStore.initialed && !userStore.detail) userStore.fetch('/api/user')
  }, [session])
  const onPinComplete = (pin: string) => {
    const md5Key = mymd5(pin)
    if (userStore.detail && md5Key === userStore.detail.keys) {
      userStore.setpin(pin)
      onDialogClose()
    } else {
      setErrorPin(true)
    }
  }
  const submitPost = async () => {
    const bodyData = { ...form.values, _id: detail?._id }
    if (form.values.secret && userStore.detail) {
      // check pin user input
      if (!userStore.pin) {
        setOpened(true)
        return
      }
      const secretContent = toAesString(JSON.stringify(form.values), userStore.pin)
      bodyData.content = secretContent
    }
    setSubmitting(true)
    const url = detail?._id ? '/api/posts/' + detail._id : '/api/posts'
    const response = await fetch(url, {
      method: detail?._id ? 'PATCH' : 'POST',
      body: JSON.stringify(bodyData)
    })
    if (response.ok) {
      notifications.show({
        title: "🎉 🎉 🎉 恭喜 🎉 🎉 🎉",
        message: `数据保存成功！`
      })
      if (!detail?._id) {
        form.reset()
        form.setFieldValue('type', bodyData.type)
      }
    } else {
      notifications.show({
        title: "😒 😒 😒 出错了 😒 😒 😒",
        message: `数据保存失败！`
      })
    }
    setSubmitting(false)
  }
  const updateCover = (path: string) => {
    console.log(path)
    form.setFieldValue('cover', path)

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
          {form.values.type === 'account' && <TextInput
            label="内容"
            placeholder="请输入内容"
            value={form.values.content}
            onChange={(event) => form.setFieldValue('content', event.currentTarget.value)}
            radius="md"
          />}
          {'md,note'.includes(form.values.type) && <Textarea
            label="内容"
            placeholder="请输入内容"
            autosize
            minRows={10}
            maxRows={20}
            value={form.values.content}
            onChange={(event) => form.setFieldValue('content', event.currentTarget.value)}
            radius="md"
          />}
          <Switch
            checked={hasCover}
            onClick={() => setHasCover(!hasCover)}
            defaultChecked
            color="green"
            labelPosition='left'
            label="封面图片"
          />
          {hasCover &&
            <Group>
              <UploadFile
                title=''
                third
                types={[MIME_TYPES.png, MIME_TYPES.jpeg, MIME_TYPES.gif]}
                message='选择图片'
                onFileChanged={updateCover} />
              {form.values.cover && <Image mah={'9rem'} maw={'18rem'} radius={5} src={imgHost + form.values.cover} />}
            </Group>}

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
          <TagsInput
            mt={'sm'}
            label="标签"
            description="文件标签，可以输入多个,回车确认"
            placeholder="请输入标签"
            onChange={(value) => form.setFieldValue('tag', value.join(','))}
            value={form.values.tag? form.values.tag.split(',') : []}
            data={Array.from(constants.postTags)}
          />
        </Stack>

        <Group justify="flex-end" mt="xl">

          <Button type="submit" radius="xl" loading={submitting}>
            {detail?._id ? '更新' : '提交'}
          </Button>
        </Group>
      </form>
      <PinDialog
        opened={opened}
        error={errorPin}
        onPinChange={() => setErrorPin(false)}
        onComplete={onPinComplete}
        onClose={onDialogClose} />
    </Paper>

  )
}

export default SimplePostForm
