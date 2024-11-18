import React from 'react'
import classes from './ShareMenu.module.css'
import { Anchor, Container, Group } from '@mantine/core'
const ShareMenu = () => {
    const items = [
        {
            title: 'Future',
            url: 'stock',
            cname: classes.itemContainer,
            id: 'share-future'
        },
        {
            title: '测试记录',
            url: 'test',
            cname: classes.itemContainer,
            id: 'share-test'
        },
        {
            title: '区间统计',
            url: 'a',
            cname: classes.itemContainer + ' ' + classes.gradientB2R,
            id: 'share-duration'
        }
    ]
  return (
    <Group justify='center'>
      {items.map(item => (<div key={item.id} className={item.cname}>
        <Anchor c={'white'} href={'/share/' + item.url}>
            {item.title}
        </Anchor>
       
      </div>))}
    </Group>
  )
}

export default ShareMenu
