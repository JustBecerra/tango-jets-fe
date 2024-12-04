import { setCookie } from "../../../src/utils/setCookie"

interface Login {
	username: string
	password: string
}

export async function loginScheduler({ username, password }: Login) {
	try {
		// Fetch the login token
		const response = await fetch(
			`${import.meta.env.PUBLIC_BACKEND_URL}/scheduler/login`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ username, password }),
				credentials: "include", // Include credentials (cookies)
			}
		)

		if (!response.ok) {
			return {
				success: false,
				message: "Invalid credentials or error during login",
			}
		}

		const { token } = await response.json()

		const responseUserInfo = await fetch(
			`${import.meta.env.PUBLIC_BACKEND_URL}/scheduler`,
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
			}
		)

		if (!responseUserInfo.ok) {
			return {
				success: false,
				message: "Failed to fetch user information",
			}
		}

		const { username: userInfoUsername, role } =
			await responseUserInfo.json()

		setCookie("authToken", token, 1)
		setCookie("username", userInfoUsername, 1)
		setCookie("role", role, 1)

		return { success: true }
	} catch (err) {
		console.error("Login failed:", err)
		return { success: false, message: "Login failed. Please try again." }
	}
}
