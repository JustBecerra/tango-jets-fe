import TravelMap from "./TravelMap"

export const MapCard = () => {
	return (
		<div className="w-full sm:w-[50%] h-[800px] sm:h-full p-4 border-2 rounded flex flex-col items-center border-solid bg-white border-gray-300">
			<div className="flex justify-center items-center w-full border-b-2 border-gray-300 border-solid">
				<p className="text-2xl mb-2">Trip route</p>
			</div>
			<TravelMap />
		</div>
	)
}
