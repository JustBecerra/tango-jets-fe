// src/pages/api/login.ts
import { loginScheduler } from "../../../lib/actions/login/actions"

export const config = {
	runtime: "edge", // Optional, use if deploying as an Edge function
}

export default async function handler(req: Request) {
	if (req.method === "POST") {
		try {
			// Get data from the request body (email and password)
			const { username, password } = await req.json()

			// Call your login logic
			const login = await loginScheduler({ username, password })

			// Check if login was successful
			if (login?.success) {
				// Set an authentication token in the response cookies
				const authToken = "your_generated_token" // Example, replace with actual token logic
				return new Response("Authenticated", {
					status: 200,
					headers: {
						"Set-Cookie": `authToken=${authToken}; Path=/; HttpOnly; Secure; SameSite=Strict`, // Secure cookie
					},
				})
			} else {
				return new Response("Invalid credentials", { status: 401 })
			}
		} catch (error) {
			console.error("Login error:", error)
			return new Response("An error occurred during login", {
				status: 500,
			})
		}
	} else {
		return new Response("Method Not Allowed", { status: 405 })
	}
}
