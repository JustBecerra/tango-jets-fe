import React, { useState } from "react";
import { PhaseButtons } from "../buttons/PhaseButtons";
import type { Airship, Flight } from "../table/TableModal"
import { EditFields } from "./EditFields"

interface props {
	localPhase: number
	setLocalPhase: React.Dispatch<React.SetStateAction<number>>
	currentFlight: Flight
	setCurrentFlight: React.Dispatch<React.SetStateAction<Flight>>
	airships: Airship[]
}

export const EditForms = ({
	localPhase,
	setLocalPhase,
	currentFlight,
	setCurrentFlight,
	airships,
}: props) => {
	const [loading, setLoading] = useState(false)
	return (
		<div className="w-[700px] h-[70%] flex flex-col items-center justify-evenly bg-[#166ba3] bg-opacity-30 border-blue-800 rounded-lg">
			<h1 className="text-3xl">Flight Phase: {localPhase}</h1>
			<EditFields
				currentFlight={currentFlight}
				localPhase={localPhase}
				loading={loading}
				airships={airships}
			/>
			{currentFlight && (
				<PhaseButtons
					phase={localPhase}
					setPhase={setLocalPhase}
					currentPhase={currentFlight.phase}
					currentFlightId={currentFlight.id}
					setCurrentFlight={setCurrentFlight}
					setLoading={setLoading}
				/>
			)}
		</div>
	)
}
