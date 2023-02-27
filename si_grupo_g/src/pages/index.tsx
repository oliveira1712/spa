import { Hero } from '@/components/Hero'
import Head from 'next/head'

import Faqs from '@/components/Faqs'
import Features from '@/components/Features'
import NewsLetter from '@/components/NewsLetter'
import Pricing from '@/components/Pricing'
import Testimonials from '@/components/Testimonials'

export default function Home() {
	return (
		<>
			<Head>
				<title>Spa</title>
			</Head>
			<main>
				<Hero />
				<Pricing />
				<Features />
				<Testimonials />
				<Faqs />
				<NewsLetter />
			</main>
		</>
	)
}
