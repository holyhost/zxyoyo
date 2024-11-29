"use client"
import React, { useEffect, useState } from 'react'
import classes from './ShareTest.module.css'
import { Anchor, Badge, Center, Container, Group, Loader, Spoiler, Text } from '@mantine/core'
import { getShareTestResult } from '@/utils/action/share.action'
import { useInView } from 'react-intersection-observer'
import { EndOfFeed } from '@/components/EndOfFeed/EndOfFeed'

export type ShareTestBean = {
  createtime: string,
  description: string,
  id: number,
  value: string,
  more1: string,
  more2: string,
  test_type: string,
  trade_date: string,
  ts_code: string
}

const ShareTest = () => {
  const [logs, setLogs] = useState<ShareTestBean[]>([])
  const { ref, inView } = useInView();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [pageIndex, setPageIndex] = useState<number>(0)
  const [end, setEnd] = useState<boolean>(false)
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      const res = await getShareTestResult(pageIndex)
      console.log(res)
      if(res.success){
        setLogs([...logs, ...res.data])
        setPageIndex(pageIndex + 1)
        if (res.data.length < 10) setEnd(true)
      }
      setIsLoading(false)
    }
    if (inView && !isLoading && !end) getData()
  }, [inView, isLoading])
  useEffect(()=>{
    const getData = async()=> {
      const res = await getShareTestResult()
      console.log(res)
      if(res.success){
        setLogs([...res.data])
      }
    }
    getData()
  }, [])
  return (
    <Container>
      {logs.map(item => (<div key={item.id} className={classes.itemContainer}>
        <Group justify='space-between'>
          <Text>{item.ts_code}  {item.trade_date}</Text>
          <Badge>{item.test_type}</Badge>
        </Group>
        
        <Text>{item.description}</Text>
        <Text>{item.value}</Text>
        <Text>{item.more1}</Text>
        {item.more2 && (item.more2.split(',').length > 20 ? <Anchor className={classes.ellipsisText} c={'white'}>{item.more2.split(',').slice(0,20).join(',')}共{item.more2.split(',').length}个</Anchor> : <div className={classes.breakWord}>
              {item.more2}
            </div>)}
        <Group justify='space-between'>
          <Text></Text>
          <Text size='sm' c={'gray-3'}>{item.createtime}</Text>
        </Group>

      </div>))}
      <Center ref={ref} mt="md">
        {!end && inView && !isLoading && <Loader />}
      </Center>
      {end && <EndOfFeed />}
    </Container>
  )
}

export default ShareTest
