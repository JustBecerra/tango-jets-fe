import TravelMap from "./TravelMap"
interface props {
	first_latitude: string
	first_longitude: string
	second_latitude: string
	second_longitude: string
}
export const MapCard = ({
	first_latitude,
	first_longitude,
	second_latitude,
	second_longitude,
}: props) => {
	return (
		<div className="w-full sm:w-[50%] h-[800px] sm:h-full p-4 border-2 rounded flex flex-col items-center border-solid bg-white border-gray-300">
			<div className="flex justify-center items-center w-full border-b-2 border-gray-300 border-solid">
				<p className="text-2xl mb-2">Trip route</p>
			</div>
			<TravelMap
				first_latitude={first_latitude}
				first_longitude={first_longitude}
				second_latitude={second_latitude}
				second_longitude={second_longitude}
			/>
		</div>
	)
}
