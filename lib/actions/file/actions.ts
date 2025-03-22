export async function getFiles() {
	try {
		const response = await fetch(
			`${import.meta.env.PUBLIC_BACKEND_URL}/file`
		)

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`)
		}

		const data = await response.json()

		return data
	} catch (err) {
		console.error("Error fetching files:", err)
		throw err
	}
}