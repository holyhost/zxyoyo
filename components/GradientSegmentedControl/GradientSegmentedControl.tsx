import React from 'react'
import { SegmentedControl } from '@mantine/core';
import classes from './GradientSegmentedControl.module.css';
import { POST_TYPE } from '@/utils/constants/data.enum';

const GradientSegmentedControl = () => {

    const titles = POST_TYPE
  return (
    <SegmentedControl
      radius="xl"
      size="md"
      data={titles}
      classNames={classes}
    />
  )
}

export default GradientSegmentedControl
