import { useState } from "react"
import { VerticalStepper } from "./VerticalStepper"
import { EditForms } from "./EditForms"
import type { Flight } from "../table/TableModal"

interface props {
	currentFlight: Flight
}

export const EditStepperFrame = ({ currentFlight }: props) => {
	const [localPhase, setLocalPhase] = useState(currentFlight.phase)
	return (
		<div className="flex h-full justify-center items-center gap-8">
			<EditForms
				localPhase={localPhase}
				setLocalPhase={setLocalPhase}
				currentFlight={currentFlight}
			/>
			<VerticalStepper phase={currentFlight.phase} />
		</div>
	)
}
