"use client"
import { AppLayout } from '@/components/layout/AppLayout'
import { Button, CloseButton, Container, Group, LoadingOverlay, TextInput } from '@mantine/core'
import React, { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts/core';
import { EChartsOption } from "echarts";
import Charts from "@/components/Echarts";
import { useDisclosure } from '@mantine/hooks';
// import {
//   BarChart,
//   LineChart
// } from 'echarts/charts';
// import {
//   TitleComponent,
//   TooltipComponent,
//   GridComponent,
//   // 数据集组件
//   DatasetComponent,
//   // 内置数据转换器组件 (filter, sort)
//   TransformComponent
// } from 'echarts/components';
// import { LabelLayout, UniversalTransition } from 'echarts/features';
// import { CanvasRenderer } from 'echarts/renderers';
// import type {
//   // 系列类型的定义后缀都为 SeriesOption
//   BarSeriesOption, 
//   LineSeriesOption
// } from 'echarts/charts';
// import type {
//   // 组件类型的定义后缀都为 ComponentOption
//   TitleComponentOption,
//   TooltipComponentOption,
//   GridComponentOption,
//   DatasetComponentOption
// } from 'echarts/components';
// import type { 
//   ComposeOption, 
// } from 'echarts/core';

// // 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
// type ECOption = ComposeOption<
//   | BarSeriesOption
//   | LineSeriesOption
//   | TitleComponentOption
//   | TooltipComponentOption
//   | GridComponentOption
//   | DatasetComponentOption
// >;

// // 注册必须的组件
// echarts.use([
//   TitleComponent,
//   TooltipComponent,
//   GridComponent,
//   DatasetComponent,
//   TransformComponent,
//   BarChart,
//   LineChart,
//   LabelLayout,
//   UniversalTransition,
//   CanvasRenderer
// ]);

// const option: ECOption = {
//   // ...
// };


const Share = () => {
  let [options, setOptions] = useState<EChartsOption>({})
  const [futureName, setFutureName] = useState('')
  const [visible, { open, close }] = useDisclosure(false);
  const [date, setDate] = useState('')
  const [echarTitle, setEcharTitle] = useState('')
  const [xData, setXData] = useState<string[]>([])
  const [series, setSeries] = useState<any[]>([])

  const option = {
    title: {
      text: echarTitle
    },
    legend: {
      type: 'plain'
    },
    tooltip: {},
    yAxis: {
      scale: true,
      splitArea: {
        show: true
      }
    },
    dataZoom: [
      {
        type: 'inside',
        start: 0,
        end: 100
      },
      {
        show: true,
        type: 'slider',
        top: '90%',
        start: 0,
        end: 100
      }
    ],
    xAxis: {
      data: xData,
      boundaryGap: false,
      axisLine: { onZero: false },
      splitLine: { show: false },
      min: 'dataMin',
      max: 'dataMax'
    },
    series
  }
  const getData = async()=> {
    open()
    const name = futureName
    const month = date
    if(!name || !month) {
      close()
    }
    const result = await fetch(process.env.NEXT_PUBLIC_APP_HOST + '/api/share?name='+name + "&month="+month)
    const res = await result.json()
    console.log(res)
    if(res.success && res.data){
      const allItems:any[] = res.data
      const names = allItems.map((res: any) => res.name)
      const groupNames = Array.from(new Set(names)).sort()
      const tempArr:any[] = []
      let allTradeDate:string[] = []
      groupNames.map(gn => {
        const items = allItems.filter(i => i.name === gn).sort((a, b) => a.trade_date - b.trade_date)
        console.log(items)
        allTradeDate = [...allTradeDate, ...items.map(i => i.trade_date)]
        return ''
      })
      allTradeDate = Array.from(new Set(allTradeDate.sort().map(i => i.slice(4))))
      console.log(allTradeDate)
      const ss = groupNames.map(gn =>{
        console.log(gn)
        const items = allItems.filter(i => i.name === gn).sort((a, b) => a.trade_date - b.trade_date)
        const ser = {
          type: 'candlestick',
          name: gn,
          data: allTradeDate.map(mmdd => {
            const d = items.find(d => d.trade_date.includes(mmdd))
            return d? [d.open || 0,d.close|| 0,d.low|| 0,d.high|| 0]: []
          })
        }
        return ser
      })
      console.log(ss)
      setSeries(ss)
      setXData(allTradeDate)
    }
    console.log(visible)
    close()
    
    return res
  }
  return (
    <AppLayout>
      <Container mt={'lg'}>
        <LoadingOverlay visible={visible} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />
        <Group>
            <TextInput
              label="名称"
              placeholder="请输入名称"
              value={futureName}
              onChange={(event) => setFutureName(event.currentTarget.value)}
              rightSectionPointerEvents="all"
              mt="md"
              rightSection={
                <CloseButton
                  aria-label="Clear input"
                  onClick={() => setFutureName('')}
                  style={{ display: futureName ? undefined : 'none' }}
                />
              }
            />
            <TextInput
              label="月份"
              placeholder="请输入月份"
              value={date}
              w={90}
              onChange={(event) => setDate(event.currentTarget.value)}
              rightSectionPointerEvents="all"
              mt="md"
              maxLength={2}
              rightSection={
                <CloseButton
                  aria-label="Clear input"
                  onClick={() => setDate('')}
                  style={{ display: date ? undefined : 'none' }}
                />
              }
            />
            <Button variant="filled" onClick={getData}>查询</Button>
        </Group>
        <Charts options={option} />
      </Container>
    </AppLayout>
  )
}

export default Share
