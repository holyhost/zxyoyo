"use client"
import {
  AppShell
}
  from '@mantine/core';
import AppHeader from './AppHeader';
import { signOut, useSession } from 'next-auth/react';
import { AppFooter } from './AppFooter';
import classes from './HeaderMenu.module.css';
import LoginRedirect from '../LoginRedirect/LoginRedirect';

export function AppLayout({ children, navbar, login=false }: Props) {
  const { data: session } = useSession()
  return (
    <AppShell
      padding="md"
    >
      <AppShell.Header className={classes.header}>{<AppHeader />}</AppShell.Header>
      {/* <AppShell.Navbar>Navabar...</AppShell.Navbar> */}
      <AppShell.Main className={classes.mt2}>
        { login ?((session&& session.user && session.user.email)? children : <LoginRedirect/>) : children}
      </AppShell.Main>
      <AppShell.Footer>{<AppFooter />}</AppShell.Footer>
    </AppShell>
  );
}


type Props = {
  children: React.ReactNode;
  navbar?: React.ReactElement;
  login?: Boolean
};