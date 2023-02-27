import { RadioGroup, Switch } from '@headlessui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { Controller, useForm } from 'react-hook-form'
import { boolean, literal, string, z } from 'zod'
import { FormWrapper } from './FormWrapper'
import { FormData } from './MultiStepForm'

type PlanData = {
	plan: string
	annual_billing: boolean
	terms_conditions: boolean
}

const INITIAL_DATA: PlanData = {
	plan: '',
	annual_billing: false,
	terms_conditions: false,
}

const planTypes = ['STARTUP', 'BUSINESS', 'ENTERPRISE']

const schema = z.object({
	plan: string().refine((plan) => planTypes.includes(plan), { message: 'Selecione um plano' }),
	annual_billing: boolean(),
	terms_conditions: literal(true, {
		errorMap: () => ({ message: 'É necessário aceitar os Termos e Condições' }),
	}),
})

const plansTypes = [
	{
		id: 'STARTUP',
		name: 'Startup',
		priceMonthly: 9,
		priceYearly: 97.2,
		limit: 'Até 2 contas bancárias',
	},
	{
		id: 'BUSINESS',
		name: 'Business',
		priceMonthly: 15,
		priceYearly: 162,
		limit: 'Até 5 contas bancárias',
	},
	{
		id: 'ENTERPRISE',
		name: 'Enterprise',
		priceMonthly: 39,
		priceYearly: 421.2,
		limit: 'Até 12 contas bancárias',
	},
]

function classNames(...classes: any) {
	return classes.filter(Boolean).join(' ')
}

type PlanFormProps = {
	formStep: number
	setData: (values: Partial<FormData>) => void
	prevFormStep: () => void
	nextFormStep: () => void
}

export default function PlanChoosingForm({
	formStep,
	setData,
	prevFormStep,
	nextFormStep,
}: PlanFormProps) {
	const { register, control, handleSubmit, formState } = useForm({
		defaultValues: INITIAL_DATA,
		resolver: zodResolver(schema),
	})

	const { errors } = formState

	const handleSave = (formValues: Partial<FormData>) => {
		setData(formValues)
		nextFormStep()
	}

	return (
		<form onSubmit={handleSubmit(handleSave)} className={formStep === 2 ? '' : 'hidden'}>
			<FormWrapper hasColumn={false}>
				<Controller
					control={control}
					defaultValue=""
					name="plan"
					render={({ field }) => (
						<RadioGroup {...field}>
							<div className="relative bg-white rounded-md -space-y-px">
								{plansTypes.map((planType, planIdx) => (
									<RadioGroup.Option
										key={planType.id}
										value={planType.id}
										className={({ checked }) =>
											classNames(
												planIdx === 0 ? 'rounded-tl-md rounded-tr-md' : '',
												planIdx === plansTypes.length - 1 ? 'rounded-bl-md rounded-br-md' : '',
												checked ? 'bg-blue-50 border-blue-200 z-10' : 'border-gray-200',
												'relative border p-4 flex flex-col cursor-pointer md:pl-4 md:pr-6 md:grid md:grid-cols-3 focus:outline-none'
											)
										}
									>
										{({ checked }) => (
											<>
												<div className="flex items-center text-sm">
													<span
														className={classNames(
															checked
																? 'bg-blue-500 border-transparent'
																: 'bg-white border-gray-300',
															'h-4 w-4 rounded-full border flex items-center justify-center'
														)}
														aria-hidden="true"
													>
														<span className="rounded-full bg-white w-1.5 h-1.5" />
													</span>
													<RadioGroup.Label as="span" className="ml-3 font-medium text-gray-900">
														{planType.name}
													</RadioGroup.Label>
												</div>
												<RadioGroup.Description className="ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-center">
													<span
														className={classNames(
															checked ? 'text-blue-900' : 'text-gray-900',
															'font-medium'
														)}
													>
														€{planType.priceMonthly} / m
													</span>{' '}
													<span className={checked ? 'text-blue-700' : 'text-gray-500'}>
														(€{planType.priceYearly} / ano)
													</span>
												</RadioGroup.Description>
												<RadioGroup.Description
													className={classNames(
														checked ? 'text-blue-700' : 'text-gray-500',
														'ml-6 pl-1 text-sm md:ml-0 md:pl-0 md:text-right'
													)}
												>
													{planType.limit}
												</RadioGroup.Description>
											</>
										)}
									</RadioGroup.Option>
								))}
							</div>
							<div className="text-red-500">{errors.plan?.message}</div>
						</RadioGroup>
					)}
				/>
				<Controller
					control={control}
					name="annual_billing"
					defaultValue={false}
					render={({ field: { value, ...field } }) => (
						<>
							<Switch.Group as="div" className="flex items-center mt-4">
								<Switch
									{...field}
									checked={value}
									className={classNames(
										value ? 'bg-blue-500' : 'bg-gray-200',
										'relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer focus:outline-none  transition-colors ease-in-out duration-200'
									)}
								>
									<span
										aria-hidden="true"
										className={classNames(
											value ? 'translate-x-5' : 'translate-x-0',
											'inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200'
										)}
									/>
								</Switch>
								<Switch.Label as="span" className="ml-3">
									<span className="text-sm font-medium text-gray-900">Annual billing </span>
									<span className="text-sm text-gray-500">(Save 10%)</span>
								</Switch.Label>
								<div className="text-red-500">{errors.annual_billing?.message}</div>
							</Switch.Group>
						</>
					)}
				/>
				<div className="flex items-center mt-3 text-sm text-blue-100">
					<input
						id="terms-checkbox"
						type="checkbox"
						value=""
						className="appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 focus:outline-none focus:ring-offset-0 focus:ring-0 transition duration-200 cursor-pointer"
						{...register('terms_conditions')}
					/>
					<label htmlFor="terms-checkbox" className="ml-2 text-sm font-medium text-gray-500">
						Eu concordo com os{' '}
						<Link
							href="/terms-and-conditions"
							rel="noopener noreferrer"
							target="_blank"
							className="text-blue-600"
						>
							termos e condições
						</Link>
						.
					</label>
				</div>
				<div className="text-red-500">{errors.terms_conditions?.message}</div>
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
					Submeter
				</button>
			</div>
		</form>
	)
}
