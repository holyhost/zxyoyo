"use client"
import { AppLayout } from '@/components/layout/AppLayout'
import { Center, Stack, Text } from '@mantine/core'
import { Metadata } from 'next'
import { Button, CloseButton, Container, Group, LoadingOverlay, Select, SelectProps, TextInput } from '@mantine/core'
import React, { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts/core';
import { EChartsOption, color } from "echarts";
import Charts from "@/components/Echarts";
import { DateInput, DateValue } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { IconCalendar } from '@tabler/icons-react';
import dayjs from 'dayjs';
import { XAXisOption } from 'echarts/types/dist/shared';

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

type DataType = {
  cname: string,
  name: string,
  lbname: string,
  dayks: any[],
  vols: any[]
}



const Page = async ({ params }: Props) => {
  const id = params.id
  const [data, setData] = useState<DataType | null>(null)
  const [tscode, setTscode] = useState('000010')
  const [turn, setTurn] = useState(0)
  const [legendData, setLegendData] = useState<string[]>([])
  const [futureName, setFutureName] = useState('')
  const [startDate, setStartDate] = useState<DateValue>()
  const [endDate, setEndDate] = useState<DateValue>()
  const [visible, { open, close }] = useDisclosure(false);
  // console.log(dayjs(startDate!.getTime() - 30*24*60*60*1000).format('YYYYMMDD'))
  const [date, setDate] = useState('')
  const [echarTitle, setEcharTitle] = useState('')
  const [xData, setXData] = useState<string[]>([])
  const [series, setSeries] = useState<any[]>([])
  const colorList = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3'];
  const labelFont = 'bold 12px Sans-serif';
  useEffect(() => {
    const d = new Date()
    setStartDate(new Date(d.getTime() - 60 * 24 * 60 * 60 * 1000))
    setEndDate(d)
    setTimeout(() => {
      getData()
    }, 500);
    
  }, [])

  const getData = async () => {
    const d = new Date()
    const d1 = dayjs(new Date(d.getTime() - 60 * 24 * 60 * 60 * 1000)).format('YYYYMMDD')
    const d2 = dayjs(endDate).format('YYYYMMDD')
    const res = await fetch(process.env.NEXT_PUBLIC_APP_HOST + '/api/share/a/' + id + '&startDate=' + d1 + '&endDate=' + d2)
    if (!res.ok) {
      // This will activate the closest `error.js` Error Boundary
      return { fail: true }
    }
    const jsonData = await res.json()
    const dd = jsonData.data
    setData({ ...dd })
    console.log(dd)
    const allItems: any[] = dd.dayks || null
    if (allItems.length > 0) {
      const items = allItems.sort((a, b) => a.trade_date - b.trade_date)
      const data = items.map(d => (d ? [d.open || 0, d.close || 0, d.low || 0, d.high || 0] : []))
      const datama5 = calculateMA(5, data)
      const datama10 = calculateMA(10, data)
      setTurn(dd.vols[dd.vols.length - 1].turnover_rate)
      const pointData: any[] = []
      if (data.length == datama5.length && data.length == datama10.length && data.length > 10) {
        for (let index = 9; index < data.length; index++) {
          const bean = items[index];
          if (datama5[index] >= datama10[index] && datama5[index - 1] < datama10[index - 1]) {
            pointData.push({
              name: bean.trade_date,
              value: '',
              coord: [bean.trade_date, bean.low * 0.99],
              symbolSize: 30
            })
          }
        }
      }
      console.log(pointData)
      const markPoint = {
        symbol: 'pin',
        symbolRotate: 180,
        label: {
          show: true
        },
        itemStyle: {
          color: 'teal'
        },
        data: pointData

      }
      setSeries([
        {
          type: 'candlestick',
          name: 'day',
          data: data,
          markPoint: markPoint
        },
        {
          name: 'MA5',
          type: 'line',
          data: datama5,
          smooth: true,
          showSymbol: false,
          lineStyle: {
            width: 1
          }
        },
        {
          name: 'MA10',
          type: 'line',
          data: datama10,
          smooth: true,
          showSymbol: false,
          lineStyle: {
            width: 1
          }
        },
        {
          name: 'Volume',
          type: 'bar',
          xAxisIndex: 1,
          yAxisIndex: 1,
          itemStyle: {
            color: '#7fbe9e'
          },
          emphasis: {
            itemStyle: {
              color: '#140'
            }
          },
          data: items.map(item => item.volume)
        },
      ])
      setXData(items.map(item => item.trade_date))
      setLegendData(['day', 'MA5', 'MA10', 'Volume'])
    } else {
      setSeries([])
      setXData([])
    }
  }
  const xoptions: XAXisOption[] = [
    {
      type: 'category',
      data: xData,
      boundaryGap: false,
      axisLine: { lineStyle: { color: '#777' } },
      axisLabel: {
        formatter: function (value) {
          return value.slice(-4)
        }
      },
      min: 'dataMin',
      max: 'dataMax',
      axisPointer: {
        show: true
      }
    },
    {
      type: 'category',
      gridIndex: 1,
      data: xData,
      boundaryGap: false,
      splitLine: { show: false },
      axisLabel: { show: false },
      axisTick: { show: false },
      axisLine: { lineStyle: { color: '#777' } },
      min: 'dataMin',
      max: 'dataMax',
      axisPointer: {
        type: 'shadow',
        label: { show: false },
        triggerTooltip: true,
        handle: {
          show: true,
          margin: 30,
          color: '#B80C00'
        }
      }
    }
  ]
  const option = {
    color: colorList,
    title: {
      text: echarTitle
    },
    legend: {
      top: 30,
      data: legendData
    },
    tooltip: {},
    dataZoom: [
      {
        type: 'inside',
        xAxisIndex: [0, 1],
        start: 0,
        end: 100
      },
      {
        show: true,
        type: 'slider',
        xAxisIndex: [0, 1],
        bottom: '10',
        start: 0,
        end: 100
      }
    ],
    xAxis: xoptions,
    yAxis: [
      {
        scale: true,
        splitNumber: 2,
        axisLine: { lineStyle: { color: '#777' } },
        splitLine: { show: true },
        axisTick: { show: false },
        axisLabel: {
          inside: true,
          formatter: '{value}\n'
        }
      },
      {
        scale: true,
        gridIndex: 1,
        splitNumber: 2,
        axisLabel: { show: false },
        axisLine: { show: false },
        axisTick: { show: false },
        splitLine: { show: false }
      }
    ],
    grid: [
      {
        left: 20,
        right: 20,
        top: 110,
        height: 220
      },
      {
        left: 20,
        right: 20,
        height: 40,
        top: 370
      }
    ],
    graphic: [
      {
        type: 'group',
        left: 'center',
        top: 70,
        width: 300,
        bounding: 'raw',
        children: [
          {
            id: 'MA5',
            type: 'text',
            style: { fill: colorList[1], font: labelFont },
            left: 0
          },
          {
            id: 'MA10',
            type: 'text',
            style: { fill: colorList[2], font: labelFont },
            left: 'center'
          },
          {
            id: 'MA20',
            type: 'text',
            style: { fill: colorList[3], font: labelFont },
            right: 0
          }
        ]
      }
    ],
    series
  }
  const calculateMA = (dayCount: number, data: number[][]) => {
    let result = [];
    for (let i = 0, len = data.length; i < len; i++) {
      if (i < dayCount - 1) {
        result.push('-');
        continue;
      }
      let sum = 0;
      for (let j = 0; j < dayCount; j++) {
        sum += data[i - j][1];
      }
      result.push((sum / dayCount).toFixed(2));
    }
    return result;
  }

  // if(result?.fail) return <>404</>
  return (
    <>
      <AppLayout>
        <Center>
          {data ? (
            <Stack>
              
              <Center>
                <Text>
                  {data?.name}
                </Text>
                <Text>
                  {id}, {turn}
                </Text>
              </Center>
            </Stack>
          ) : id}
        </Center>
        <Container>
          <Charts options={option} />
        </Container>

      </AppLayout>
    </>
  )
}

export default Page
