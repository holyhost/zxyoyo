import { AppLayout } from '@/components/layout/AppLayout'
import React from 'react'

const layout = ({ children }: { children: any }) => {
  return (
    <AppLayout>
        {children}
    </AppLayout>
  )
}

export default layout
