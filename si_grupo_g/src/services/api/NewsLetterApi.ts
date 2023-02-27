import { NewsLetterFormSchemaType } from "@/components/NewsLetter"
import { MyAPI } from "@/services/MyAPI"

const base = "newsletters/"

export const addUserToNewsLetter = async (newsLetter: NewsLetterFormSchemaType) => {
	const response = await MyAPI()
		.post(`${base}`, newsLetter)
		.catch((error: any) => {
			throw new Error(error.response?.data?.message ?? "Failed to send email")
		})
	return response.data
}
