import { sendEmail } from "../../../lib/actions/emails/actions"
import { flightScheduledMessage } from "../../utils/emailMessage"
import TravelMap from "../cards/TravelMap"
import { EditAircraftModal } from "../modals/steppermodals/EditAircraftModal"
import type { Airship, Flight } from "../table/TableModal"

interface props {
	coordinates: {
		latitude: string
		longitude: string
	}[]
	chosenAirship: Airship
	to: string
	from: string
	totalPassengers: number
	listAirships: Airship[]
	currentFlight: Flight
}

export const StepperFlightInfo = ({
	coordinates,
	chosenAirship,
	to,
	from,
	totalPassengers,
	listAirships,
	currentFlight,
}: props) => {
	const { title, size } = chosenAirship
	// const handleQuote = async () => {
	// 	price_cost: number
	// price_revenue: number
	// airship_name: string
	// percentage: number
	// extra_price: number
	// 	const airshipData = listAirships.map
	// 	const EmailInfo = {
	// 		to: currentFlight.master_passenger,
	// 		subject: "Flight pre-scheduled!",
	// 		url: flightScheduledMessage({
	// 			airshipData,
	// 			airships: listAirships,
	// 			tripID: currentFlight.id,
	// 		}),
	// 		type_of_email: "quote",
	// 	}

	// 	await sendEmail(EmailInfo)
	// }

	return (
		<div className="w-[80%] space-y-4">
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
				<div className="bg-white rounded-lg shadow-sm overflow-hidden col-span-1 md:col-span-1">
					<div className="p-4 flex justify-between items-center border-b">
						<div className="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 text-gray-500 mr-2"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
									clipRule="evenodd"
								/>
							</svg>
							<h2 className="text-gray-700 font-medium">Route</h2>
						</div>
					</div>
					<div className="w-[500px] h-[300px] p-0">
						<TravelMap Coordinates={coordinates} />
					</div>
				</div>

				<div className="bg-white rounded-lg shadow-sm overflow-hidden col-span-1 md:col-span-2">
					<div className="p-4 flex justify-between items-center border-b">
						<div className="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 text-gray-500 mr-2"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11.43a1 1 0 00-.725-.962l-5-1.429a1 1 0 01.725-1.962l5 1.429a1 1 0 00.725-.038l5-1.429a1 1 0 011.169 1.409l-7 14z" />
							</svg>
							<h2 className="text-gray-700 font-medium">
								Aircraft
							</h2>
						</div>
						<EditAircraftModal
							chosenAirship={chosenAirship.title}
							listAirships={listAirships}
							to={currentFlight.to}
							from={currentFlight.from}
						/>
					</div>

					<div className="p-4 flex flex-col gap-4 w-full h-[80%] justify-center items-center">
						<div className="flex flex-col justify-center items-center">
							<h1 className="text-4xl font-bold text-gray-700">
								{title}
							</h1>
							<p className="text-gray-500">{size}</p>
						</div>

						<div className="flex gap-8">
							<div>
								<h3 className="text-sm text-gray-400 uppercase">
									POSITIONING FROM
								</h3>
								<p className="text-xl font-bold text-gray-400">
									{from}
								</p>
								{/* <p className="text-sm text-gray-400">
									Fort Lauderdale Executive Intl
								</p> */}
							</div>

							<div>
								<h3 className="text-sm text-gray-400 uppercase">
									POSITIONING TO
								</h3>
								<p className="text-xl font-bold text-gray-400">
									{to}
								</p>
								{/* <p className="text-sm text-gray-400">
									Van Nuys
								</p> */}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div className="bg-white rounded-lg shadow-sm overflow-hidden">
					<div className="p-4 flex justify-between items-center border-b">
						<div className="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 text-gray-500 mr-2"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
									clipRule="evenodd"
								/>
							</svg>
							<h2 className="text-gray-700 font-medium">Pax</h2>
						</div>
						<button className="text-gray-500 px-3 py-1 rounded-md border border-gray-200 flex items-center text-sm">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-4 w-4 mr-1"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
							</svg>
							Edit
						</button>
					</div>
					<div className="p-8 flex justify-center items-center">
						<h1 className="text-7xl font-bold text-gray-700">
							{totalPassengers}
						</h1>
					</div>
				</div>

				<div className="bg-white rounded-lg shadow-sm overflow-hidden">
					<div className="p-4 flex justify-between items-center border-b">
						<div className="flex items-center">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								className="h-5 w-5 text-gray-500 mr-2"
								viewBox="0 0 20 20"
								fill="currentColor"
							>
								<path
									fillRule="evenodd"
									d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
									clipRule="evenodd"
								/>
							</svg>
							<h2 className="text-gray-700 font-medium">
								Email actions
							</h2>
						</div>
					</div>
					<div className="p-4">
						<ul className="space-y-4">
							<li className="flex justify-between">
								<button className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-green-600 hover:bg-green-700 focus:ring-green-800">
									Send Quote
								</button>
								{/* <span className="text-gray-400 text-sm">
									There are currently no notes
								</span> */}
							</li>
							<li className="border-t pt-4 flex justify-between">
								<button className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-green-600 hover:bg-green-700 focus:ring-green-800">
									Send Contract
								</button>
								{/* <span className="text-gray-400 text-sm">
									There is currently no profile
								</span> */}
							</li>
							<li className="border-t pt-4 flex justify-between">
								<button className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-green-600 hover:bg-green-700 focus:ring-green-800">
									Send Invoice
								</button>
								{/* <span className="text-gray-400 text-sm">
									There are currently no notes
								</span> */}
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	)
}
