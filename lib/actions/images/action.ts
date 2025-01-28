export async function getImages(id: string) {
	try {
		const response = await fetch(
			`${import.meta.env.PUBLIC_BACKEND_URL}/images/${parseInt(id)}`
		)

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`)
		}

		const data = await response.json()

		return data
	} catch (err) {
		console.error("Error fetching images:", err)
		throw err
	}
}
