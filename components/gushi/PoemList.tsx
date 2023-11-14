"use client"
import { Center, Container } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import PoemCard from './PoemCard'
import { PoemBean } from '@/bean/PoemBean'
import { Masonry } from 'masonic'
import { useIsMobile } from '@/hooks/useIsMobile'



const PoemList =  ({data}:{data: PoemBean[]}) => {
  const [inited, setInited] = useState(false)
  const mobile = useIsMobile()
  useEffect(()=> setInited(true), [])
  return (
    <Container px={mobile? '0': 'md'}>
      {inited && data && data.length >0 && <Masonry items={data} 
                          render={PoemCard} 
                          columnGutter={28} 
                          itemKey={item => item.id}/>}
    </Container>
  )
}

export default PoemList

