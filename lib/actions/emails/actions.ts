interface props {
	to: FormDataEntryValue
	url: string
	type_of_email: string
	subject: string
}

export async function sendEmail(flightData: props) {
	try {
		const response = await fetch(
			`${import.meta.env.PUBLIC_BACKEND_URL}/email`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(flightData),
			}
		)

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`)
		}

		// Verificar si la respuesta tiene contenido antes de intentar parsear como JSON
		const responseText = await response.text()
		const responseData = responseText ? JSON.parse(responseText) : {}

		return responseData
	} catch (err) {
		console.error("Error adding flight:", err)
		throw err
	}
}
