"use client"
import React from 'react'
import { Menu, Group, Center, Burger, Container, rem, Text, Anchor, Button, Box, Avatar, useMantineColorScheme, Switch, useMantineTheme, Input, Pill } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import { IconArrowsLeftRight, IconArticle, IconBrandX, IconChevronDown, IconEdit, IconFeather, IconFileUpload, IconLogout, IconMessageCircle, IconMoonStars, IconMountain, IconPaint, IconPalette, IconPhoto, IconSearch, IconSettings, IconSun, IconTrash } from '@tabler/icons-react';
import { useSession, signIn, signOut } from "next-auth/react"
import UserAvatar from '../UserAvatar';
import classes from './App.module.css';
import { theme } from '@/theme';
import AppMenuItems from './MenuItems';
import { Spotlight, spotlight } from '@mantine/spotlight';
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
  {
    link: '/tool',
    label: '其他',
    links: [
      { link: '/tool/mqtt', label: 'MQTT' },
      { link: '/about', label: 'About' }
    ],
  },
];


const AppHeader = () => {
  const [opened, { open: openBurger, close: closeBurger, toggle }] = useDisclosure(false);
  const outRef = useClickOutside(() => closeBurger())
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const { data: session } = useSession()

  const fileItems = (
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
    // <header className={classes.header}>
    <>
      <Container size="md" c={'yellow'}>
        <div className={classes.inner}>
          <Anchor href='/' style={{ textDecoration: 'none' }}>
            <IconBrandX color="#fff" size={32} />
          </Anchor>

          <Anchor href='/' style={{ textDecoration: 'none' }}>
            <Text c="#fff" size="lg">只想优优</Text>
          </Anchor>
          <Button
            hiddenFrom='sm'
            onClick={spotlight.open}
            leftSection={<IconSearch color='gray' size={16} />}
            rightSection={<Pill visibleFrom="sm" size='sm'>Ctrl+K</Pill>}
            variant="default">
            <Text size='sm' c={'gray'}>搜索</Text>
          </Button>
          <Group gap={5} visibleFrom="sm">
            <Button
              onClick={spotlight.open}
              leftSection={<IconSearch color='gray' size={16} />}
              rightSection={<Pill c={'teal.7'} size='sm'>Ctrl+K</Pill>}
              variant="default">
              <Text size='sm' c={'gray'} mr={'3rem'}>搜索</Text>
            </Button>
            {items}
            {session?.user?.name && fileItems}
            <UserAvatar
              theme={theme}
              colorScheme={colorScheme}
              toggleColorScheme={toggleColorScheme}
              user={
                {
                  username: session?.user?.name || '晴天小猪猪',
                  image: session?.user?.image || '/admin.png'
                }
              }
              login={session?.user ? true : false} />
          </Group>
          {/* for mobile */}
          <Box hiddenFrom="sm">
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <Burger
                  ref={outRef}
                  opened={opened}
                  onClick={toggle}
                  size="sm"
                  color="#fff"
                />
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Label>
                  <Group>
                    <Avatar src={session?.user?.image} onClick={() => !session?.user && signIn()} />
                    {session?.user?.name ?? '晴天小猪猪'}
                  </Group>
                </Menu.Label>
                <Menu.Divider />
                <AppMenuItems login={session?.user ? true : false} theme={theme} colorScheme={colorScheme} toggleColorScheme={toggleColorScheme} />
              </Menu.Dropdown>
            </Menu>
          </Box>

        </div>
        <Spotlight
          actions={[]}
          nothingFound="功能正在建设中..."
          highlightQuery
          onChange={(v) => console.log(v)}
          searchProps={{
            leftSection: <IconSearch style={{ width: rem(20), height: rem(20) }} stroke={1.5} />,
            placeholder: 'Search...',
          }} />
      </Container>

      {/* </header> */}
    </>

  );
}

export default AppHeader