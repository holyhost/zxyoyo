import React from 'react'
import { Menu, Center, Avatar } from '@mantine/core';
import { IconInfoCircle } from '@tabler/icons-react';
import AppMenuItems from './layout/MenuItems';

const UserAvatar = ({
  login,
  user,
  theme,
  colorScheme,
  toggleColorScheme
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
                <AppMenuItems login={login ? true : false} theme={theme} colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}/>
            </Menu.Dropdown>
    </Menu>
  )
}

export default UserAvatar

type Props = {
  login: boolean,
   user: {
    username: string,
    image: string
   },
   theme: any,
   colorScheme: string,
  toggleColorScheme: () => void
}
