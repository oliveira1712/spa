import { AuthContext } from '@/contexts/AuthContext'
import { createToken } from '@/services/Cookies'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { string, z } from 'zod'
import { FormWrapper } from './multiStepForm/FormWrapper'

type LoginData = {
	email: string
	password: string
}

const INITIAL_DATA: LoginData = {
	email: '',
	password: '',
}

const schema = z.object({
	email: string().email({ message: 'O email é inválido' }),
	password: string().min(4, {
		message: 'A palavra passe tem de possuir no mínimo 4 digitos',
	}),
})

export default function Login() {
	const { register, handleSubmit, formState } = useForm({
		defaultValues: INITIAL_DATA,
		resolver: zodResolver(schema),
	})

	const { signIn } = useContext(AuthContext)

	const router = useRouter()

	const { errors } = formState

	const handleSave = async (formValues: LoginData) => {
		const loginData = {
			email: formValues.email,
			password: formValues.password,
		}

		try {
			let token = await signIn(loginData)
			createToken(token)
			toast.success('Login efetuado com sucesso')
			router.push('/')
		} catch (error: any) {
			toast.error(error.message)
		}
	}

	return (
		<div className="h-full mx-auto flex w-full max-w-2xl flex-col px-4 sm:px-6">
			<div className="mt-12 sm:mt-16">
				<svg
					viewBox="0 0 1090 1090"
					aria-hidden="true"
					fill="none"
					preserveAspectRatio="none"
					className="max-h-full max-w-6xl mt-40 absolute -top-7 left-1/2 -z-10 -translate-x-1/2 stroke-gray-300/30 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:-top-9 sm:h-auto"
				>
					<circle cx="545" cy="545" r="544.5"></circle>
					<circle cx="545" cy="545" r="480.5"></circle>
					<circle cx="545" cy="545" r="416.5"></circle>
					<circle cx="545" cy="545" r="352.5"></circle>
				</svg>
				<h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Iniciar Sessão</h2>
				<p className="mt-3 text-center text-lg text-gray-600">
					Não possui conta?&nbsp;
					<Link href="/register">
						<span className="text-cyan-600">Registe-se&nbsp;</span>
					</Link>
					para um teste grátis.
				</p>
			</div>

			<div className="min-h-full flex flex-col justify-center pt-2 pb-12 sm:px-6 lg:px-8">
				<div className="mt-8 bg-white sm:mx-auto sm:w-full sm:max-w-xl sm:rounded-lg">
					<div className=" py-8 px-4 shadow  sm:px-10">
						<form onSubmit={handleSubmit(handleSave)}>
							<FormWrapper hasColumn={false}>
								<div>
									<label htmlFor="email" className="block text-sm font-medium text-gray-700">
										Email
									</label>
									<div className="mt-1">
										<input
											id="email"
											type="email"
											{...register('email')}
											className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
										/>
										<div className="text-red-500">{errors.email?.message}</div>
									</div>
								</div>

								<div>
									<label
										htmlFor="password"
										className="block text-sm font-medium mt-4 text-gray-700"
									>
										Palavra Passe
									</label>
									<div className="mt-1">
										<input
											id="password"
											type="password"
											{...register('password')}
											className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
										/>
										<div className="text-red-500">{errors.password?.message}</div>
									</div>
								</div>
							</FormWrapper>
							<div className="mt-4 w-full justify-end inline-flex">
								<button
									type="submit"
									className="w-2/5 ml-4 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
								>
									Iniciar Sessão
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
