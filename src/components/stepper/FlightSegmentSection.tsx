import type { Flight } from "../table/TableModal"
import { FlightSegment } from "./FlightSegment"

interface props {
	allFlights: Flight[]
}

export default function FlightSegmentsSection({ allFlights }: props) {
	return (
		<div className="w-[80%] mx-auto py-6">
			<div className="bg-white rounded-lg border shadow-sm">
				<div className="px-6 py-4 border-b">
					<h3 className="text-lg font-medium flex items-center gap-2">
						<span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-gray-100">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								width="16"
								height="16"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								strokeLinecap="round"
								strokeLinejoin="round"
								className="text-gray-700"
							>
								<path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z" />
							</svg>
						</span>
						Flight segments
					</h3>
				</div>
				<div className="p-6">
					<div className="overflow-x-auto">
						<table className="w-full">
							{/* <thead className="border-b">
								<tr className="text-left text-xs text-gray-500">
									<th className="pb-3 font-normal"></th>
									<th className="pb-3 font-normal"></th>
									<th className="pb-3 font-normal"></th>
									<th className="pb-3 font-normal"></th>
									<th className="pb-3 font-normal"></th>
									<th className="pb-3 font-normal text-right">
										DISTANCE
									</th>
									<th className="pb-3 font-normal text-right">
										ETA
									</th>
									<th className="pb-3 font-normal"></th>
								</tr>
							</thead> */}
							<tbody>
								{allFlights.map((flight, index) => (
									<FlightSegment
										key={index}
										departureTime={
											flight.launchtime.split("T")[1]
										}
										departureDate={
											flight.launchtime.split("T")[0]
										}
										departureAirport={flight.from}
										departureCity="Fort Lauderdale, FL"
										arrivalTime={
											flight.arrivaltime.split("T")[1]
										}
										arrivalDate={
											flight.arrivaltime.split("T")[0]
										}
										arrivalAirport={flight.to}
										arrivalCity="Kansas City, MO"
										etr={flight.flight_time}
									/>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}


