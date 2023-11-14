"use client"
import {
  AppShell, rem
}
  from '@mantine/core';
  import { useDebouncedState, useWindowEvent } from '@mantine/hooks';
import { useIsMobile } from '@/hooks/useIsMobile';
import { getScrollPosition } from '@/utils/window-helpers';

import AppHeader from './AppHeader';
import { signOut, useSession } from 'next-auth/react';
import { AppFooter } from './AppFooter';
import classes from './App.module.css';
import LoginRedirect from '../LoginRedirect/LoginRedirect';

export function AppLayout({ children, navbar, login=false }: Props) {
  const { data: session } = useSession()
  const [showFooter, setShowFooter] = useDebouncedState(true, 200);
  const mobile = useIsMobile();

  useWindowEvent('scroll', () => {
    const scroll = getScrollPosition();
    setShowFooter(scroll.y < 10);
  });
  return (
    <AppShell
      padding="md"
    >
      <AppShell.Header className={classes.header}>{<AppHeader />}</AppShell.Header>
      {/* <AppShell.Navbar>Navabar...</AppShell.Navbar> */}
      <AppShell.Main pt={rem(56)}>
        { login ?((session&& session.user && session.user.email)? children : <LoginRedirect/>) : children}
      </AppShell.Main>
      <AppShell.Footer className={showFooter? classes.footer : classes.footer + " " + classes.down}>{<AppFooter />}</AppShell.Footer>
    </AppShell>
  );
}


type Props = {
  children: React.ReactNode;
  navbar?: React.ReactElement;
  login?: Boolean
};