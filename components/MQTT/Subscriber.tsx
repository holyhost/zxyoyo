import React, { useRef, useState } from 'react'

export default function Subscriber({ sub, unSub }: any) {
  const ele = useRef<HTMLInputElement>(null)

  const defaultRecord = {
    topic: 'testtopic/react',
    qos: 0,//set default qos value
  }
  const [record,setRecord] = useState(defaultRecord)

  const onFinish = () => {
    let val = ele?.current?.value
    if (val) record.topic = ele!.current!.value
    setRecord({...record})
    sub(record)
  }

  const handleUnsub = () => {
    // const values = form.getFieldsValue()
    unSub(record)
  }
  console.log(" Subscriber render...")
  return (
    <div>
      <input ref={ele} type="text" placeholder='enter the topic' />
      <button onClick={onFinish}>Sub</button>
      <button onClick={handleUnsub}>unSub</button>
    </div>
  )
}
