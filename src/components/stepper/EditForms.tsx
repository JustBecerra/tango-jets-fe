import React from "react"
import { PhaseButtons } from "../buttons/PhaseButtons"

interface props {
	localPhase: number
	setLocalPhase: React.Dispatch<React.SetStateAction<number>>
}

export const EditForms = ({ localPhase, setLocalPhase }: props) => {
	return (
		<div className="w-[700px] h-[80%] bg-gray-800 border-blue-800 rounded">
			<PhaseButtons phase={localPhase} setPhase={setLocalPhase} />
		</div>
	)
}
