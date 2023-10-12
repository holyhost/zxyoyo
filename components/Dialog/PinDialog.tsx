import React from 'react'
import { Modal, PinInput, Group, Text, Center } from '@mantine/core';

type Props = {
    opened: boolean,
    error?: boolean,
    onClose?: ()=> void,
    onPinChange?: (value: string)=> void,
    onComplete?: (s: string)=> void
}

const PinDialog = ({opened, onClose, onComplete, onPinChange, error=false}: Props) => {
    const close = ()=>{
        onClose && onClose()
    }
    const submit = ()=>{
    }
    const complete = (pin: string)=>{
        onComplete && onComplete(pin)
    }
    return (
        <>
            <Modal size={'sm'} opened={opened} onClose={close} title="请输入PIN码">
                {/* Modal content */}
                <Center>
                    <PinInput  inputMode="numeric" mask={true}  onComplete={complete} onChange={onPinChange}/>
                </Center>
                <Text mt={'md'} ta={'right'} mr={'lg'} c="gray" fs={'12px'}>网站存储加密后PIN码</Text>
                {error && <Text mt={'md'} ta={'right'} mr={'lg'} c="red" fs={'14px'}>PIN校验失败！</Text>}
                <Group>
                </Group>
            </Modal>
        </>
    )
}

export default PinDialog
