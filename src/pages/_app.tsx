import React from 'react';
import { AppProps } from 'next/app';
import { SessionProvider } from 'next-auth/react';

import "../styles/globals.css";
import { Toaster } from 'react-hot-toast';

export default function App({
  Component,
  pageProps: {session, ...pageProps}
}: AppProps) {
  return (
      <SessionProvider session={session}>
        <Toaster/>
        <Component {...pageProps}/>
      </SessionProvider>
  )
}
