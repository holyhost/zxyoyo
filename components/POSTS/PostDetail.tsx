"use client"
import { Container, Paper, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import PostHeader from './PostHeader'
import 'github-markdown-css'
import { useCurrentUser, useUserStore } from '@/store/user.store'
import PinDialog from '@/components/Dialog/PinDialog';
import { mymd5, toAesSource } from '@/utils/crypto-helper'
import { useSession } from 'next-auth/react'

type Props = {
    detail: any,
    author: any
}

const PostDetail = ({ detail, author }: Props) => {
    // const user = useCurrentUser()
    const {data: session} = useSession()
    const userStore = useUserStore()
    const [opened, setOpened] = useState(false)
    const [errorPin, setErrorPin] = useState(false)
    const [pin, setPin] = useState(userStore.pin)
    const [content, setContent] = useState(detail.content)
    const parseContent = (pinstr: string)=>{
        const cont = JSON.parse(toAesSource(detail.content, pinstr)).content
        setContent(cont)
    }
    const onDialogClose = () => {
        setOpened(false)

    }
    const onPinComplete = (pinstr: string) => {
        const md5Key = mymd5(pinstr)
        if (userStore.detail && md5Key === userStore.detail.keys) {
            userStore.setpin(pinstr)
            setPin(pinstr)
            onDialogClose()
            parseContent(pinstr)
        } else {
            setErrorPin(true)
        }
    }
    useEffect(()=>{
        if(!pin &&detail.secret) setOpened(true)
        if( pin && detail.secret) parseContent(pin)
        if( session && session.user && !userStore.detail) userStore.fetch('/api/user')
    }, [session])
    return (
        <Container mt={'md'}>
            <PostHeader name={author.name} image={author.image} />
            {detail.type !== 'md' && 
                <Paper shadow='md' p={'md'}>
                    <Text>
                        {content}
                    </Text>
                </Paper>}
            {detail.type ==='md' && <Markdown
                className={'markdown-body'}
            >
                {content}
            </Markdown>}
            <PinDialog
                opened={opened}
                error={errorPin}
                onPinChange={() => setErrorPin(false)}
                onComplete={onPinComplete}
                onClose={onDialogClose} />
        </Container>
    )
}

export default PostDetail
