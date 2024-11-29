"use client"

import React from 'react'
import { useWindowScroll } from '@mantine/hooks';
import { Affix, Button, Text, Transition, rem } from '@mantine/core';
import { IconArrowUp } from '@tabler/icons-react';

const Go2Top = () => {
    const [scroll, scrollTo] = useWindowScroll();
    return (
        <Affix position={{ bottom: 20, right: 20 }}>
            <Transition transition="slide-up" mounted={scroll.y > 0}>
                {(transitionStyles) => (
                    <Button
                        bg={'teal'}
                        leftSection={<IconArrowUp style={{ width: rem(16), height: rem(16) }} />}
                        style={transitionStyles}
                        onClick={() => scrollTo({ y: 0 })}
                    >
                        顶部
                    </Button>
                )}
            </Transition>
        </Affix>
    )
}

export default Go2Top