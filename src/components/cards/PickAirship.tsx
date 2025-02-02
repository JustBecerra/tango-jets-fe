import { useEffect, useState } from "react"
import {
	getAirshipImages,
	getAirshipsForInvoice,
} from "../../../lib/actions/airships/actions"

interface ImagesType {}

export const PickAirship = () => {
	const [images, setImages] = useState<string>("")
	console.log("asdasd")
	useEffect(() => {
		async function fetchImages() {
			// const response = await getAirshipsForInvoice(["34", "34", "34"])
			// const data = await response.json()
			const images = await getAirshipImages("34")
			const singleImage = images[0].dataValues.image
			// const imageSrc = `data:image/png;base64,${singleImage}`
			setImages(singleImage)
			console.log(singleImage)
		}
		fetchImages()
	}, [])
	return (
		<div className="w-[50%] h-full p-4  border-2 rounded border-solid bg-white border-gray-300">
			<div className="flex justify-center items-center w-full border-b-2 border-gray-300 border-solid">
				<p className="text-2xl mb-2">Aircraft</p>
			</div>
			<div className="h-full w-full flex items-center justify-center">
				{/* {images.map((image: ImagesType, index: number) => <img src={image.} />)} */}
				<img src={images} width={400} height={400} alt="" />
			</div>
		</div>
	)
}
