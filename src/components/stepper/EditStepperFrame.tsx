import { useState, useEffect } from "react"
import { VerticalStepper } from "./VerticalStepper"
import { EditForms } from "./EditForms"
import type { Flight } from "../table/TableModal"
import { getFlightById } from "../../../lib/actions/flights/actions"

export const EditStepperFrame = ({ trip }: { trip: string }) => {
	const [localPhase, setLocalPhase] = useState<number>(3)
	const [currentFlight, setCurrentFlight] = useState<Flight>({} as Flight)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		if (!trip) {
			setError("Invalid trip ID")
			setLoading(false)
			return
		}

		const fetchFlight = async () => {
			try {
				const transformedTrip = parseInt(trip)

				const response = await getFlightById(transformedTrip)

				setCurrentFlight(response)
				setLocalPhase(response.phase)
			} catch (err: any) {
				setError(err.message)
			} finally {
				setLoading(false)
			}
		}

		fetchFlight()
	}, [trip])

	if (loading) return <p className="text-gray-300">Loading...</p>
	if (error) return <p className="text-red-500">{error}</p>

	return (
		<div className="flex h-full justify-center items-center gap-8">
			<div className="flex flex-col h-full justify-center items-start">
				<button
					type="button"
					className="focus:ring-4 focus:outline-none mb-2 focus:ring-blue-300 rounded-lg border text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
					onClick={() => (window.location.href = "/Trips")}
				>
					Back
				</button>
				<EditForms
					localPhase={localPhase}
					setLocalPhase={setLocalPhase}
					currentFlight={currentFlight}
					setCurrentFlight={setCurrentFlight}
				/>
			</div>
			{currentFlight && <VerticalStepper phase={currentFlight.phase} />}
		</div>
	)
}
