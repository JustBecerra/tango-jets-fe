import Carousel from "./Carousel"
import type { Airship, Flight } from "../table/TableModal"

export interface ImagesType {
	dataValues: {
		id: number
		airship_id: number
		image: string
		typeof: string
		original_name: string
	}
}

interface props {
	images: [ImagesType[]]
	storedAirshipData: Airship[]
	FlightData: Flight
	airshipObjects: {
		airshipID: number
		revenue: number
		cost: number
	}[]
	setReFetchedFlight: React.Dispatch<React.SetStateAction<Flight | null>>
	reFetchedFlight: Flight | null
	setStoredAirshipData: React.Dispatch<React.SetStateAction<Airship[]>>
}

export const PickAirship = ({
	images,
	storedAirshipData,
	FlightData,
	airshipObjects,
	setReFetchedFlight,
	reFetchedFlight,
	setStoredAirshipData,
}: props) => {
	return (
		<div className="w-full sm:w-[50%] h-full p-4  border-2 rounded border-solid bg-white border-gray-300">
			<div className="flex justify-center items-center w-full">
				<p className="text-2xl mb-2">Aircraft options</p>
			</div>
			<div className="h-fit w-full flex flex-col items-center justify-center">
				<Carousel
					images={images}
					storedAirshipData={storedAirshipData}
					FlightData={FlightData}
					airshipObjects={airshipObjects}
					setReFetchedFlight={setReFetchedFlight}
					reFetchedFlight={reFetchedFlight}
					setStoredAirshipData={setStoredAirshipData}
				/>
			</div>
		</div>
	)
}
