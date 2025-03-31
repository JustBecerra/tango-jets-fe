import React from "react";
import type { Airship, Flight } from "../table/TableModal"
import {
	getFlightById,
	putCompletePhase,
	putQuoteConfirmation,
} from "../../../lib/actions/flights/actions"
import LoaderSpinner from "../Loaders/LoaderSpinner"
import type { AirshipObjectInterface } from "./LoadingQuoteCard"

type TripSummaryProps = {
	revenue: number
	singleAirship: Airship
	airshipObjects: AirshipObjectInterface[]
	FlightData: Flight | null
	setReFetchedFlight: React.Dispatch<React.SetStateAction<Flight | null>>
}

const TripSummary: React.FC<TripSummaryProps> = ({
	revenue,
	singleAirship,
	airshipObjects,
	FlightData,
	setReFetchedFlight,
}) => {
	const [loading, setLoading] = React.useState(false)

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

	const handleButtonClick = async () => {
		if (!FlightData) {
			console.error("FlightData is null or undefined")
			return
		}

		setLoading(true)
		try {
			await putCompletePhase({
				phase: FlightData.phase + 1,
				id: FlightData.id,
			})

			if (!singleAirship) {
				throw new Error("singleAirship is null or undefined")
			}

			const revenue = airshipObjects.find(
				(element) => element.airshipID === singleAirship.id
			)?.revenue

			const cost = airshipObjects.find(
				(element) => element.airshipID === singleAirship.id
			)?.cost

			const confirmedQuoteData = {
				airship_id: singleAirship.id,
				price_revenue: revenue ?? 0, // Fallback value if revenue is undefined
				price_cost: cost ?? 0, // Fallback value if cost is undefined
				flight_id: FlightData.id,
			}

			await putQuoteConfirmation(confirmedQuoteData)

			const updatedFlight = await getFlightById(FlightData.id)
			setReFetchedFlight({ ...updatedFlight })
		} catch (error) {
			console.error("Error updating flight data:", error)
		} finally {
			setLoading(false)
		}
	}

	return (
		<div className="w-full h-fit flex flex-col border-2 rounded border-solid bg-white border-gray-300">
			{FlightData ? (
				<>
					<div className="flex bg-gray-300 justify-between w-full py-2">
						<div className="flex w-fit gap-2">
							<div className="w-[30px] h-[30px] bg-blue-700 ml-2 rounded-full flex items-center justify-center">
								<span className="p-2 text-white mb-0">A</span>
							</div>
							<h3 className="text-center mb-0 font-medium">
								GRXL38-01
							</h3>
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
								<p className="h-fit text-gray-700 mb-0">
									{FlightData?.launchtime}
								</p>
								<p className="h-fit text-gray-700">
									{extractCodes(
										FlightData?.from || "",
										FlightData?.to || ""
									)}
								</p>
							</div>
							<button
								onClick={handleButtonClick}
								className="bg-blue-700 h-fit w-fit p-2 text-white rounded"
							>
								Request this option
							</button>
						</div>
					</div>
				</>
			) : (
				<div className="w-full sm:w-full h-full p-4  border-2 flex items-center justify-center bg-black bg-opacity-50">
					<LoaderSpinner />
				</div>
			)}

			{loading === true && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
					<LoaderSpinner />
				</div>
			)}
		</div>
	)
}

export default TripSummary;