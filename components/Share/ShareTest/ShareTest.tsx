"use client"
import React, { useEffect, useState } from 'react'
import classes from './ShareTest.module.css'
import { Anchor, Badge, Center, Container, Group, Loader, SegmentedControl, Spoiler, TagsInput, Text } from '@mantine/core'
import { getShareTestResult } from '@/utils/action/share.action'
import { useInView } from 'react-intersection-observer'
import { EndOfFeed } from '@/components/EndOfFeed/EndOfFeed'
import { constants, SHARE_TEST_TYPE } from '@/utils/constants/data.enum'
import { useDebounceCallback, useDebouncedState } from '@mantine/hooks'
import { DateInput, DateValue } from '@mantine/dates'
import { IconCalendar } from '@tabler/icons-react'
import dayjs from 'dayjs'

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
  const [logs0, setLogs0] = useState<ShareTestBean[]>([])
  const { ref, inView } = useInView();
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [startDate, setStartDate] = useState<DateValue>()
  const [pageIndex, setPageIndex] = useState<number>(0)
  const [pageCount, setPageCount] = useState<number>(100)
  const [tabIndex, setTabIndex] = useState<string>('day-report')
  const [selectedMaTags, setSelectedMaTags] = useState<string[]>([])
  // const [selectedMaTags, setSelectedMaTags] = useDebouncedState([], 2000);
  const [end, setEnd] = useState<boolean>(false)
  const tabs = [...SHARE_TEST_TYPE]
  const handleTagsChange = useDebounceCallback(async ()=>{
    const tags = selectedMaTags.join(',')
    const res = await getShareTestResult(pageIndex, pageCount, dayjs(startDate).format('YYYYMMDD'), tabIndex, tags)
      if(res.success){
        setLogs([...res.data])
        // setPageIndex(pageIndex + 1)
        setEnd(true)
      }
    // setLogs([...arr])
  }, 1200)
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      const res = await getShareTestResult(pageIndex, pageCount, dayjs(startDate).format('YYYYMMDD'), tabIndex)
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
      const res = await getShareTestResult(0, pageCount, dayjs(startDate).format('YYYYMMDD'),tabIndex)
      if(res.success){
        setLogs([...res.data])
      }
    }
    getData()
  }, [tabIndex])
  const updateTab = (v: string) => {
    if(v === 'day-ma'){
      setPageCount(5000)
    }else{
      setPageCount(100)
    }
    setPageIndex(0)
    setTabIndex(v)
  }
  const updateTagLog = (v: string[]) => {
    if(selectedMaTags.length === 0 && logs0.length === 0){
      setLogs([...logs])
    }
    setSelectedMaTags([ ...v])
    handleTagsChange()
  }
  useEffect(()=>{
    handleTagsChange()
  }
  ,[startDate])
  return (
    <Container>
      <Group>
        <SegmentedControl
          radius="xl"
          value={tabIndex}
          size="md"
          data={tabs}
          classNames={classes}
          onChange={(v) => updateTab(v)}
        />
      </Group>
      <Group>
        <DateInput
          valueFormat="YYYYMMDD"
          label="开始日期"
          w={'7rem'}
          rightSection={<IconCalendar />}
          value={startDate}
          onChange={(event) => setStartDate(event)}
          placeholder="Date input" />
        <TagsInput
          mt={'sm'}
          label="标签"
          description="MA标签，可以输入多个,回车确认"
          placeholder="请输入标签"
          onChange={(value) => updateTagLog(value)}
          value={selectedMaTags}
          data={Array.from(constants.maTags)}
        />
      </Group>
      
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
