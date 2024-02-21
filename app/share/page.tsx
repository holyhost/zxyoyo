"use client"
import { AppLayout } from '@/components/layout/AppLayout'
import { Container } from '@mantine/core'
import React, { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts/core';
import { EChartsOption } from "echarts";
import Charts from "@/components/Echarts";
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


const Share = async () => {
  let [options, setOptions] = useState<EChartsOption>({})
  useEffect(() => {
    setOptions({
      animationDuration: 3000,
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '0',
        left: 'center'
      },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line'
        }
      ]
    })
  }, [])
  return (
    <AppLayout>
      <Container mt={'lg'}>
        this. share page...
        <Charts options={options} />
      </Container>
    </AppLayout>
  )
}

export default Share
