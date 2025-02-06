import Carousel from "./Carousel"
import type { Airship, Flight } from "../table/TableModal"

export interface ImagesType {
	dataValues: {
		id: number
		airship_id: number
		image: string
		typeof: string
	}
}

interface props {
	images: [ImagesType[]]
	storedAirshipData: Airship[]
	FlightData: Flight
}

export const PickAirship = ({
	images,
	storedAirshipData,
	FlightData,
}: props) => {
	return (
		<div className="w-full sm:w-[50%] h-full p-4  border-2 rounded border-solid bg-white border-gray-300">
			<div className="flex justify-center items-center w-full border-b-2 border-gray-300 border-solid">
				<p className="text-2xl mb-2">Aircraft</p>
			</div>
			<div className="h-full w-full flex flex-col items-center justify-center">
				<Carousel
					images={images}
					storedAirshipData={storedAirshipData}
					FlightData={FlightData}
				/>
			</div>
		</div>
	)
}
