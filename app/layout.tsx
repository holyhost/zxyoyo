import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@/styles/global.css';
import '@mantine/spotlight/styles.css';
import '@mantine/dates/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { theme } from '../theme';
import UserProvider from '@/components/provider/UserProvider';

export const metadata = {
  title: '只想优优',
  description: '古诗词，技术文章分享',
};

export default function RootLayout({ children }: { children: any }) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <UserProvider session={undefined}>
          <MantineProvider theme={theme}>
          <Notifications position='top-center' autoClose={2000}/>
            {children}
          </MantineProvider>
        </UserProvider>
        
      </body>
    </html>
  );
}
