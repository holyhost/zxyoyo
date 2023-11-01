"use client"
import React, { useEffect, useState } from 'react'
import { Center, Container, Loader, Stack } from '@mantine/core';
import { AppLayout } from '@/components/layout/AppLayout';
import { notifications } from '@mantine/notifications';
import OtherImageCard from '@/components/MyImage/OtherImageCard';
import { Masonry } from 'masonic';
import { useCurrentUser } from '@/store/user.store';
import { useInView } from 'react-intersection-observer';
import { EndOfFeed } from '@/components/EndOfFeed/EndOfFeed';

const OtherPage = () => {
  const [files, setFiles] = useState<any[]>([])
  const [pageIndex, setPageIndex] = useState<number>(0)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [end, setEnd] = useState<boolean>(false)
  useCurrentUser()
  const { ref, inView } = useInView();
  console.log(inView)
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      const res = await fetch('/api/file/other?page='+pageIndex)
      const j = await res.json()
      if (j.success) {
        setFiles([...files,...j.data])
        setPageIndex(pageIndex + 1)
        if(j.data.length < 20) setEnd(true)
      }
      setIsLoading(false)
    }
    if(inView && !isLoading && !end) getData()
  }, [inView, isLoading])
  const deleteFile = async (file: string) => {
    const res = await fetch('/api/file/delete?id=' + file)
    if (res.ok) {
      notifications.show({
        title: "删除成功",
        message: `${file} 已删除！`
      })
      setFiles(files.filter(name => name !== file))
    } else {
      notifications.show({
        title: "删除失败",
        message: `校验失败，文件未删除！`
      })
    }
  }

  return (
    <AppLayout>
      <Container>
        {files.length > 0 && <Masonry items={files}
          render={OtherImageCard}
          columnGutter={28}
          itemKey={item => item.id} />}
        <Center ref={ref} mt="md">
          {!end && inView && <Loader />}
        </Center>
        {end && <EndOfFeed/>}
      </Container>
    </AppLayout>

  )
}

export default OtherPage
