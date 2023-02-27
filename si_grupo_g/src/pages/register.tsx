import Head from 'next/head';
import React from 'react';

import Registration from '@/components/Registration';

export default function LoginScreen() {
  return (
    <>
      <Head>
        <title>Spa - Registo</title>
      </Head>
      <main>
        <Registration />
      </main>
    </>
  );
}
