import React from 'react'
import { MantineProvider } from '@mantine/core'
import { AppLayout } from '@/components/layout/AppLayout'
const MantineLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <section>
            <MantineProvider
            >
                <AppLayout>
                    {children}
                </AppLayout>
            </MantineProvider>
        </section>
    )
}

export default MantineLayout
