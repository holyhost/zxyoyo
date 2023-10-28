import { Group, Avatar , Text } from '@mantine/core'
import React from 'react'

type Props = {
    name: string,
    image?: string
}

const PostHeader = ({name, image='/icon.png'}: Props) => {
  return (
    <Group>
        <Avatar  src={image} alt={name}/>
        <Text>{name}</Text>
    </Group>
  )
}

export default PostHeader
