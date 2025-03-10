interface pilotAssignmentProps {
	flight_id: number
	pilot_id: number
}

export async function getPilots() {
	try {
		const response = await fetch(
			`${import.meta.env.PUBLIC_BACKEND_URL}/pilots`
		)

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`)
		}

		const responseToken = await response.json()

		return responseToken
	} catch (err) {
		console.error("Error fetching pilots:", err)
		throw err
	}
}

export async function addPilot(pilotData: Record<string, any>) {
	try {
		const response = await fetch(
			`${import.meta.env.PUBLIC_BACKEND_URL}/pilot`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(pilotData),
			}
		)

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`)
		}

		const responseText = await response.text()
		const responseData = responseText ? JSON.parse(responseText) : {}

		return responseData
	} catch (err) {
		console.error("Error adding pilot:", err)
		throw err
	}
}

export async function assignPilot(pilotData: pilotAssignmentProps) {
	try {
		const response = await fetch(
			`${import.meta.env.PUBLIC_BACKEND_URL}/flight/pilot`,
			{
				method: "PATCH",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(pilotData),
			}
		)

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`)
		}

		const responseText = await response.text()
		const responseData = responseText ? JSON.parse(responseText) : {}

		return responseData
	} catch (err) {
		console.error("Error assigning pilot:", err)
		throw err
	}
}
