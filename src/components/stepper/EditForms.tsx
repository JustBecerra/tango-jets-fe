import React from "react"
import { PhaseButtons } from "../buttons/PhaseButtons"
import type { Flight } from "../table/TableModal"
import { EditFields } from "./EditFields"

interface props {
	localPhase: number
	setLocalPhase: React.Dispatch<React.SetStateAction<number>>
	currentFlight: Flight
}

export const EditForms = ({
	localPhase,
	setLocalPhase,
	currentFlight,
}: props) => {
	return (
		<div className="w-[700px] h-[80%] bg-gray-800 border-blue-800 rounded">
			<EditFields currentFlight={currentFlight} localPhase={localPhase} />
			<PhaseButtons phase={localPhase} setPhase={setLocalPhase} />
		</div>
	)
}
