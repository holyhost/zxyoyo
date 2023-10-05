"use client"
import { Button, Container, Group, Title, Text } from '@mantine/core'
import React from 'react'
import classes from '@/styles/error.module.css'

const RootError = () => {
  return (
    <div className={classes.root}>
    <Container>
      <div className={classes.label}>500</div>
      <Title className={classes.title}>Something bad just happened...</Title>
      <Text size="lg" ta="center" className={classes.description}>
        Our servers could not handle your request. Don&apos;t worry, our development team was
        already notified. Try refreshing the page.
      </Text>
      <Group justify="center">
        <Button variant="white" size="md" component={'a'} href='/'>
          返回首页
        </Button>
      </Group>
    </Container>
  </div>
  )
}

export default RootError
