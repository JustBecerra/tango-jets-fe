import { useRef, useEffect } from "react"
import jsPDF from "jspdf"

const SignatureCanva = ({ contractData, first_image, second_image }) => {
	const canvasRef = useRef(null)

	const drawContract = (ctx, baseImage, secondImage) => {
		const canvas = canvasRef.current
		if (!canvas) return

		// Clear the canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height)

		// Draw the first image on the canvas
		ctx.drawImage(baseImage, 0, 0, canvas.width, baseImage.height)

		// Draw the second image slightly overlapping the first image
		const overlapOffset = -10 // Adjust this value to control the overlap
		ctx.drawImage(
			secondImage,
			0,
			baseImage.height + overlapOffset, // Reduce the y position to create overlap
			canvas.width,
			secondImage.height
		)

		// Set up styles for the text
		ctx.fillStyle = "black" // Text color
		ctx.font = "20px Arial" // Font style

		// Write dynamic variables on top of the first image
		ctx.fillText(`Name: ${contractData.name}`, 50, 100) // Example: Name
		ctx.fillText(`Date: ${contractData.date}`, 50, 150) // Example: Date
		ctx.fillText(`Amount: $${contractData.price}`, 50, 200) // Example: Amount

		// Add more text as needed
		const terms = contractData.terms.split("\n")
		let y = 250 // Start rendering terms below the header
		const lineHeight = 24 // Adjust line height for spacing
		terms.forEach((line) => {
			ctx.fillText(line.trim(), 50, y)
			y += lineHeight // Move down for the next line
		})

		// Draw the writable area at the bottom 10% of the canvas
		const writableHeight = canvas.height * 0.1 // Bottom 10%
		const startX = 0
		const startY = canvas.height - writableHeight

		ctx.strokeStyle = "black"
		ctx.lineWidth = 1
		ctx.strokeRect(startX, startY, canvas.width, writableHeight) // Draw the border
	}

	useEffect(() => {
		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext("2d")
		if (!ctx) return

		const baseImage = new Image()
		const secondImage = new Image()

		let first_image_url
		if (typeof first_image.source.data === "string") {
			first_image_url = `data:image/jpeg;base64,${first_image.source.data}`
		} else {
			const first_blob = new Blob(
				[new Uint8Array(first_image.source.data)],
				{ type: "image/jpeg" }
			)
			first_image_url = URL.createObjectURL(first_blob)
		}

		let second_image_url
		if (typeof second_image.source.data === "string") {
			second_image_url = `data:image/jpeg;base64,${second_image.source.data}`
		} else {
			const second_blob = new Blob(
				[new Uint8Array(second_image.source.data)],
				{ type: "image/jpeg" }
			)
			second_image_url = URL.createObjectURL(second_blob)
		}

		baseImage.onload = () => {
			secondImage.onload = () => {
				canvas.width = Math.max(baseImage.width, secondImage.width)
				canvas.height = baseImage.height + secondImage.height
				drawContract(ctx, baseImage, secondImage)
			}
			secondImage.src = second_image_url // Start loading the second image
		}

		baseImage.src = first_image_url // Start loading the first image

		return () => {
			URL.revokeObjectURL(first_image_url)
			URL.revokeObjectURL(second_image_url)
		}
	}, [contractData])

	const clearSignature = () => {
		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext("2d")
		if (!ctx) return

		// Clear the entire canvas
		ctx.clearRect(0, 0, canvas.width, canvas.height)

		// Redraw the background images
		const baseImage = new Image()
		baseImage.src = "../src/components/ContractSign/Contrato_page-0001.jpg" // Replace with the actual path to your first image

		const secondImage = new Image()
		secondImage.src =
			"../src/components/ContractSign/Contrato_page-0002.jpg" // Replace with the actual path to your second image

		baseImage.onload = () => {
			secondImage.onload = () => {
				// Draw the first image
				ctx.drawImage(baseImage, 0, 0, canvas.width, baseImage.height)

				// Draw the second image below the first image
				ctx.drawImage(
					secondImage,
					0,
					baseImage.height,
					canvas.width,
					secondImage.height
				)
			}
		}
	}

	const downloadPDF = () => {
		const canvas = canvasRef.current
		if (!canvas) return

		const imgData = canvas.toDataURL("image/png")
		const pdf = new jsPDF({
			orientation: "portrait",
			unit: "px",
			format: [canvas.width, canvas.height],
		})

		pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height)
		pdf.save("contract_with_signature.pdf")
	}

	return (
		<div style={{ position: "relative", width: "100%", height: "100%" }}>
			<canvas
				ref={canvasRef}
				style={{
					border: "1px solid #000",
					display: "block",
					width: "100%",
					height: "auto",
				}}
			></canvas>
			<div
				style={{
					position: "absolute",
					bottom: "10px",
					left: "10px",
					zIndex: 10,
				}}
			>
				<button onClick={downloadPDF}>I Agree</button>
				<button onClick={clearSignature} style={{ marginLeft: "10px" }}>
					Clear
				</button>
			</div>
		</div>
	)
}

export default SignatureCanva
