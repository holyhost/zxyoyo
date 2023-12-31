import { Box, Container, Divider } from '@mantine/core'
import React from 'react'
import { IconHistory } from '@tabler/icons-react';
import SimpleFileItem from './SimpleFileItem';

const FileList = ({fileList, deleteFile}: {fileList: string[], deleteFile: Function}) => {

  const onFileDelete = ( file:string) => {
    deleteFile(file)
  }

  return (
    <Container mt={'md'} style={{overflow: 'hidden'}}>
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
        {fileList.map(file=> <SimpleFileItem key={file} file={file} onDelete={()=>onFileDelete(file)} />)}
    </Container>
  )
}

export default FileList
