"use client"
import React, { useState } from 'react'
import { useRef } from 'react';
import { Text, Group, Button, rem, useMantineTheme, Container } from '@mantine/core';
import { Dropzone, FileWithPath, MIME_TYPES } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons-react';
import classes from './uploadFile.module.css';
import { notifications } from '@mantine/notifications';


type Props = {
  onFileChanged: Function,

}


const UploadFile = ({onFileChanged}: Props) => {
  const theme = useMantineTheme();
  const [uploading, setUploading] = useState(false)
  const openRef = useRef<() => void>(null);
  const uploadFile = async (e: FileWithPath[]) => {
    if (e.length < 1) return
    try {
      setUploading(true)
      const data = new FormData()
      console.log(e)
      data.set('file', e[0])
      const res = await fetch('/api/file', {
        method: 'POST',
        body: data
      })
      const jsonData = await res.json()
      if (res.ok) {
        console.log(jsonData)
        notifications.show({
          title: '上传文件成功',
          message: 'file path is:' + jsonData.data,
        })
        onFileChanged(jsonData.data)
      } else {
        notifications.show({
          title: '上传文件失败',
          message: 'error:' + jsonData.data,
        })
      }
      setUploading(false)
    } catch (e: any) {
      notifications.show({
        title: '上传文件失败',
        message: 'Server Error',
      })
      setUploading(false)
    }
  }
  return (
      <Container className={classes.wrapper}>
        <Dropzone
          openRef={openRef}
          onDrop={(e) => uploadFile(e)}
          className={classes.dropzone}
          radius="md"
          accept={[
            MIME_TYPES.pdf,
            MIME_TYPES.png,
            MIME_TYPES.jpeg,
            MIME_TYPES.gif,
            MIME_TYPES.xlsx,
            MIME_TYPES.doc,
            MIME_TYPES.zip]}
          maxSize={30 * 1024 ** 2}
        >
          <div style={{ pointerEvents: 'none' }}>
            <Group justify="center">
              <Dropzone.Accept>
                <IconDownload
                  style={{ width: rem(50), height: rem(50) }}
                  color={theme.colors.blue[6]}
                  stroke={1.5}
                />
              </Dropzone.Accept>
              <Dropzone.Reject>
                <IconX
                  style={{ width: rem(50), height: rem(50) }}
                  color={theme.colors.red[6]}
                  stroke={1.5}
                />
              </Dropzone.Reject>
              <Dropzone.Idle>
                <IconCloudUpload style={{ width: rem(50), height: rem(50) }} stroke={1.5} />
              </Dropzone.Idle>
            </Group>

            <Text ta="center" fw={700} fz="lg" mt="xl">
              <Dropzone.Accept>拖拽文件到这</Dropzone.Accept>
              <Dropzone.Reject>文件大小小于30mb</Dropzone.Reject>
              <Dropzone.Idle>Upload resume</Dropzone.Idle>
            </Text>
            <Text ta="center" fz="sm" mt="xs" c="dimmed">
              Drag&apos;n&apos;drop files here to upload.
              <br/>
              We can accept only <i>image, file, .zip, .xlsx,doc, .pdf</i> files that
              are less than 30mb in size.
            </Text>
          </div>
        </Dropzone>

        <Button loading={uploading} className={classes.control} size="md" radius="xl" onClick={() => openRef.current?.()}>
          选择文件
        </Button>
      </Container>
  )
}

export default UploadFile
