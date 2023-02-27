import Head from 'next/head';
import React from 'react';

import Login from '@/components/Login';

export default function LoginScreen() {
  return (
    <>
      <Head>
        <title>SPA - Login</title>
      </Head>
      <main>
        <Login />
      </main>
    </>
  );
}
