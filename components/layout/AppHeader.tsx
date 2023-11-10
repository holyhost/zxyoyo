"use client"
import React from 'react'
import { Menu, Group, Center, Burger, Container, rem, Text, Anchor, Button } from '@mantine/core';
import { useDisclosure, useLocalStorage } from '@mantine/hooks';
import { IconBrandX, IconChevronDown } from '@tabler/icons-react';
import { useSession, signIn, signOut } from "next-auth/react"
import UserAvatar from '../UserAvatar';
import classes from './HeaderMenu.module.css';
// import { MantineLogo } from '@mantine/ds';
const links = [
  { link: '/posts', label: 'Post' },
  // {
  //   link: '#1',
  //   label: 'Learn',
  //   links: [
  //     { link: '/docs', label: 'Documentation' },
  //     { link: '/resources', label: 'Resources' },
  //     { link: '/community', label: 'Community' },
  //     { link: '/blog', label: 'Blog' },
  //   ],
  // },
  { link: '/about', label: 'About' },
  { link: '/pricing', label: 'Pricing' },
  {
    link: '/tool',
    label: '其他',
    links: [
      { link: '/tool/mqtt', label: 'MQTT' }
    ],
  },
];


const AppHeader = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const { data: session } = useSession()
  const fileItems =  (
    <Menu key={"filesys"} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <a
              href={'/file'}
              className={classes.link}
            >
              <Center>
                <span className={classes.linkLabel}>{'所有文件'}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item key={'/file/upload'} component='a' href={'/file/upload'}>上传文件</Menu.Item>
          </Menu.Dropdown>
    </Menu>
  )
  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link} component='a' href={item.link}>{item.label}</Menu.Item>
    ));

    if (menuItems) {
      return (
        <Menu key={link.label} trigger="hover" transitionProps={{ exitDuration: 0 }} withinPortal>
          <Menu.Target>
            <a
              href={link.link}
              className={classes.link}
            >
              <Center>
                <span className={classes.linkLabel}>{link.label}</span>
                <IconChevronDown size="0.9rem" stroke={1.5} />
              </Center>
            </a>
          </Menu.Target>
          <Menu.Dropdown>{menuItems}</Menu.Dropdown>
        </Menu>
      );
    }
    return (
      <a
        key={link.label}
        href={link.link}
        className={classes.link}
      >
        {link.label}
      </a>
    );
  });

  return (
    <header className={classes.header}>
      <Container size="md" c={'yellow'}>
        <div className={classes.inner}>
          <Anchor href='/' style={{ textDecoration: 'none' }}>
            <IconBrandX color="#fff" size={32} />
          </Anchor>
          
          <Anchor href='/' style={{ textDecoration: 'none' }}>
            <Text c="#fff" size="lg">只想优优</Text>
          </Anchor>

          <Group gap={5} visibleFrom="sm">
            {items}
            {session?.user?.name && fileItems}
            <UserAvatar user={{ username: session?.user?.name || '晴天小猪猪', image: session?.user?.image || '/admin.png' }} logout={signOut} login={signIn} />
          </Group>
          <Burger
            opened={opened}
            onClick={toggle}
            size="sm"
            hiddenFrom="sm"
            color="#fff"
          />
        </div>
      </Container>
    </header>

  );
}

export default AppHeader