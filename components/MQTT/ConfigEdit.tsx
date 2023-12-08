"use client"
import React, { useEffect, useRef } from 'react'


const ConfigEdit = () => {
    const ConfigKey = 'react-App-_iot-common-C0nfig'
    const eleConfig = useRef<any>()
    useEffect(()=>{
        const baseinfo = localStorage.getItem(ConfigKey)
        if(baseinfo) eleConfig.current.value = baseinfo
    },[])
    const onSave = ()=>{
        const {value} = eleConfig.current
        if(value) localStorage.setItem(ConfigKey,value)
    }
    const properties = {
        rows : 5,
    }
    console.log("Config edit...render")
  return (
    <div className='config'>
        <p>输入配置信息 <button onClick={onSave}>保存</button></p>
        <textarea {...properties} ref={eleConfig}></textarea>
    </div>
    
  )
}

export default ConfigEdit