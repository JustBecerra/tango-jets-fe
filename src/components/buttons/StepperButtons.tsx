import React from "react"

interface props {
	phase: string
	setPhase: React.Dispatch<React.SetStateAction<string>>
	operation: string
}

export const StepperButtons = ({ phase, setPhase, operation }: props) => {
	const PhaseDecider = () => {
		if (phase === "first") {
			return (
				<button
					className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					onClick={() => setPhase("second")}
				>
					Next Phase
				</button>
			)
		} else if (phase === "second") {
			return (
				<>
					<button
						className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
						onClick={() => setPhase("first")}
					>
						Back
					</button>
					<button
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						onClick={() => setPhase("third")}
					>
						Next Phase
					</button>
				</>
			)
		} else if (phase === "third" && operation === "add") {
			return (
				<>
					<button
						id="submitFlight"
						type="submit"
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Add Flight
					</button>
					<button
						type="button"
						className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
						onClick={() => setPhase("second")}
					>
						Back
					</button>
				</>
			)
		} else if (phase === "third" && operation === "edit") {
			return (
				<>
					<button
						id="submitEdit"
						type="submit"
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Edit Flight
					</button>
					<button
						type="button"
						className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
						onClick={() => setPhase("second")}
					>
						Back
					</button>
				</>
			)
		}
	}

	return (
		<div className="flex justify-start items-center py-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
			{PhaseDecider()}
		</div>
	)
}
