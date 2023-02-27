import { NextRequest, NextResponse } from 'next/server'
const redirectToRoot = (request: NextRequest) => {
	return NextResponse.redirect(new URL('/', request.url))
}

const restrictedRoutesAuthenticated = ['/login', '/register']
const restrictedRoutesNotAuthenticated = ['/profile']

export const middleware = async (request: NextRequest) => {
	const { pathname } = request.nextUrl
	let isAuthenticated = false

	if (request.cookies.get('authentication')) {
		isAuthenticated = true
	}

	if (isAuthenticated) {
		if (restrictedRoutesAuthenticated.some((route) => pathname.startsWith(route))) {
			return redirectToRoot(request)
		}
	} else {
		if (restrictedRoutesNotAuthenticated.some((route) => pathname.startsWith(route))) {
			return redirectToRoot(request)
		}
	}
}

export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - api (API routes)
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 */
		'/((?!api|_next/static|_next/image|favicon.ico|images).*)',
	],
}
