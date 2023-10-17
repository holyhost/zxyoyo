import { Container } from '@mantine/core'
import React from 'react'
import PostItem, { PostItemProps } from './PostItem'



const PostList = ({data}:{data: PostItemProps[]}) => {
  return (
    <>
        {data && data.map(item => <PostItem key={item._id} data={item}/>)}
    </>
  )
}

export default PostList
