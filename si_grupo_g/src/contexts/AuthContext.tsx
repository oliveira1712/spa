import { destroyCookie } from '@/services/Cookies'
import { authenticate, loginData, registration } from '@/services/api/AuthenticationApi'
import { useRouter } from 'next/router'
import { parseCookies } from 'nookies'
import { createContext, useEffect, useState } from 'react'

interface AuthContextType {
	isAuthenticated: boolean
	signIn: (data: loginData) => Promise<string>
	signOut: () => void
	register: (data: any) => Promise<string>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: any) {
	const router = useRouter()
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

	useEffect(() => {
		const { authentication: authenticationToken } = parseCookies()

		if (authenticationToken) {
			setIsAuthenticated(true)
		}
	}, [])

	const signIn = async (data: loginData) => {
		try {
			const { token } = await authenticate(data)
			setIsAuthenticated(true)
			return token
		} catch (error: any) {
			throw new Error(error)
		}
	}

	const register = async (data: any) => {
		try {
			const { token } = await registration(data)
			setIsAuthenticated(true)
			return token
		} catch (error: any) {
			throw new Error(error)
		}
	}

	const signOut = () => {
		destroyCookie(AuthContext)
		setIsAuthenticated(false)
		router.push('/')
	}

	return (
		<AuthContext.Provider value={{ isAuthenticated, signIn, signOut, register }}>
			{children}
		</AuthContext.Provider>
	)
}
