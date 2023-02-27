import jwt from 'jsonwebtoken'
import nookies, { parseCookies } from 'nookies'

const expiresIn: number = 30 //days
const JWT_KEY: string = process.env.JWT_KEY!

export function createToken(token: string) {
	nookies.set(null, 'authentication', token, {
		maxAge: expiresIn * 24 * 60 * 60 - 60,
		path: '/',
		//httpOnly: true,
	})
}

export function getIdToken() {
	const { authentication: token } = parseCookies()
	if (token) {
		try {
			return jwt.verify(token, JWT_KEY)
		} catch (error) {}
	}
	return null
}

export function destroyCookie(props: any) {
	nookies.destroy(props, 'authentication')
}
