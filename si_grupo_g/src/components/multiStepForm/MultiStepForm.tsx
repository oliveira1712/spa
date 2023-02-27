import { AuthContext } from '@/contexts/AuthContext'
import { createToken } from '@/services/Cookies'
import { useRouter } from 'next/router'
import { useContext, useState } from 'react'
import toast from 'react-hot-toast'
import Steps from '../Steps'
import CreditCardForm from './CreditCardForm'
import PersonalDetailsForm from './PersonalDetailsForm'
import PlanChoosingForm from './PlanChoosingForm'

export type FormData = {
	name: string
	email: string
	password: string
	confirmPassword: string
	nif: string
	phoneNumber: string
	cardNumber: string
	expirationDate: string
	cvc: string
	plan: string
	annual_billing: boolean
	terms_conditions: boolean
}

const INITIAL_DATA: FormData = {
	name: '',
	email: '',
	password: '',
	confirmPassword: '',
	nif: '',
	phoneNumber: '',
	cardNumber: '',
	expirationDate: '',
	cvc: '',
	plan: '',
	annual_billing: false,
	terms_conditions: false,
}

export default function MultiStepForm() {
	const router = useRouter()
	const { register } = useContext(AuthContext)

	const [data, setData] = useState(INITIAL_DATA)
	const [formStep, setFormStep] = useState(0)

	const nextFormStep = () => setFormStep((currentStep) => currentStep + 1)

	const prevFormStep = () => setFormStep((currentStep) => currentStep - 1)

	const setFormValues = (values: Partial<FormData>) => {
		setData((prevValues) => ({
			...prevValues,
			...values,
		}))
	}

	async function save() {
		console.log(data)
		const registrationData = {
			name: data.name,
			email: data.email,
			password: data.password,
			nif: data.nif,
			numberPhone: data.phoneNumber,
			cardNumber: data.cardNumber,
			expiryDateCard: data.expirationDate,
			cvc: data.cvc,
			plan: data.plan,
			annual_billing: data.annual_billing,
		}

		try {
			let token = await register(registrationData)
			createToken(token)
			toast.success('Registo efetuado com sucesso')
			router.push('/')
		} catch (error: any) {
			console.log(error.message)
			//toast.error(error.message)
		}
	}

	return (
		<div className="min-h-full flex flex-col justify-center pt-2 pb-12 sm:px-6 lg:px-8">
			<div className="mt-8 bg-white sm:mx-auto sm:w-full sm:max-w-xl sm:rounded-lg">
				<Steps currentStep={formStep} />
				<div className=" py-8 px-4 shadow  sm:px-10">
					{formStep >= 0 && (
						<PersonalDetailsForm
							key={1}
							formStep={formStep}
							setData={setFormValues}
							nextFormStep={nextFormStep}
						/>
					)}
					{formStep >= 1 && (
						<CreditCardForm
							key={2}
							formStep={formStep}
							setData={setFormValues}
							prevFormStep={prevFormStep}
							nextFormStep={nextFormStep}
						/>
					)}
					{formStep >= 2 && (
						<PlanChoosingForm
							key={3}
							formStep={formStep}
							setData={setFormValues}
							prevFormStep={prevFormStep}
							nextFormStep={nextFormStep}
						/>
					)}
					{formStep > 2 &&
						(save(),
						(
							<PlanChoosingForm
								key={4}
								formStep={formStep}
								setData={setFormValues}
								prevFormStep={prevFormStep}
								nextFormStep={nextFormStep}
							/>
						))}
				</div>
			</div>
		</div>
	)
}
