"use client"
import { Group, Input, CloseButton, Button } from '@mantine/core'
import { IconHandFinger, IconHandFingerOff, IconHexagons, IconOctagon, IconSend, IconSubscript } from '@tabler/icons-react'
import React, { useRef, useState } from 'react'

export default function Subscriber({ sub, unSub }: any) {
  const ele = useRef<HTMLInputElement>(null)
  const [topic, setTopic] = useState('');
  const defaultRecord = {
    topic: 'testtopic/react',
    qos: 0,//set default qos value
  }
  const [record, setRecord] = useState(defaultRecord)

  const onFinish = () => {
    let val = ele?.current?.value
    if (val) record.topic = ele!.current!.value
    setRecord({ ...record })
    sub(record)
  }

  const handleUnsub = () => {
    // const values = form.getFieldsValue()
    unSub(record)
  }
  console.log(" Subscriber render...")
  return (
    <div>
      <Group mt={'xs'}>
        <Input
          placeholder="Enter Topic"
          maw={'10rem'}
          value={topic}
          onChange={(event) => setTopic(event.currentTarget.value)}
          leftSection={<IconHexagons size={16} />}
          rightSectionPointerEvents="all"
          rightSection={
            <CloseButton
              style={{ display: topic ? undefined : 'none' }}
              onClick={() => setTopic('')} />
          }
        />
        <Button
          onClick={onFinish}
          leftSection={
            <IconHandFinger size={14} />
          }>订阅</Button>
        <Button
          onClick={handleUnsub}
          leftSection={
            <IconHandFingerOff size={14} />
          }>解除订阅</Button>

      </Group>
    </div>
  )
}
