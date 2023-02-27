import Head from 'next/head';
import React from 'react';

import Terms from '@/components/TermsAndConditions';

export default function TermsAndConditions() {
  return (
    <>
      <Head>
        <title>Spa - Termos e condições</title>
      </Head>
      <main className="mx-10 md:mx-32 xl:mx-60 2xl:mx-80">
        <Terms />
      </main>
    </>
  );
}
