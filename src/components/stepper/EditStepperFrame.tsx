import { useEffect, useState } from "react"
import { VerticalStepper } from "./VerticalStepper"
import { EditForms } from "./EditForms"
import type { Airship, Flight } from "../table/TableModal"

interface props {
	flightRequested: Flight
	airships: Airship[]
}

export const EditStepperFrame = ({ flightRequested, airships }: props) => {
	const [localPhase, setLocalPhase] = useState(flightRequested.phase)
	const [currentFlight, setCurrentFlight] = useState<Flight>(flightRequested)

	return (
		<div className="flex h-full justify-center items-center gap-8">
			<div className="flex flex-col h-full justify-center items-start">
				<div className="flex w-full mb-2 justify-between">
					<button
						type="button"
						className="focus:ring-4 focus:outline-none mb-2 focus:ring-blue-300 rounded-lg border text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
						onClick={() => (window.location.href = "/Trips")}
					>
						Back
					</button>
					<button
						type="button"
						className="focus:ring-4 focus:outline-none mb-2 focus:ring-blue-300 rounded-lg border text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
						onClick={() =>
							(window.location.href = `/edit-flight/${currentFlight.id}`)
						}
					>
						Edit Flight
					</button>
					{currentFlight.type_of === "initial" && (
						<button
							type="button"
							className="focus:ring-4 focus:outline-none mb-2 focus:ring-blue-300 rounded-lg border text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
							onClick={() =>
								(window.location.href = `/Scheduler?flightID=${currentFlight.id}`)
							}
						>
							Add Leg
						</button>
					)}

					<a
						href="/itinerary.pdf"
						download
						className="focus:ring-4 focus:outline-none mb-2 focus:ring-blue-300 rounded-lg border text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600 "
					>
						Download Itinerary
					</a>
				</div>
				<EditForms
					localPhase={localPhase}
					setLocalPhase={setLocalPhase}
					currentFlight={currentFlight}
					setCurrentFlight={setCurrentFlight}
					airships={airships}
				/>
			</div>
			{currentFlight && <VerticalStepper phase={currentFlight.phase} />}
		</div>
	)
}
