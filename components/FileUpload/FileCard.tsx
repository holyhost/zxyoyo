"use client"
import React from 'react'
import { Card, Image, Text, Badge, Button, Group } from '@mantine/core';
import { getFileTypeName } from '@/utils/string-helpers';
import { formatDate } from '@/utils/date-helpers';
import { IconTrash } from '@tabler/icons-react';

type Props = {
    data: {
        _id: string,
        type: string,
        name: string,
        orname: string,
        creatTime: string,
        size: number,
        view?: number,
        content?: string,
    },
    onDelete?: Function,
    width?: number

}

const FileCard = ({ data, onDelete, width = 220 }: Props) => {
    const fileType = getFileTypeName(data.type)
    const dateText = formatDate(new Date(parseInt(data.creatTime)))
    
    return (
        <Card shadow="sm" padding="8" radius="md" mt={'md'} withBorder w={width}>
            <Card.Section>
                <Image
                    src={`/static-files/${data.name}`}
                    height={160}
                    alt={`This is a ${data.type} file`}
                />
            </Card.Section>

            <Group justify="space-between" mt="5" mb="0">
                <Text truncate="end" size='sm' fw={500}>{data.name}</Text>
            </Group>

            {data.content && <Text size="sm" c="dimmed">
                {data.content}
            </Text>}

            <Group justify="space-between">
                <Badge color="pink" variant="light">
                    {fileType}
                </Badge>
                <IconTrash size={'16'} onClick={()=> onDelete && onDelete(data.name)} />
                <Text size="sm" c="dimmed" >
                    {dateText}
                </Text>
            </Group>


            {/* <Button variant="light" color="blue" fullWidth mt="md" radius="md">
                Book classic tour now
            </Button> */}
        </Card>
    )
}

export default FileCard
