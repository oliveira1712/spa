import { Transporter } from "nodemailer"
const nodemailer = require("nodemailer")

const email = process.env.EMAIL
const password = process.env.EMAIL_PASS

export const transporter: Transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: email,
		pass: password,
	},
})
