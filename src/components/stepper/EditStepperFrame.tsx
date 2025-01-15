import { useEffect, useState } from "react"
import { VerticalStepper } from "./VerticalStepper"
import { EditForms } from "./EditForms"
import type { Flight } from "../table/TableModal"
import { getFlightById } from "../../../lib/actions/flights/actions"

interface props {
	tripID: number
}

export const EditStepperFrame = ({ tripID }: props) => {
	const [localPhase, setLocalPhase] = useState(3)
	const [currentFlight, setCurrentFlight] = useState<Flight | null>(null)

	useEffect(() => {
		const fetchFlight = async () => {
			const flight = await getFlightById(tripID)
			setCurrentFlight(flight)
		}
		fetchFlight()
	}, [])
	return (
		<div className="flex h-full justify-center items-center gap-8">
			<EditForms
				localPhase={localPhase}
				setLocalPhase={setLocalPhase}
				currentFlight={currentFlight}
			/>
			{currentFlight && <VerticalStepper phase={currentFlight.phase} />}
		</div>
	)
}
