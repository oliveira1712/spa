import Dashboard from '@/components/Dashboard';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <title>Spa - Perfil</title>
      </Head>
      <main>
        <Dashboard />
      </main>
    </>
  );
}
