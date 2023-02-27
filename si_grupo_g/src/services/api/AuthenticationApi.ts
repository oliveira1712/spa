import { MyAPI } from '../MyAPI'

type registrationData = {
	name: string
	email: string
	password: string
	nif: string
	numberPhone: string
	cardNumber: string
	expiryDateCard: string
	cvc: string
	plan: string
	annual_billing: boolean
}

export type loginData = {
	email: string
	password: string
}

export const registration = async (data: registrationData) => {
	const response = await MyAPI()
		.post(`authentication/regist`, data)
		.catch((error: any) => {
			throw new Error(
				error.response?.data?.message ?? 'Something went wrong while performing registration'
			)
		})
	return response.data
}

export const authenticate = async (data: loginData) => {
	const response = await MyAPI()
		.post(`authentication/login`, data)
		.catch((error: any) => {
			throw new Error(
				error.response?.data?.message ?? 'Something went wrong while performing login'
			)
		})
	return response.data
}
