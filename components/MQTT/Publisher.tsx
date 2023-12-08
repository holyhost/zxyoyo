"use client"
import { Button, CloseButton, Group, Input } from '@mantine/core';
import { Icon123, IconHexagon, IconHexagons, IconSend } from '@tabler/icons-react';
import React, { useRef, useState } from 'react'
import { PayloadType } from './Computer';


type Props = {
    pub: (payload: PayloadType)=> void
}

const Publisher = ({ pub }: Props) => {
    const [topic, setTopic] = useState('');
    const [value, setValue] = useState('');

    const defaultRecord = {
        topic: 'testtopic/react',
        qos: 0,//set default qos value
    }

    const sendMessage = () => {
        console.log('...send for ' + topic, value)
        pub({
            topic,
            message: value,
            qos: 0
        })
    }

    return (
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
                        onClick={()=> setTopic('')}/>
                }
                />
            <Input
                placeholder="Enter Value"
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
                leftSection={<IconSend size={16} />}
                rightSectionPointerEvents="all"
                rightSection={
                    <Button
                        style={{ display: value ? undefined : 'none' }}
                        onClick={sendMessage}>
                        发送
                    </Button>
                }
            />

        </Group>
    )
}

export default Publisher
