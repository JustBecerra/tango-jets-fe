import React from "react"

interface props {
	phase: number
	setPhase: React.Dispatch<React.SetStateAction<number>>
}

export const PhaseButtons = ({ phase, setPhase }: props) => {
	return (
		<div className="w-[100%] flex justify-around">
			{phase > 1 && (
				<button
					type="button"
					className="focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
					onClick={(e) => {
						e.preventDefault()
						setPhase((prev) => prev - 1)
					}}
				>
					Back
				</button>
			)}

			{phase < 8 && (
				<button
					type="button"
					className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
					onClick={(e) => {
						e.preventDefault()
						setPhase((prev) => prev + 1)
					}}
				>
					Next Phase
				</button>
			)}
		</div>
	)
}
