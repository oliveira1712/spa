import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { string, z } from 'zod'
import { FormWrapper } from './FormWrapper'
import { FormData } from './MultiStepForm'

type CreditCardData = {
	cardNumber: string
	expirationDate: string
	cvc: string
}

const INITIAL_DATA: CreditCardData = {
	cardNumber: '',
	expirationDate: '',
	cvc: '',
}

type CreditCardFormProps = {
	formStep: number
	setData: (values: Partial<FormData>) => void
	prevFormStep: () => void
	nextFormStep: () => void
}

const stringRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/
const schema = z.object({
	cardNumber: string().refine((val) => Number(val) > 0 && val.length == 16, {
		message: 'Número do cartão de crédito não possui 16 digitos',
	}),
	expirationDate: string().regex(stringRegex, {
		message: 'Data de expiração inválida',
	}),
	cvc: string().refine((val) => Number(val) > 0 && val.length == 3, {
		message: 'CVC não possui 3 digitos',
	}),
})

export default function CreditCardForm({
	formStep,
	setData,
	prevFormStep,
	nextFormStep,
}: CreditCardFormProps) {
	const { register, handleSubmit, formState } = useForm({
		defaultValues: INITIAL_DATA,
		resolver: zodResolver(schema),
	})

	const { errors } = formState

	const handleSave = (formValues: Partial<FormData>) => {
		setData(formValues)
		nextFormStep()
	}

	return (
		<form onSubmit={handleSubmit(handleSave)} className={formStep === 1 ? '' : 'hidden'}>
			<FormWrapper>
				<div>
					<label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
						Número do cartão
					</label>
					<div className="mt-1">
						<input
							id="cardNumber"
							type="text"
							min={0}
							maxLength={16}
							{...register('cardNumber')}
							className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
						/>
						<div className="text-red-500">{errors.cardNumber?.message}</div>
					</div>
				</div>

				<div>
					<label htmlFor="expirationDate" className="block text-sm font-medium text-gray-700">
						Data de expiração (MM/AA)
					</label>
					<div className="mt-1">
						<input
							id="expirationDate"
							type="text"
							{...register('expirationDate')}
							className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
						/>
						<div className="text-red-500">{errors.expirationDate?.message}</div>
					</div>
				</div>

				<div>
					<label htmlFor="cvc" className="block text-sm font-medium text-gray-700">
						CVC
					</label>
					<div className="mt-1">
						<input
							id="cvc"
							type="text"
							min={0}
							maxLength={3}
							{...register('cvc')}
							className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
						/>
						<div className="text-red-500">{errors.cvc?.message}</div>
					</div>
				</div>
			</FormWrapper>
			<div className="mt-4 w-full justify-end inline-flex">
				<button
					type="button"
					className="justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
					onClick={prevFormStep}
				>
					Anterior
				</button>
				<button
					type="submit"
					className="ml-4 justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
				>
					Próximo
				</button>
			</div>
		</form>
	)
}
