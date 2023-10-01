"use client"
import React, { useState } from 'react'
import { Stack } from '@mantine/core';
import { AppLayout } from '@/components/layout/AppLayout';
import UploadFile from '@/components/FileUpload/UploadFile';
import FileList from '@/components/FileUpload/FileList';

const UploadPage = () => {
  const [files, setFiles] =  useState<string[]>([])

  return (
    <AppLayout>
      <Stack>
        <UploadFile onFileChanged={(file: string)=> setFiles([...files, file])}/>
        <FileList fileList={files} />
      </Stack>
    </AppLayout>

  )
}

export default UploadPage
