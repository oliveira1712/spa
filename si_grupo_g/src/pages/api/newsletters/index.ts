import { NextApiRequest, NextApiResponse } from "next"

import { NewsLetterFormSchemaType } from "@/components/NewsLetter"
import { Method } from "@/models/api/Method"
import { transporter } from "@/services/nodemailer"
import { prisma } from "@/services/prisma"

interface NewsLetterWithEmailTemplate extends NewsLetterFormSchemaType {
	emailTemplate: string
}

export default async function addUserToNewsLetter(req: NextApiRequest, res: NextApiResponse) {
	const method = req.method
	const data: NewsLetterWithEmailTemplate = req.body
	const emailExists = await prisma.newsLetters.findUnique({ where: { email: data.email } })

	if (method != Method.POST) {
		return res.status(405).json({ error: `Method ${method} Not Allowed` })
	}
	if (!data.email || !data.terms) {
		return res.status(400).json({ message: "Bad request" })
	}
	if (emailExists) {
		return res.status(400).json({ message: "Já subscreveu a NewsLetter" })
	}

	try {
		const requests = []
		requests.push(
			transporter.sendMail({
				from: process.env.EMAIL,
				to: data.email,
				subject: "NewsLetter",
				text: "Bem-vindo à SPA NewsLetter",
				html: data.emailTemplate,
			})
		)

		requests.push(prisma.newsLetters.create({ data: { email: data.email } }))

		Promise.all(requests)

		return res.status(200).json({ success: true })
	} catch (error: any) {
		console.log(error)
		return res.status(400).json({ message: error.message })
	}
}
