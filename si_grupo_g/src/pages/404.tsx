import Link from 'next/link';
import Image from 'next/image';

import Head from 'next/head';

export default function NotFound() {
  return (
    <>
      <Head>
        <title>Spa - 404</title>
      </Head>
      <main className="h-screen flex items-center justify-center">
        <div className="m-auto max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex-shrink-0 flex justify-center">
            <Link href="/" passHref>
              <button className="inline-flex">
                <Image
                  src="/favicon.ico"
                  alt="me"
                  className="object-cover h-12 w-auto"
                  width="0"
                  height="0"
                  sizes="50vw"
                />
              </button>
            </Link>
          </div>
          <div className="py-5">
            <div className="text-center">
              <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                404 erro
              </p>
              <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                Página não encontrada.
              </h1>
              <p className="mt-2 text-base text-gray-500">
                Desculpe, não encontramos a página que está a procura.
              </p>
              <div className="mt-6">
                <Link href="/" passHref>
                  <button className="text-base font-medium text-indigo-600 hover:text-indigo-500">
                    Voltar para a home<span aria-hidden="true"> &rarr;</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
