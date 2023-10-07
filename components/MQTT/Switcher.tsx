import React, { useContext, useEffect, useState } from 'react'
import { Payloads, PayloadType } from './Computer'
import Temperature from './Temperature'

/**
 * toggle switch UI component
 * @returns UI
 */

 type SwitchType = {

    id: number,
    icon: string,
    clazName: string,
    value: string
}

export default function Switcher({device, pub, doSwitcherSort }: any) {
    const defaultSwitch:SwitchType = {
        id: 1,
        icon: '',
        clazName: 'switch-container',
        value: "断开"
    }
    const [switcher,setSwitch] = useState<SwitchType>(defaultSwitch)
    const [status,setStatus] = useState(0)
    const payload = useContext<PayloadType>(Payloads)
    console.log('payload',payload)
    useEffect(()=>{
        console.log("Switcher --" + device.name + '---' + "effect")
        if(payload && payload.topic === device.topic){
            let msg:string = payload.message
            if(msg === '20'){
                setStatus(1)
                switcher.clazName = "switch-container color-g";
                switcher.value = "开"
                setSwitch({...switcher})

            }else{
                setStatus(0)
            }
        }
      },[payload])
    useEffect(()=>{
        //第二个参数是[]，初始化操作，相当于componentDidMount
        return ()=>{
            //相当于componentWillUnmount,组件即将卸载
        }
    },[])
    const hasOpenValue = (device.openValue && device.openValue.length>0)?true : false
    
    const onSwitch = ()=>{
        if(!device.pubTopic || device.pubTopic.length < 2) return
        if(!status) {
            switcher.clazName = 'switch-container'
            switcher.value = '断开'
            setSwitch({...switcher})
            return
        }
        switcher.clazName = "switch-container color-gray"
        switcher.value = '请稍等'
        setSwitch({...switcher})
        //do open action
        let action = {topic:device.pubTopic,message:device.openValue,qos:1}
        if(hasOpenValue) pub(action)
        // do close action or reset device status
        if(device.closeValue && device.closeValue.length>0){
            setTimeout(() => {
                action.message = device.closeValue
                switcher.clazName = "switch-container color-g";
                switcher.value = "开"
                setSwitch({...switcher})
              }, 3000);
        }
        
    }

    const openDirectly = ()=>{
        let action = {topic:device.pubTopic,message:device.openValue,qos:1}
        pub(action)
    }

    const doSort = ()=> doSwitcherSort()

    const defaultSwitchLayout = (
        <div>
            <h2 onClick={doSort}>{device.name}</h2>
            <div className={status?'switch-status color-g':'switch-status color-r'} onClick={openDirectly}></div>

            <div className={switcher.clazName} onClick={onSwitch}>
                {switcher.value}
            </div>
        </div>
    )
    console.log("Wsitcher..." + device.name)
    return hasOpenValue? defaultSwitchLayout: <Temperature />

}


