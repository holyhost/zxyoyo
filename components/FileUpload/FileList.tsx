import { Box, Container, Divider } from '@mantine/core'
import React from 'react'
import { IconHistory } from '@tabler/icons-react';
import SimpleFileItem from './SimpleFileItem';

const FileList = ({fileList}: {fileList: string[]}) => {

  const deleteFile =async ( file:string) => {
    
  }

  return (
    <Container mt={'md'}>
        <Divider
        my="xs"
        variant="dashed"
        labelPosition="center"
        label={
          <>
            <IconHistory size={12} />
            <Box ml={5}>文件上传列表</Box>
          </>
        }
      />
        {fileList.map(file=> <SimpleFileItem key={file} file={file} delete={deleteFile} />)}
    </Container>
  )
}

export default FileList
