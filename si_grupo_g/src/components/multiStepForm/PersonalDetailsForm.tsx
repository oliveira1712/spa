import { getSalesByCustomer } from '@/services/api/commercialSalesApi'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { string, z } from 'zod'
import { FormWrapper } from './FormWrapper'
import { FormData } from './MultiStepForm'

type PersonalData = {
	name: string
	email: string
	password: string
	confirmPassword: string
	nif: string
	phoneNumber: string
}

const INITIAL_DATA: PersonalData = {
	name: '',
	email: '',
	password: '',
	confirmPassword: '',
	nif: '',
	phoneNumber: '',
}

type PersonalFormProps = {
	formStep: number
	setData: (values: Partial<FormData>) => void
	nextFormStep: () => void
}

function getRegexPassword(
	numberLowerCases: number = 1,
	numberUpperCases: number = 1,
	numberNumbers: number = 1,
	numberSpecialCharacters: number = 1,
	sizePassword: number = 8
): RegExp {
	return new RegExp(
		`^(?=(.*[a-z]){${numberLowerCases},})(?=(.*[A-Z]){${numberUpperCases},})(?=(.*[0-9]){${numberNumbers},})(?=(.*[!@#$%^&*()\-__+.]){${numberSpecialCharacters},}).{${sizePassword},}$`
	)
}

const schema = z
	.object({
		name: string().min(1, { message: 'O nome é inválido' }),
		email: string().email({ message: 'O email é inválido' }),
		password: string().regex(getRegexPassword(), {
			message:
				'Palavra passe inválida (8 caracteres, incluir número, caractere especial, letra maiúscula e letra minúscula)',
		}),
		confirmPassword: string().regex(getRegexPassword(), {
			message:
				'Palavra passe inválida (8 caracteres, incluir número, caractere especial, letra maiúscula e letra minúscula)',
		}),
		nif: string().refine((val) => Number(val) > 0 && val.length == 9, {
			message: 'Formato do NIF inválido',
		}),
		phoneNumber: string().refine((val) => Number(val) > 0 && val.length == 9, {
			message: 'Número de telemóvel inválido',
		}),
	})
	.refine((data) => data.password === data.confirmPassword, {
		path: ['confirmPassword'],
		message: 'A palavra passe e a confirmação não são iguais',
	})

export default function PersonalDetailsForm({
	formStep,
	setData,
	nextFormStep,
}: PersonalFormProps) {
	const { register, handleSubmit, formState } = useForm({
		defaultValues: INITIAL_DATA,
		resolver: zodResolver(schema),
	})

	const { errors } = formState

	const handleSave = async (formValues: PersonalData) => {
		setData(formValues)
		if (await getSalesByCustomer(formValues.nif)) {
			nextFormStep()
		} else {
			toast.error('Paga o que deves, Caloteiro!')
		}
	}

	return (
		<form onSubmit={handleSubmit(handleSave)} className={formStep === 0 ? '' : 'hidden'}>
			<FormWrapper>
				<div>
					<label htmlFor="name" className="block text-sm font-medium text-gray-700">
						Nome
					</label>
					<div className="mt-1">
						<input
							id="name"
							type="text"
							{...register('name')}
							className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
						/>
						<div className="text-red-500">{errors.name?.message}</div>
					</div>
				</div>

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
					<label htmlFor="nif" className="block text-sm font-medium text-gray-700">
						NIF
					</label>
					<div className="mt-1">
						<input
							id="nif"
							type="text"
							min={0}
							maxLength={9}
							{...register('nif')}
							className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
						/>
						<div className="text-red-500">{errors.nif?.message}</div>
					</div>
				</div>

				<div>
					<label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
						Contacto telefónico
					</label>
					<div className="mt-1">
						<input
							id="phoneNumber"
							type="text"
							min={0}
							maxLength={9}
							{...register('phoneNumber')}
							className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
						/>
						<div className="text-red-500">{errors.phoneNumber?.message}</div>
					</div>
				</div>

				<div>
					<label htmlFor="password" className="block text-sm font-medium text-gray-700">
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

				<div>
					<label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
						Confirmar Palavra Passe
					</label>
					<div className="mt-1">
						<input
							id="confirmPassword"
							type="password"
							{...register('confirmPassword')}
							className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
						/>
						<div className="text-red-500">{errors.confirmPassword?.message}</div>
					</div>
				</div>
			</FormWrapper>
			<div className="mt-4 w-full justify-end inline-flex">
				<button
					type="submit"
					className=" ml-4 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
				>
					Próximo
				</button>
			</div>
		</form>
	)
}
