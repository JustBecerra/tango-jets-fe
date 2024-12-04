import type { APIContext } from "astro"
import { defineMiddleware } from "astro:middleware"

function parseCookies(cookieHeader: string) {
	if (!cookieHeader) return {}

	return Object.fromEntries(
		cookieHeader.split("; ").map((cookie) => cookie.split("="))
	)
}

export const onRequest = defineMiddleware((context: APIContext, next) => {
	const cookieHeader = context.request.headers.get("cookie")
	console.log("Cookies:", cookieHeader) // Log cookies to see if "authToken" is included

	const cookies = parseCookies(cookieHeader || "")
	const authToken = cookies.authToken
	console.log({ authToken })
	if (!authToken || authToken.length === 0) {
		return Response.redirect(new URL("/", context.url.origin), 302)
	}

	return next()
})
  
