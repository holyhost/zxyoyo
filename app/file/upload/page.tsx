"use client"
import React from 'react'
import { useRef } from 'react';
import { Text, Group, Button, rem, useMantineTheme, Container } from '@mantine/core';
import { Dropzone, FileWithPath, MIME_TYPES } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons-react';
import classes from './uploadFile.module.css';

const UploadFile = () => {
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);
  const uploadFile = async (e: FileWithPath[]) =>{
    if(e.length < 1) return
    try{
      const data = new FormData()
      data.set('file', e[0])
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      })
      if(!res.ok) throw new Error(await res.text())
    }catch(e: any){
      console.log(e)
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
            <Dropzone.Accept>Drop files here</Dropzone.Accept>
            <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
            <Dropzone.Idle>Upload resume</Dropzone.Idle>
          </Text>
          <Text ta="center" fz="sm" mt="xs" c="dimmed">
            Drag&apos;n&apos;drop files here to upload. We can accept only <i>.pdf</i> files that
            are less than 30mb in size.
          </Text>
        </div>
      </Dropzone>

      <Button className={classes.control} size="md" radius="xl" onClick={() => openRef.current?.()}>
        Select files
      </Button>
    </Container>
  )
}

export default UploadFile
