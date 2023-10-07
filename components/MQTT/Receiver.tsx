import React, { useEffect, useState } from 'react'

export default function Receiver({payload}:any) {
    const [messages, setMessages] = useState<any[]>([])

    useEffect(() => {
        if (payload && payload.topic) {
            setMessages((messages:any[]) => [payload,...messages.slice(0,5)])
        }
    }, [payload])

    return (
        <div>
            {messages.map((item,index)=>(<p key={index}>
                title={item.topic}, description={item.message}
            </p>))}
        </div>
    )
}
