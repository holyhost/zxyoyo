import { AppLayout } from '@/components/layout/AppLayout'
import { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: '工具',
  description: '各种工具的集合'
}

const layout = ({ children }: { children: any }) => {
  return (
    <AppLayout>
        {children}
    </AppLayout>
  )
}

export default layout
