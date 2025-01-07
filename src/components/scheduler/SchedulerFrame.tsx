import { useState } from "react"
import { ModalStepper } from "../stepper/ModalStepper"

const SchedulerFrame = () => {
	const [phase, setPhase] = useState("first")
	return (
		<div>
			<ModalStepper phase={phase} />
		</div>
	)
}

export default SchedulerFrame
