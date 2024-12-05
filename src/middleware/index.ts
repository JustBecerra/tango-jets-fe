// import type { APIContext } from "astro"
// import { defineMiddleware } from "astro:middleware"

// function parseCookies(cookieHeader: string) {
// 	if (!cookieHeader) return {}

// 	return Object.fromEntries(
// 		cookieHeader.split("; ").map((cookie) => cookie.split("="))
// 	)
// }

// export const onRequest = defineMiddleware((context: APIContext, next) => {
// 	if (context.url.pathname !== "/") {
// 		const cookieHeader = context.request.headers.get("cookie")
// 		const cookies = parseCookies(cookieHeader || "")
// 		console.log({ cookies })
// 		const authToken = cookies.authToken

// 		if (!authToken || authToken.length === 0) {
// 			return Response.redirect(new URL("/", context.url), 302)
// 		}
// 	}

// 	return next()
// })
