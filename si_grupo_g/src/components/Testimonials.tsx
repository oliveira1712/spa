import { useEffect, useState } from "react"

import Container from "@/components/Container"
import TestimonialsContainer from "./TestimonialsContainer"

import { Loading } from "@/components/Loading"
import Review from "@/models/api/Review"
import { getAllReviews } from "@/services/api/reviewsApi"

function Testimonials() {
	const [isLoading, setIsLoading] = useState<boolean>(true)
	const [ReviewsData, setReviewData] = useState<Review[]>([])

	useEffect(() => {
		getAllReviews()
			.then((result) => {
				setReviewData(result)
				setIsLoading(false)
			})
			.catch(() => {
				console.log("error")
			})
	}, [])

	return (
		<section
			id="testimonials"
			aria-labelledby="testimonials-title"
			className="min-h-[80vh] bg-slate-900 py-24"
		>
			<Container>
				<p className="pb-24 w-full mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl text-center">
					O que dizem os nossos clientes
				</p>
				<ul className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:gap-8 lg:max-w-none lg:grid-cols-3">
					{isLoading ? (
						<Loading />
					) : (
						<>
							{ReviewsData.map((review, index) => (
								<li key={index}>
									<ul className="space-y-6 sm:space-y-8">
										<TestimonialsContainer review={review} />
									</ul>
								</li>
							))}
						</>
					)}
				</ul>
			</Container>
		</section>
	)
}

export default Testimonials
