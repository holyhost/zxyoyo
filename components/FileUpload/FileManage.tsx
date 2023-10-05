"use client"
import { notifications } from '@mantine/notifications'
import React, { useState } from 'react'
import FileCard from './FileCard'
import { Group } from '@mantine/core'

const FileManage = ({data}:{data: any}) => {
    const [files, setFiles] =  useState<string[]>([...data])
    const deleteFile = async (file: string) => {
        const res = await fetch('/api/file/delete?id=' + file)
        if (res.ok) {
            notifications.show({
                title: "删除成功",
                message: `${file} 已删除！`
            })
            setFiles(files.filter((item: any) => item.name !== file))
        } else {
            notifications.show({
                title: "删除失败",
                message: `校验失败，文件未删除！`
            })
        }
    }
  return (
    <Group justify='center'>
    {files && files.map((item: any) => <FileCard key={item._id} data={...item} onDelete={(id: string)=> deleteFile(id)}/>)}
    </Group>
  )
}

export default FileManage
