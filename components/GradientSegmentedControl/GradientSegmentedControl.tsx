"use client"
import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { SegmentedControl } from '@mantine/core';
import classes from './GradientSegmentedControl.module.css';
import { POST_TYPE } from '@/utils/constants/data.enum';

const GradientSegmentedControl = () => {

  const titles = POST_TYPE
  const router = useRouter()
  const params = useSearchParams()
  const defaultValue = params.get('type') ?? ''
  const updateUrl = (v: string)=> {
    let url = v ? `/posts?type=${v}` : '/posts'
    router.push(url)
  }
  return (
    <SegmentedControl
      radius="xl"
      value={defaultValue}
      size="md"
      data={titles}
      classNames={classes}
      onChange={(v) => updateUrl(v)}
    />
  )
}

export default GradientSegmentedControl
