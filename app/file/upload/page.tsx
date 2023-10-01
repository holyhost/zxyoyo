"use client"
import React, { useState } from 'react'
import { Stack } from '@mantine/core';
import { AppLayout } from '@/components/layout/AppLayout';
import UploadFile from '@/components/FileUpload/UploadFile';
import FileList from '@/components/FileUpload/FileList';
import { notifications } from '@mantine/notifications';

const UploadPage = () => {
  const [files, setFiles] =  useState<string[]>([])
  const deleteFile =async ( file:string) => {
    const res = await fetch('/api/file/delete?id=' + file)
    if(res.ok){
      notifications.show({
        title: "删除成功",
        message: `${file} 已删除！`
      })
      setFiles(files.filter(name=> name !== file))
    }else{
      notifications.show({
        title: "删除失败",
        message: `校验失败，文件未删除！`
      })
    }
  }

  return (
    <AppLayout>
      <Stack>
        <UploadFile onFileChanged={(file: string)=> setFiles([...files, file])}/>
        {files.length>0 && <FileList fileList={files} deleteFile={(file: string)=>deleteFile(file)} />}
      </Stack>
    </AppLayout>

  )
}

export default UploadPage
