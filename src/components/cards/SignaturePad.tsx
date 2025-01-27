import React, { useRef, useEffect } from "react"

const SignaturePad: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement | null>(null)

	useEffect(() => {
		console.log("SignaturePad component loaded")
		const canvas = canvasRef.current
		if (!canvas) return

		const ctx = canvas.getContext("2d")
		if (!ctx) return

		let drawing = false

		const resizeCanvas = () => {
			canvas.width = canvas.offsetWidth
			canvas.height = canvas.offsetHeight
		}

		resizeCanvas()
		window.addEventListener("resize", resizeCanvas)

		const startDrawing = (e: MouseEvent) => {
			drawing = true
			ctx.beginPath()
			ctx.moveTo(e.offsetX, e.offsetY)
		}

		const draw = (e: MouseEvent) => {
			if (!drawing) return
			ctx.lineTo(e.offsetX, e.offsetY)
			ctx.stroke()
		}

		const stopDrawing = () => {
			drawing = false
			ctx.closePath()
		}

		canvas.addEventListener("mousedown", startDrawing)
		canvas.addEventListener("mousemove", draw)
		canvas.addEventListener("mouseup", stopDrawing)
		canvas.addEventListener("mouseout", stopDrawing)

		return () => {
			window.removeEventListener("resize", resizeCanvas)
			canvas.removeEventListener("mousedown", startDrawing)
			canvas.removeEventListener("mousemove", draw)
			canvas.removeEventListener("mouseup", stopDrawing)
			canvas.removeEventListener("mouseout", stopDrawing)
		}
	}, [])

	return (
		<div>
			<canvas
				ref={canvasRef}
				style={{ border: "1px solid #000" }}
			></canvas>
		</div>
	)
}

export default SignaturePad
