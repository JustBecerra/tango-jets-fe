interface deleteProps {
	id: number
	caseType: string
}

export async function deleteAction({ caseType, id }: deleteProps) {
	try {
		const response = await fetch(
			`${import.meta.env.PUBLIC_BACKEND_URL}/${caseType}/${id}`,
			{
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
			}
		)

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`)
		}

		return response
	} catch (err) {
		console.error("Error deleting element:", err)
		throw err
	}
}
