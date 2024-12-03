import { setCookie } from "../../../src/utils/setCookie"

interface Login {
	username: string
	password: string
}

export async function loginScheduler({ username, password }: Login) {
	const responseToken = await fetch(
		`${import.meta.env.PUBLIC_BACKEND_URL}/scheduler/login`,
		{
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ username, password }),
		}
	).then((response) => response.json())

	const responseUserInfo = await fetch(
		`${import.meta.env.PUBLIC_BACKEND_URL}/scheduler`,
		{
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${responseToken.token}`,
			},
		}
	).then((response) => response.json())

	try {
		const token = responseToken.token
		const username = responseUserInfo.username
		const role = responseUserInfo.role
		setCookie("authToken", token, 1)
		setCookie("username", username, 1)
		setCookie("role", role, 1)

		return responseToken
	} catch (err) {
		console.error(err)
	}
}
