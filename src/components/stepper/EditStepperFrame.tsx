import { useState } from "react"
import { VerticalStepper } from "./VerticalStepper"
import { EditForms } from "./EditForms"
import type { Flight } from "../table/TableModal"

interface props {
	flightRequested: Flight
}

export const EditStepperFrame = ({ flightRequested }: props) => {
	const [localPhase, setLocalPhase] = useState(flightRequested.phase)
	const [currentFlight, setCurrentFlight] = useState<Flight>(flightRequested)

	return (
		<div className="flex h-full justify-center items-center gap-8">
			<EditForms
				localPhase={localPhase}
				setLocalPhase={setLocalPhase}
				currentFlight={currentFlight}
				setCurrentFlight={setCurrentFlight}
			/>
			{currentFlight && <VerticalStepper phase={currentFlight.phase} />}
		</div>
	)
}
