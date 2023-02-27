import { addUserToNewsLetter } from '@/services/api/NewsLetterApi'
import { zodResolver } from '@hookform/resolvers/zod'
import { render } from '@react-email/render'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { z } from 'zod'
import { Loading } from './Loading'
import NewsLetterTemplate from './emailTemplates/newsLetterTemplate'

const FormSchema = z.object({
	email: z.string().email({ message: 'É necessário o email ser válido' }),
	terms: z.literal(true, {
		errorMap: () => ({ message: 'É necessário aceitar os Termos e Condições' }),
	}),
})

export type NewsLetterFormSchemaType = z.infer<typeof FormSchema>

export default function NewsLetter() {
	const router = useRouter()

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isSubmitting },
	} = useForm<NewsLetterFormSchemaType>({
		resolver: zodResolver(FormSchema),
	})

	const emailHtml = render(<NewsLetterTemplate />)

	const onSubmit: SubmitHandler<NewsLetterFormSchemaType> = async (data) => {
		const newsLetterData = {
			...data,
			emailTemplate: emailHtml,
		}

		try {
			await addUserToNewsLetter(newsLetterData)
			reset()
			toast.success('Subscreveu a Newsletter com Sucesso')
		} catch (error: any) {
			toast.error(error.message)
		}
	}

	return (
		<div className="bg-white">
			<div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:py-16 lg:px-8">
				<div className="py-10 px-6 bg-slate-900 rounded-3xl sm:py-16 sm:px-12 lg:p-20 lg:flex lg:items-center">
					<div className="lg:w-0 lg:flex-1">
						<h2 className="text-3xl font-extrabold tracking-tight text-white">
							Inscreva-se na nossa newsletter
						</h2>
						<p className="mt-4 max-w-3xl text-lg text-indigo-100">
							A nossa newsletter é a melhor forma de manter-se em contacto connosco e ser o primeiro
							a saber sobre novos produtos, eventos e promoções.
						</p>
					</div>
					<div className="mt-12 sm:w-full sm:max-w-md lg:mt-0 lg:ml-8 lg:flex-1">
						<form onSubmit={handleSubmit(onSubmit)}>
							<div className="sm:flex">
								<label htmlFor="email-address" className="sr-only">
									Email address
								</label>
								<input
									id="email-address"
									type="text"
									className="w-full border-white px-5 py-3 placeholder-gray-500 outline-none focus:outline-none focus:ring-1 focus:ring-offset-1 focus:ring-offset-sky-700 rounded-md"
									placeholder="Insira o seu email"
									{...register('email')}
									disabled={isSubmitting}
								/>

								<button
									type="submit"
									className="mt-3 w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-slate-700 hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-700 focus:ring-sky-700 sm:mt-0 sm:ml-3 sm:w-auto sm:flex-shrink-0"
									disabled={isSubmitting}
								>
									{isSubmitting ? <Loading /> : 'Subscrever'}
								</button>
							</div>
							{errors.email && <p className="text-sm text-red-700 mt-1">{errors.email.message}</p>}

							<div className="flex items-center mt-3 text-sm text-indigo-100">
								<input
									id="terms-checkbox"
									type="checkbox"
									value=""
									className="appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 cursor-pointer"
									{...register('terms')}
									disabled={isSubmitting}
								/>
								<label htmlFor="terms-checkbox" className="ml-2 text-sm font-medium text-gray-200">
									Eu concordo com os{' '}
									<Link
										href="/terms-and-conditions"
										className="text-blue-600"
										rel="noopener noreferrer"
										target="_blank"
									>
										termos e condições
									</Link>
									.
								</label>
							</div>
							{errors.terms && <p className="text-sm text-red-700 mt-1">{errors.terms.message}</p>}
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
