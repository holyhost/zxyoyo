"use client"
import React, { useEffect, useRef } from 'react'
import { ClientConnectStatus } from './Computer'
import { Avatar, Button, Group } from '@mantine/core'
import { IconActivity, IconCheck, IconFishHook, IconPageBreak, IconRefresh, IconX } from '@tabler/icons-react'


const Connection = React.memo(({ connect, disconnect, connectOptions, connectStatus, toggleEditor }: any) => {

    const conButton = useRef<HTMLButtonElement>(null)
    const handleConnect = () => {
        console.log(".connection ... handleConnect")
        const { protocol, host, clientId, port, username, password } = connectOptions
        const url = `${protocol}://${host}:${port}/mqtt`
        const options = {
            clientId,
            username,
            password,
            clean: true,
            reconnectPeriod: 1000, // ms
            connectTimeout: 30 * 1000, // ms
        }
        connect(url, options)
    }

    const handleDisconnect = () => {
        console.log("click 断开连接")
        disconnect()
    }

    useEffect(() => {
        handleConnect()
    }, [])

    const openConfig = () => toggleEditor()
    console.log("Connectionnnn...render")
    return (
        <Group mt={'md'}>
            <Button  leftSection={<IconRefresh size={14} />} onClick={handleConnect}>
                重新连接
            </Button>
            <Button leftSection={<IconPageBreak size={14} />} onClick={handleDisconnect}>
                断开连接
            </Button>
            <Avatar onClick={openConfig} color={connectStatus === ClientConnectStatus.Connected ? 'teal' : connectStatus === ClientConnectStatus.Connecting ? 'orange' : 'gray'}>
                {connectStatus === ClientConnectStatus.Connected ? <IconCheck/> : connectStatus === ClientConnectStatus.Connecting ? <IconActivity/> : <IconX/>}
            </Avatar>
        </Group>
    )
})

export default Connection
