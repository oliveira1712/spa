import { Footer } from '@/components/Footer'
import GoogleAnalytics from '@/components/GoogleAnalytics'
import { Header } from '@/components/Header'
import '@/styles/globals.scss'
import type { AppProps } from 'next/app'

import '@/styles/globals.scss'

import CustomerSupportChat from '@/components/CustomerSupportChat'
import { AuthProvider } from '@/contexts/AuthContext'
import '@/styles/globals.scss'
import NextNProgress from 'nextjs-progressbar'
import { Toaster } from 'react-hot-toast'

import '@/styles/globals.scss'

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<GoogleAnalytics />
			<NextNProgress
				color="#0F172A"
				startPosition={0.3}
				stopDelayMs={200}
				height={5}
				showOnShallow={true}
			/>
			<AuthProvider>
				<div className="flex flex-col min-h-screen h-full">
					<Toaster position="top-center" reverseOrder={true} />
					<Header />
					<div className="flex-grow">
						<Component {...pageProps} />
					</div>
					<Footer />
					<CustomerSupportChat />
				</div>
			</AuthProvider>
		</>
	)
}
