"use client"
import { ActionIcon, Container, Group, Paper, Pill, Text } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import Markdown from 'react-markdown'
import PostHeader from './PostHeader'
import 'github-markdown-css'
import { useCurrentUser, useUserStore } from '@/store/user.store'
import PinDialog from '@/components/Dialog/PinDialog';
import { mymd5, toAesSource } from '@/utils/crypto-helper'
import { useSession } from 'next-auth/react'
import { PostItemProps } from './PostItem'
import { formatDate } from '@/utils/date-helpers'
import { IconTransfer } from '@tabler/icons-react'
import { useIsMobile } from '@/hooks/useIsMobile'
import { API } from '@/utils/api'
import { ResType } from '@/types/base.type'

type Props = {
    detail: PostItemProps,
    author: any
}

const PostDetail = ({ detail, author }: Props) => {
    // const user = useCurrentUser()
    const { data: session } = useSession()
    const mobile = useIsMobile()
    const userStore = useUserStore()
    const [opened, setOpened] = useState(false)
    const [errorPin, setErrorPin] = useState(false)
    const [pin, setPin] = useState(userStore.pin)
    const [content, setContent] = useState('')
    const parseContent = (pinstr: string) => {
        const cont = JSON.parse(toAesSource(detail.content, pinstr)).content
        setContent(cont)
    }
    const onDialogClose = () => {
        setOpened(false)

    }
    const updatePostContent = async()=> {
        if(session && session.user && session.user._id === detail.uid && detail && detail.open !==1 && detail.content.startsWith('******')){
            const res:ResType<PostItemProps> = await (await fetch(API('/posts/' + detail._id))).json()
            res.success && (detail.content = res.data.content)
        }
        
        if (detail.secret && detail.content.length > 10) {
            setContent(detail.content.slice(0, 10) + "...")
        } else {
            setContent(detail.content)
        }
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
    useEffect(() => {
        updatePostContent()
        if (session && session.user && !pin && detail.secret) setOpened(true)
        if (pin && detail.secret) parseContent(pin)
        if (session && session.user && !userStore.detail) userStore.fetch('/api/user')
    }, [session])
    return (
        <Container mt={'md'} pl={0} pt={0}>
            <PostHeader name={author.name} image={author.image} />
            {detail.type !== 'md' &&
                <Paper shadow='md' p={'md'}>
                    <Text>
                        {content}
                    </Text>
                    <Group justify='end' mt={'md'}>
                        {detail.secret && <ActionIcon size={'sm'} onClick={() => setOpened(true)}><IconTransfer /></ActionIcon>}
                        <Text fz={'sm'} c={'gray'}>🖌️创建于： {formatDate(new Date(parseInt(detail.createTime)))}</Text>

                    </Group>
                </Paper>
            }
            {detail.type === 'md' && <Markdown
                className={'markdown-body'}
            >
                {content}
            </Markdown>}
            {detail.type === 'md' &&
                <Group justify='end' mr={mobile ? 'sm' : 'xl'}>
                    <Text fz={'sm'} c={'gray'}>🖌️创建于： {formatDate(new Date(parseInt(detail.createTime)))}</Text>
                </Group>}
            {detail.tag && <Group mr={mobile ? 'sm' : 'xl'} gap={'xs'} justify='flex-end'>
                {detail.tag.split(',').map(tag => <Pill c={'teal'} key={tag}>{tag}</Pill>)}
            </Group>}
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
