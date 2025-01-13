import { useState } from "react"
import { VerticalStepper } from "./VerticalStepper"
import { EditForms } from "./EditForms"

interface props {
	phase: number
}

export const EditStepperFrame = ({ phase }: props) => {
	const [localPhase, setLocalPhase] = useState(phase)
	return (
		<div className="flex h-full justify-center items-center gap-8">
			<EditForms localPhase={localPhase} setLocalPhase={setLocalPhase} />
			<VerticalStepper phase={phase} />
		</div>
	)
}
