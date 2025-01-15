import React from "react"
import {
	getFlights,
	putCompletePhase,
} from "../../../lib/actions/flights/actions"
import useStore from "../../store/store"

interface props {
	phase: number
	setPhase: React.Dispatch<React.SetStateAction<number>>
	currentPhase: number
	currentFlightId: number
}

export const PhaseButtons = ({
	phase,
	setPhase,
	currentPhase,
	currentFlightId,
}: props) => {
	const { updateFlights } = useStore((state) => state)
	const handleCompletePhase = async (e: React.FormEvent) => {
		e.preventDefault()
		const nextPhase = phase + 1
		await putCompletePhase({ phase: nextPhase, id: currentFlightId })
		const flightsRequested = await getFlights()
		updateFlights(flightsRequested)
		window.location.reload()
	}

	return (
		<div className="w-[100%] flex justify-around">
			{phase > 1 && (
				<button
					type="button"
					className="focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
					onClick={(e) => {
						e.preventDefault()
						setPhase((prev) => prev - 1)
					}}
				>
					Back
				</button>
			)}

			{phase < 8 && (
				<button
					type="button"
					className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
					onClick={(e) => {
						e.preventDefault()
						setPhase((prev) => prev + 1)
					}}
				>
					Next Phase
				</button>
			)}

			{phase === currentPhase && (
				<button
					type="button"
					className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-green-600 hover:bg-green-700 focus:ring-green-800"
					onClick={handleCompletePhase}
				>
					Complete Phase
				</button>
			)}
		</div>
	)
}
