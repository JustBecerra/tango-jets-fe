import TravelMap from "./TravelMap"
interface props {
	Coordinates: {
		latitude: string
		longitude: string
	}[]
}
export const MapCard = ({ Coordinates }: props) => {
	return (
		<div className="w-full sm:w-[50%] h-[800px] sm:h-full p-4 border-2 rounded flex flex-col items-center border-solid bg-white border-gray-300">
			<div className="flex justify-center items-center w-full">
				<p className="text-2xl mb-2">Trip route</p>
			</div>
			<TravelMap Coordinates={Coordinates} />
		</div>
	)
}
