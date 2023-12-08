"use client"
import React, { useContext, useEffect, useState } from 'react'
import { Payloads, PayloadType } from './Computer'


const topic = 'temp_status'

export default function Temperature() {
  const payload = useContext<PayloadType>(Payloads)
  const [tempData,setTempData] = useState<string[]>([])
  useEffect(()=>{
    if(payload && payload.topic === topic){
        let msg:string = payload.message
        let arr = msg.split(',')
        if(arr && arr.length>1 ){
            setTempData(arr)
        }
    }
  },[payload])
  const layout = (
    <div className='temp'>
        当前温度：{tempData[0]}
    <br/>
        当前湿度：{tempData[1]}
    <br/>
    <a href="http://zxyoyo.com/skx/iot1.php">温湿度详情</a>
    </div>
  )
  if(tempData.length>1){
    return layout
  }else{
    return null
  }

}
