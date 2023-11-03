"use client"
import React, { useEffect } from 'react'
import { useForm } from '@mantine/form';
import { Modal, PinInput, Group, Text, Center, Button, TagsInput, TextInput } from '@mantine/core';
import { OtherImageBean } from '@/bean/OtherImageBean';
import { constants } from '@/utils/constants/data.enum';

type Props = {
    info: OtherImageBean,
    opened: boolean,
    error?: boolean,
    onClose?: () => void,
    onPinChange?: (value: string) => void,
    onComplete?: (s: string) => void
    onUpdate?: (v: OtherImageBean) => void
}

const FileInfoDialog = ({ opened, onClose, info, onUpdate }: Props) => {
    const close = () => {
        onClose && onClose()
    }

    const initTag = info && info.tag ? info.tag.split(',') : []
    const form = useForm({
        initialValues: {
            ...info,
            tag: initTag
        },
    })

    useEffect(() => form.setValues({ ...info, tag: initTag }), [info])
    if (!info) return <></>
    return (
        <>
            <Modal opened={opened} onClose={close} title="更新文件信息" centered>
                <form onSubmit={form.onSubmit((values) => onUpdate&&onUpdate({...values, tag: values.tag.join(',')}))}>
                    <Group>
                        <TextInput
                            label="创建人"
                            disabled
                            value={form.values.userid  ?? ''}
                        />
                        <TextInput
                            label="文件ID"
                            disabled
                            maw={'5rem'}
                            value={form.values.id  ?? ''}
                            onChange={(e)=> form.setFieldValue('id', parseInt(e.currentTarget.value))}
                        />
                    </Group>
                    <TextInput
                        mt={'xs'}
                        label="压缩图路径"
                        value={form.values.spath ?? ''}
                        onChange={(e)=> form.setFieldValue('spath', e.currentTarget.value)}
                    />
                    <TextInput
                        mt={'xs'}
                        label="原图路径"
                        value={form.values.bpath ?? ''}
                        onChange={(e)=> form.setFieldValue('bpath', e.currentTarget.value)}
                    />
                    <Group mt={'xs'}>
                        <TextInput
                            label="系列ID"
                            maw={'5rem'}
                            value={form.values.groupid ?? ''}
                            onChange={(e)=> form.setFieldValue('groupid', e.currentTarget.value)}
                        />
                        <TextInput
                            label="系列图名称"
                            maw={'10rem'}
                            value={form.values.groupname ?? ''}
                            onChange={(e)=> form.setFieldValue('groupname', e.currentTarget.value)}
                        />
                        <TextInput
                            label="类型"
                            maw={'6rem'}
                            placeholder="输入类型"
                            value={form.values.type ?? ''}
                            onChange={(e)=> form.setFieldValue('type', e.currentTarget.value)}
                        />
                    </Group>

                    <TagsInput
                        mt={'xs'}
                        label="标签"
                        description="文件标签，可以输入多个,回车确认"
                        placeholder="请输入标签"
                        onChange={(value) => form.setFieldValue('tag', value)}
                        value={form.values.tag}
                        data={Array.from(constants.imageTags)}
                    />
                    <TextInput
                        mt={'xs'}
                        label="备注信息"
                        value={form.values.mark ?? ''}
                        onChange={(e)=> form.setFieldValue('mark', e.currentTarget.value)}
                    />
                    <Group mt={'md'} justify="flex-end"><Button type="submit">提交更新</Button></Group>
                </form>
            </Modal>
        </>
    )
}

export default FileInfoDialog
