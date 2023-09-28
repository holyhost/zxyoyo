"use client"
import {
  AppShell
}
  from '@mantine/core';
import AppHeader from './AppHeader';
import { signOut } from 'next-auth/react';
import { AppFooter } from './AppFooter';
import classes from './HeaderMenu.module.css';

export function AppLayout({ children, navbar }: Props) {

  return (
    <AppShell
      padding="md"
    >
      <AppShell.Header className={classes.header}>{<AppHeader />}</AppShell.Header>
      {/* <AppShell.Navbar>Navabar...</AppShell.Navbar> */}
      <AppShell.Main className={classes.mt2}>{children}</AppShell.Main>
      <AppShell.Footer>{<AppFooter />}</AppShell.Footer>
    </AppShell>
  );
}


type Props = {
  children: React.ReactNode;
  navbar?: React.ReactElement;
};