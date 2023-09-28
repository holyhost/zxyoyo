"use client"
import React from 'react'
import { Menu, Group, Center, Burger, Container, rem, Text, Anchor, Button } from '@mantine/core';
import { useDisclosure, useLocalStorage } from '@mantine/hooks';
import { IconBrandApple, IconChevronDown } from '@tabler/icons-react';
import { useSession, signIn, signOut } from "next-auth/react"
import UserAvatar from '../UserAvatar';
import classes from './HeaderMenu.module.css';
// import { MantineLogo } from '@mantine/ds';
const links = [
  { link: '/posts', label: 'Post' },
  {
    link: '#1',
    label: 'Learn',
    links: [
      { link: '/docs', label: 'Documentation' },
      { link: '/resources', label: 'Resources' },
      { link: '/community', label: 'Community' },
      { link: '/blog', label: 'Blog' },
    ],
  },
  { link: '/about', label: 'About' },
  { link: '/pricing', label: 'Pricing' },
  {
    link: '#2',
    label: 'Support',
    links: [
      { link: '/faq', label: 'FAQ' },
      { link: '/demo', label: 'Book a demo' },
      { link: '/forums', label: 'Forums' },
    ],
  },
];


const AppHeader = () => {
  const [opened, { toggle }] = useDisclosure(false);
  const { data: session } = useSession()
  const items = links.map((link) => {
    const menuItems = link.links?.map((item) => (
      <Menu.Item key={item.link}>{item.label}</Menu.Item>
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
      <Container color='blue' size="md">
        <div className={classes.inner}>
          <IconBrandApple color="#fff" size={32} />
          <Anchor href='/' style={{ textDecoration: 'none' }}>
            <Text c="#fff" size="lg">只想优优</Text>
          </Anchor>

          <Group gap={5} visibleFrom="sm">
            {items}
            {session?.user ? <UserAvatar user={{ username: session.user.name || '', image: session.user.image || '' }} logout={signOut} /> : <Button
              key={'head-link-login'}
              onClick={() => signIn()}
            >
              登录
            </Button>}
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