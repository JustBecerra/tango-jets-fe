import { useEffect, useState } from "react"
import {
	getAirshipImages,
	getAirshipsForInvoice,
} from "../../../lib/actions/airships/actions"
import Carousel from "./Carousel"
import type { Airship } from "../table/TableModal"

export interface ImagesType {
	dataValues: {
		id: number
		airship_id: number
		image: string
		typeof: string
	}
}

interface airshipObjects {
	airshipID: number
	revenue: number
}

interface props {
	airshipObjects: airshipObjects[]
	images: ImagesType[]
}

export const PickAirship = ({ images, airshipObjects }: props) => {
	const [airship, setAirship] = useState<Airship>()
	useEffect(() => {
		async function fetchImages() {
			const response = await getAirshipsForInvoice(["34", "34", "34"])
			setAirship(response[0].dataValues)
		}
		fetchImages()
	}, [])
	return (
		<div className="w-[50%] h-full p-4  border-2 rounded border-solid bg-white border-gray-300">
			<div className="flex justify-center items-center w-full border-b-2 border-gray-300 border-solid">
				<p className="text-2xl mb-2">Aircraft</p>
			</div>
			<div className="h-full w-full flex flex-col items-center justify-center">
				<Carousel images={images} items={airship} />
			</div>
		</div>
	)
}
