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
				<>
					<button
						type="button"
						className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
						onClick={(e) => {
							e.preventDefault()
							window.location.href = "Trips"
						}}
					>
						Back
					</button>
					<button
						type="button"
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						onClick={(e) => {
							e.preventDefault()
							setPhase("second")
						}}
					>
						Next Phase
					</button>
				</>
			)
		} else if (phase === "second") {
			return (
				<>
					<button
						type="button"
						className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
						onClick={(e) => {
							e.preventDefault()
							setPhase("first")
						}}
					>
						Back
					</button>
					<button
						type="button"
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
						onClick={(e) => {
							e.preventDefault()
							setPhase("third")
						}}
					>
						Next Phase
					</button>
				</>
			)
		} else if (phase === "third" && operation === "add") {
			return (
				<>
					<button
						type="button"
						className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
						onClick={(e) => {
							e.preventDefault()
							setPhase("second")
						}}
					>
						Back
					</button>
					<button
						type="submit"
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Add Flight
					</button>
				</>
			)
		} else if (phase === "third" && operation === "edit") {
			return (
				<>
					<button
						type="button"
						className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
						onClick={(e) => {
							e.preventDefault()
							setPhase("second")
						}}
					>
						Back
					</button>
					<button
						type="submit"
						className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Edit Flight
					</button>
				</>
			)
		}
	}

	return (
		<div
			className={`flex  ${
				phase === "third" ? "justify-between w-full" : "justify-start"
			} items-center py-6 space-x-2 border-t border-gray-600 rounded-b`}
		>
			{PhaseDecider()}
		</div>
	)
}
