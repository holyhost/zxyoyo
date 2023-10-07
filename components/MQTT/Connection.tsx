import React, { useEffect, useRef } from 'react'
import { ClientConnectStatus } from './Computer'


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

    useEffect(()=>{
        //init
        // console.log('init connect once')
        // handleConnect()
    },[])

    const openConfig = ()=>toggleEditor()
    console.log("Connectionnnn...render")
    return (
        <header className={connectStatus === ClientConnectStatus.Connected ? 'color-g' : connectStatus === ClientConnectStatus.Connecting ? 'color-gray' : 'color-blue'}>
        
            <div className='header-container'>
                <button onClick={handleConnect} ref={conButton}>
                    连接服务器
                </button>
                -
                <button onClick={handleDisconnect}>
                    断开连接
                </button>
                <div onClick={openConfig}>
                    连接状态：{connectStatus}
                </div>
            </div>
        </header>
    )
})

export default Connection
