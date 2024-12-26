import { useState, useEffect } from "react"

export const RouteGuard = ({ children }: any) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false)

	useEffect(() => {
		const authToken = document.cookie.includes("authToken")

		if (!authToken) {
			window.location.href = "/" // Simple redirect
		} else {
			setIsAuthenticated(true)
		}
	}, [])

	return isAuthenticated ? <>{children}</> : null
}
