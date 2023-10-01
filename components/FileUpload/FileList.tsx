import { Container, Text } from '@mantine/core'
import React from 'react'
import { useClipboard } from '@mantine/hooks';

const FileList = ({fileList}: {fileList: string[]}) => {
    const clipboard = useClipboard({ timeout: 500 });
  return (
    <Container mt={'md'}>
        {fileList.map(file=> <Text 
                                key={file}
                                onClick={()=> clipboard.copy(file)}
                                variant="gradient"
                                gradient={{ from: clipboard.copied ?'indigo' : 'gray', to: 'cyan', deg: 90 }}>
                                {file}
                              </Text>)}
    </Container>
  )
}

export default FileList
