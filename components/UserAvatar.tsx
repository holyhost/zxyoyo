import React from 'react'
import { Menu, Group, Center, Burger, Container, rem, Text, Anchor, Avatar } from '@mantine/core';
import { IconChevronDown, IconDoorExit, IconInfoCircle } from '@tabler/icons-react';
import Link from 'next/link';

const UserAvatar = ({
  user,
  logout
}: Props) => {
  return (
    <Menu key={'user-avatar-men'} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
            <Menu.Target>
              <a
                href={'/user/'+user.username}
                onClick={(event) => console.log('click')}
              >
                <Center>
                    <Avatar src={user.image} color="cyan" radius="xl">{user.username}</Avatar>
                </Center>
              </a>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Item 
                    leftSection={<IconInfoCircle size={14} />} 
                    key={'user-detail'}>
                      {user.username} 
                </Menu.Item>
                <Menu.Item 
                    leftSection={<IconInfoCircle size={14} />} 
                    key={'user-admin'}>
                      <Link href="/user/admin">管理员</Link>
                </Menu.Item>
                <Menu.Item
                    leftSection={<IconDoorExit size={14} />}  
                    key={'user-sign-out'} 
                    onClick={logout}>
                      退出
                </Menu.Item>
            </Menu.Dropdown>
    </Menu>
  )
}

export default UserAvatar

type Props = {
   user: {
    username: string,
    image: string
   }, 
   logout: ()=> void
}
