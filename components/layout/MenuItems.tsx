import { Menu, rem, Group, Switch, Text } from '@mantine/core'
import { IconMountain, IconSettings, IconArticle, IconEdit, IconPhoto, IconFileUpload, IconSearch, IconPalette, IconLogout, IconMoonStars, IconSun, IconLogin, IconContainer, IconFile, IconDog, IconElevator } from '@tabler/icons-react'
import { signOut, signIn } from 'next-auth/react'
import React from 'react'

type Props = {
    login?: boolean,
    theme: any,
    colorScheme: string,
    toggleColorScheme: () => void
}

const AppMenuItems = ({ login = false, theme, colorScheme, toggleColorScheme }: Props) => {
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
    return (
        <>
            <Menu.Label>功能</Menu.Label>
            <Menu.Item component='a' href='/home' leftSection={<IconMountain style={{ width: rem(14), height: rem(14) }} />}>
                古诗词
            </Menu.Item>
            <Menu.Item component='a' href='/share' leftSection={<IconDog style={{ width: rem(14), height: rem(14) }} />}>
                A
            </Menu.Item>
            <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                设置
            </Menu.Item>
            <Menu.Item component='a' href='/posts' leftSection={<IconArticle style={{ width: rem(14), height: rem(14) }} />}>
                文章
            </Menu.Item>
            {login && <Menu.Item component='a' href='/posts/my' leftSection={<IconContainer style={{ width: rem(14), height: rem(14) }} />}>
                我的文章
            </Menu.Item>}
            {login && <Menu.Item component='a' href='/posts/new' leftSection={<IconEdit style={{ width: rem(14), height: rem(14) }} />}>
                写文章
            </Menu.Item>}
            <Menu.Item leftSection={<IconFile style={{ width: rem(14), height: rem(14) }} />}>
                文件
            </Menu.Item>
            <Menu.Item component='a'  href='/share' leftSection={<IconElevator style={{ width: rem(14), height: rem(14) }} />}>
                Future
            </Menu.Item>
            {login && <Menu.Item component='a' href='/file/upload' leftSection={<IconFileUpload style={{ width: rem(14), height: rem(14) }} />}>
                上传文件
            </Menu.Item>}
            {login && <Menu.Item component='a' href='/file/other' leftSection={<IconPhoto style={{ width: rem(14), height: rem(14) }} />}>
                其他文件
            </Menu.Item>}
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
                leftSection={<IconPalette color='orange' stroke={1.5} />}
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
            {login && <Menu.Item
                color="red"
                onClick={() => signOut()}
                leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}
            >
                退出
            </Menu.Item>}
            {!login && <Menu.Item
                color="teal"
                onClick={() => signIn()}
                leftSection={<IconLogin style={{ width: rem(14), height: rem(14) }} />}
            >
                登录
            </Menu.Item>}
        </>
    )
}

export default AppMenuItems
