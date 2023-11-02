"use client"
import React, { useEffect, useState } from 'react'
import { Center, Container, Loader, Flex, Stack } from '@mantine/core';
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
  const backendHost = process.env.NEXT_PUBLIC_BACKEND_HOST
  const imgHost = backendHost + "/app"
  const curUser = useCurrentUser()
  const { ref, inView } = useInView();
  console.log(inView)

  const deleteImage = async(data: any,onlysucai?: boolean, onlyfile?:boolean)=>{
    const fd = new FormData()
    fd.set('keynames', curUser?.keynames ?? '')
    fd.set('ids', data.id + '')
    if(onlysucai){
      fd.set('sucai', 'onlysucai')
    }
    if(onlyfile){
      fd.set('file', 'onlyfile')
    }
    const result = await fetch(backendHost + "/filemng/api/file/delete",{
      method: 'POST',
      body: fd
    })
    const dd = await result.json()
    console.log(dd)
    if(dd.status === 'ok'){
      if(onlysucai){
        const file = files.find(item => item.id === data.id)
        if(file) {
          file.mark = ''
          setFiles([...files])
        }
      }else{
        const newFiles = files.filter(item => item.id !== data.id)
        setFiles([...newFiles])
      }
      
    }
  }
  
  const uploadSucai = async (id: number) => {
    console.log('click upload sucai')
    const fd = new FormData()
    fd.set('keynames', curUser?.keynames ?? '')
    fd.set('id', id + '')
    const result = await fetch("/api/file/other",{
      method: 'POST',
      body: fd
    })
    const dd = await result.json()
    if(dd.success) {
      const file = files.find(item => item.id === id)
      if(file) {
        file.mark = dd.data
        setFiles([...files])
      }
    }
  }
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      const res = await fetch('/api/file/other?page=' + pageIndex)
      const j = await res.json()
      if (j.success) {
        const tempArr = j.data.map((item: any) => ({...item, 'spath': imgHost + item.spath, 'bpath': imgHost + item.bpath}))
        setFiles([...files, ...tempArr])
        setPageIndex(pageIndex + 1)
        if (j.data.length < 20) setEnd(true)
      }
      setIsLoading(false)
    }
    if (inView && !isLoading && !end) getData()
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

        {files.length > 0 && <Flex gap="md"
          justify="center"
          align="center"
          direction="row"
          wrap="wrap">
          {files.map(item => <OtherImageCard 
                          key={item.id} 
                          data={item}
                          upload={uploadSucai} 
                          onDelete={deleteImage} />)}
        </Flex>}
        {/* {files.length > 0 && <Masonry items={files}
          render={OtherImageCard}
          columnGutter={28}
          itemKey={item => item.id} />} */}
        <Center ref={ref} mt="md">
          {!end && inView && <Loader />}
        </Center>
        {end && <EndOfFeed />}
    </AppLayout>

  )
}

export default OtherPage
