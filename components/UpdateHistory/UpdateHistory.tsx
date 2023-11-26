"use client"
import React from 'react'
import { Container, Timeline, Text, Avatar, ThemeIcon } from '@mantine/core'
import { IconBrandDocker, IconCategory, IconDashboard, IconInfoCircle, IconStar, IconSun, IconVideo } from '@tabler/icons-react'

const UpdateHistory = () => {
    return (
        <>
            <Text fw={700} mt={'md'}>更新历史</Text>
            <Timeline mt={'sm'} bulletSize={24} lineWidth={3} active={4} reverseActive>
                <Timeline.Item title="新增关于界面-add about page" bullet={<IconDashboard/>}>
                    <Text c="dimmed" size="md">
                        完善古诗词，文章等界面
                    </Text>
                    <Text size="xs">
                        2023-11-xx
                    </Text>
                </Timeline.Item>
                <Timeline.Item title="笔记分类-update category" bullet={<IconCategory/>}>
                    <Text c="dimmed" size="md">
                        服务器静态渲染post文章的各个分类;
                        <br/>
                        设置文章刷新间隔为2h
                        <br/>
                        部署docker
                    </Text>
                    <Text size="xs">
                        2023-11-26
                    </Text>
                </Timeline.Item>
                <Timeline.Item title="新增关于界面-add about page" bullet={<IconInfoCircle/>}>
                    <Text c="dimmed" size="md">
                        增加“关于”界面，使用Mantine的Timeline组件
                    </Text>
                    <Text size="xs">
                        2023-11-22
                    </Text>
                </Timeline.Item>
                <Timeline.Item
                    title="MQTT"
                    bullet={
                        <Avatar
                            size={22}
                            radius="xl"
                            src="https://zxyoyo.com/admin.png"
                        />
                    }
                >
                    <Text c="dimmed" size="sm">
                        增加一个mqtt的链接测试界面，方便查看esp8266发布的消息！
                    </Text>
                    <Text size="xs">
                        2023-11-10
                    </Text>
                </Timeline.Item>
                <Timeline.Item title="部署-Deploy" bullet={<IconBrandDocker size="0.8rem" />} lineVariant="dotted">
                    <Text c="dimmed" size="md">
                        几年前服务器就安装了docker，于是用docker创建node镜像，部署代码！
                    </Text>
                    <Text size="xs">
                        2023-11-09
                    </Text>
                </Timeline.Item>
                <Timeline.Item
                    title="初始化-Initialise"
                    bullet={
                        <IconStar size="0.8rem" />
                    }
                >
                    <Text c="dimmed" size="md">
                        最开始学习react的时候找到civitai开源项目，
                        发现它用的nextjs框架，UI组件库是mantine，感觉界面挺好看的。
                        于是乎，就开始学习nextjs，nextjs13是一个大版本的更新，用的app路由（13之前都是page路由），
                        为了与mantine结合起来尝试了很多次都失败了，放弃了几个月。
                        到8月份，想做一个自己的网站，用来记录生活，技术等日常，
                        在github发现mantine给了一个nextjs + mantine初始化的template，
                        clone下来试了一下，之前遇到的阻碍都不存在了，
                        最终决定一边学习next一边更新此网站！
                    </Text>
                    <Text size="xs">
                        2023-08-19
                    </Text>
                </Timeline.Item>
            </Timeline>
        </>
    )
}

export default UpdateHistory
