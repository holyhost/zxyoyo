"use client"
import React from 'react'
import { Menu, Group, Center, Burger, Container, rem, Text, Anchor, Button, Box, Avatar, useMantineColorScheme, Switch, useMantineTheme } from '@mantine/core';
import { useClickOutside, useDisclosure } from '@mantine/hooks';
import { IconArrowsLeftRight, IconArticle, IconBrandX, IconChevronDown, IconEdit, IconFeather, IconFileUpload, IconLogout, IconMessageCircle, IconMoonStars, IconMountain, IconPaint, IconPalette, IconPhoto, IconSearch, IconSettings, IconSun, IconTrash } from '@tabler/icons-react';
import { useSession, signIn, signOut } from "next-auth/react"
import UserAvatar from '../UserAvatar';
import classes from './App.module.css';
import { theme } from '@/theme';
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
  const [opened, { open: openBurger, close: closeBurger, toggle }] = useDisclosure(false);
  const outRef = useClickOutside(() => closeBurger())
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const { data: session } = useSession()
  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.yellow[4]}
    />
  );

  const moonIcon = (
    <IconMoonStars
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={theme.colors.blue[6]}
    />
  );
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

          <Group gap={5} visibleFrom="sm">
            {items}
            {session?.user?.name && fileItems}
            <UserAvatar user={{ username: session?.user?.name || '晴天小猪猪', image: session?.user?.image || '/admin.png' }} logout={signOut} login={signIn} />
          </Group>
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
                    <Avatar src={session?.user?.image} onClick={()=>!session?.user && signIn()}/>
                    {session?.user?.name ?? '晴天小猪猪'}
                  </Group>
                </Menu.Label>
                <Menu.Divider />
                <Menu.Label>功能</Menu.Label>
                <Menu.Item component='a' href='/home' leftSection={<IconMountain style={{ width: rem(14), height: rem(14) }} />}>
                  古诗词
                </Menu.Item>
                <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                  设置
                </Menu.Item>
                <Menu.Item component='a' href='/posts' leftSection={<IconArticle style={{ width: rem(14), height: rem(14) }} />}>
                  文章
                </Menu.Item>
                <Menu.Item component='a' href='/posts/new' leftSection={<IconEdit style={{ width: rem(14), height: rem(14) }} />}>
                  写文章
                </Menu.Item>
                <Menu.Item leftSection={<IconPhoto style={{ width: rem(14), height: rem(14) }} />}>
                  文件
                </Menu.Item>
                <Menu.Item component='a' href='/file/upload' leftSection={<IconFileUpload style={{ width: rem(14), height: rem(14) }} />}>
                  上传文件
                </Menu.Item>
                <Menu.Item component='a' href='/file/other' leftSection={<IconPhoto style={{ width: rem(14), height: rem(14) }} />}>
                  其他文件
                </Menu.Item>
                <Menu.Divider />
                <Menu.Label>工具</Menu.Label>
                <Menu.Item component='a' href='/tool/mqtt' leftSection={<IconMountain style={{ width: rem(14), height: rem(14) }} />}>
                  MQTT
                </Menu.Item>
                <Menu.Item
                  leftSection={<IconSearch style={{ width: rem(14), height: rem(14) }} />}
                  rightSection={
                    <Text size="xs" c="dimmed">
                      ⌘K
                    </Text>
                  }
                >
                  Search
                </Menu.Item>

                <Menu.Divider />

                <Menu.Label>设置</Menu.Label>
                <Menu.Item
                  closeMenuOnClick={false}
                  leftSection={<IconPalette stroke={1.5} />}
                  onClick={() => toggleColorScheme()}
                >
                  <Group justify="space-between">
                    主题
                    <Switch
                      checked={colorScheme === 'dark'}
                      color="dark.4" onLabel={moonIcon} offLabel={sunIcon}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </Group>
                </Menu.Item>
                <Menu.Item
                  color="red"
                  onClick={()=> signOut()}
                  leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
                >
                  退出
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Box>


        </div>
      </Container>
    
    {/* </header> */}
    </>

  );
}

export default AppHeader