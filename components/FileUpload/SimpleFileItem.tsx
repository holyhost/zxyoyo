import { useClipboard } from '@mantine/hooks';
import React, { useState } from 'react'
import { ActionIcon, Group, CopyButton, Text, Box } from '@mantine/core'
import { IconCopy, IconTrash } from '@tabler/icons-react';

type Props = {
    file: string,
    delete: Function
}

const SimpleFileItem = ({ file }: Props) => {
    const onDeleteClick = () => {

    }
    return (
        <Group justify="center">
            <Box component="a" href={'/static-files/' + file}>
                <Text
                    variant="gradient"
                    gradient={{ from: 'indigo', to: 'cyan', deg: 90 }}>
                    {file}
                </Text>
            </Box>

            <CopyButton value={file}>
                {({ copied, copy }) => (
                    <ActionIcon color={copied ? 'teal' : 'blue'} onClick={copy}>
                        <IconCopy />
                    </ActionIcon>
                )}
            </CopyButton>
            <ActionIcon color={'teal'} onClick={onDeleteClick}>
                <IconTrash />
            </ActionIcon>
        </Group>
    )
}

export default SimpleFileItem
