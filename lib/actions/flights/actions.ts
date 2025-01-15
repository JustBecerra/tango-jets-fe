interface phaseProps {
	id: number
	phase: number
}

export async function getFlights() {
	try {
		const response = await fetch(
			`${import.meta.env.PUBLIC_BACKEND_URL}/flights`
		)

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`)
		}

		const data = await response.json()

		return data
	} catch (err) {
		console.error("Error fetching flights:", err)
		throw err
	}
}

export async function putCompletePhase({ id, phase }: phaseProps) {
	try {
		const response = await fetch(
			`${import.meta.env.PUBLIC_BACKEND_URL}/flight/phase/${id}/${phase}`,
			{
				method: "PUT",
			}
		)

		if (!response.ok) {
			throw new Error(`Failed to complete phase: ${response.statusText}`)
		}

		return response.ok
	} catch (err) {
		console.error("error completing phase", err)
		return { error: err }
	}
}

export async function getFlightById(id: number) {
	try {
		const response = await fetch(
			`${import.meta.env.PUBLIC_BACKEND_URL}/flight/${id}`
		)

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`)
		}

		const data = await response.json()

		return data
	} catch (err) {
		console.error(`Error fetching flight #${id}`, err)
		throw err
	}
}

export async function addFlight(flightData: Record<string, any>) {
	try {
		const response = await fetch(
			`${import.meta.env.PUBLIC_BACKEND_URL}/flight`,
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

export async function deleteFlight(id: number) {
	try {
		const response = await fetch(
			`${import.meta.env.PUBLIC_BACKEND_URL}/flight/${id}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}
		)

		return response
	} catch (err) {
		console.error("Error adding flight:", err)
		throw err
	}
}
