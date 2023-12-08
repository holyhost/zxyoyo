"use client"
import React, { useEffect, useState } from 'react'

export default function Receiver({payload}:any) {
    const [messages, setMessages] = useState<any[]>([])

    useEffect(() => {
        if (payload && payload.topic) {
            setMessages((messages:any[]) => [{...payload, rtime: new Date().toLocaleTimeString()},...messages.slice(0,5)])
        }
    }, [payload])

    return (
        <div>
            {messages.map((item,index)=>(<p key={index}>
                接收时间={item.rtime} ,title={item.topic}, description={item.message}
            </p>))}
        </div>
    )
}
