"use client"
import { Center, Container } from '@mantine/core'
import React, { useEffect, useState } from 'react'
import PoemCard from './PoemCard'
import { PoemBean } from '@/bean/PoemBean'
import { Masonry } from 'masonic'



const PoemList =  ({data}:{data: PoemBean[]}) => {
  const [inited, setInited] = useState(false)
  useEffect(()=> setInited(true), [])
  return (
    <Container mt={'xl'}>
      {inited && <Masonry items={data} 
                          render={PoemCard} 
                          columnGutter={28} 
                          itemKey={item => item.id}/>}
    </Container>
  )
}

export default PoemList

