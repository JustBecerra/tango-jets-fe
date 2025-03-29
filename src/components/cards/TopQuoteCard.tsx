import React from "react";
import type { Airship } from "../table/TableModal"

type TripSummaryProps = {
	launchtime?: string
	from?: string
	to?: string
	revenue: number
	singleAirship: Airship
}

const TripSummary: React.FC<TripSummaryProps> = ({
	launchtime,
	from,
	to,
	revenue,
	singleAirship,
}) => {
	function extractCodes(str1: string, str2: string) {
		const regex = /\((.*?)\)/

		if (str1 && str2 && str1.length > 4 && str2.length > 4) {
			const match1 = str1.match(regex)
			const match2 = str2.match(regex)
			if (match1 && match2) {
				return `${match1[1]} - ${match2[1]}`
			}
		} else if (str1.length === 3 && str2.length === 3) {
			return `${str1} - ${str2}`
		} else return "Invalid locations"
	}
	return (
		<div className="w-full h-fit flex flex-col border-2 rounded border-solid bg-white border-gray-300">
			<div className="flex bg-gray-300 justify-between w-full py-2">
				<div className="flex w-fit gap-2">
					<div className="w-[30px] h-[30px] bg-blue-700 ml-2 rounded-full flex items-center justify-center">
						<span className="p-2 text-white mb-0">A</span>
					</div>
					<h3 className="text-center mb-0 font-medium">GRXL38-01</h3>
				</div>
				<p className="text-2xl mb-0 mr-2">${revenue}</p>
			</div>
			<div className="w-full flex flex-col items-center justify-center sm:justify-around px-2 mt-2">
				<div className="w-full flex justify-between items-center">
					<h3 className="text-2xl font-bold">
						{singleAirship.title}
					</h3>
					<button className="rounded border-solid border-2 border-gray-800 p-1">
						View quote details
					</button>
				</div>
				<div className="w-full flex justify-between items-center">
					<div className="flex flex-col h-fit justify-center">
						<p className="h-fit text-gray-700 mb-0">{launchtime}</p>
						<p className="h-fit text-gray-700">
							{extractCodes(from || "", to || "")}
						</p>
					</div>
					<button className="bg-blue-700 h-fit w-fit p-2 text-white rounded">
						Request this option
					</button>
				</div>
			</div>
		</div>
	)
}

export default TripSummary;