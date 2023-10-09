import React from 'react'
import { signIn } from "next-auth/react"
import { Container, Button, Text, Center } from '@mantine/core'

const LoginRedirect = () => {
    return (
        <Container>
            <Center mt={'xl'}>
                <Text>请先登录，才能访问该页面！</Text>
                <Button onClick={() => signIn()}>
                    登录
                </Button>
            </Center>
        </Container>
    )
}

export default LoginRedirect
