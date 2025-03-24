import type jsPDF from "jspdf"

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

export async function postFile(pdf: jsPDF, id: number) {
	try {
		const pdfBlob = pdf.output("blob")

		const formData = new FormData()
		formData.append("contract", pdfBlob, "document.pdf")

		const response = await fetch(
			`${import.meta.env.PUBLIC_BACKEND_URL}/file/${id}`,
			{
				method: "POST",
				body: formData,
			}
		)

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`)
		}

		const data = await response.json()
		return data
	} catch (err) {
		console.error("Error posting file:", err)
		throw err
	}
}
