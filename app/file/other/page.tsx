"use client"
import React, { useEffect, useState } from 'react'
import { Container, Stack } from '@mantine/core';
import { AppLayout } from '@/components/layout/AppLayout';
import { notifications } from '@mantine/notifications';
import OtherImageCard from '@/components/MyImage/OtherImageCard';
import { Masonry } from 'masonic';
import { useCurrentUser } from '@/store/user.store';

const OtherPage = () => {
  const [files, setFiles] =  useState<any[]>([])
  useCurrentUser()
  useEffect(()=>{
    const getData =  async()=>{
      const res = await fetch('/api/file/other')
      const j = await res.json()
      console.log(j)
      if(j.success) setFiles(j.data)
    }
    getData()
  },[])
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
      <Container>
      {files.length>0 && <Masonry items={files} 
                          render={OtherImageCard} 
                          columnGutter={28} 
                          itemKey={item => item.id}/>}
      </Container>
    </AppLayout>

  )
}

export default OtherPage
