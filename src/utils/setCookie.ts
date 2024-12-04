export function setCookie(name: string, value: string, days: number) {
	let expires = ""
	if (days) {
		const date = new Date()
		date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000)
		expires = `; expires=${date.toUTCString()}`
	}

	// Ensure the cookie is being set properly for cross-origin contexts
	document.cookie = `${name}=${
		value || ""
	}${expires}; path=/; SameSite=None; Secure;`
}
  