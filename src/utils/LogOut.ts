export function LogOut() {
	document.cookie =
		"authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure"
	document.cookie =
		"username=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure"
	document.cookie =
		"role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=None; Secure"
}
