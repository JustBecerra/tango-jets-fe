import { sendEmail } from "../../../lib/actions/emails/actions"
import useStore from "../../store/store"
import { contractMessage } from "../../utils/contractMessage"
import { invoiceMessage } from "../../utils/invoiceMessage"
import LoaderSpinner from "../Loaders/LoaderSpinner"
import type { Airship, Client, Flight } from "../table/TableModal"

interface props {
	currentFlight: Flight
	localPhase: number
	loading?: boolean
	airships: Airship[]
}

const fieldDecider = ({ currentFlight, localPhase, airships }: props) => {
	const clients = useStore((state) => state.clients).find(
		(client: Client) =>
			client.id === parseInt(currentFlight.master_passenger)
	)
	const flights = useStore((state) => state.flights)
		.filter(
			(flight: Flight) =>
				parseInt(flight.associated_to) === currentFlight.id
		)
		.map((flight: Flight) => flight.id)
	flights.unshift(currentFlight.id)
	const getCorrectAirshipName = airships.find(
		(elem: Airship) => elem.id === currentFlight.airship_id
	)?.title

	const handleInvoice = async () => {
		const transformedFlightData = {
			launchtime: currentFlight.launchtime.slice(0, 16),
			to: currentFlight.to,
			from: currentFlight.from,
			master_passenger: clients?.fullname || "Passenger",
			createdby: currentFlight.createdby,
		}
		const flightIDs = flights
		const EmailInfo = {
			to: clients?.fullname || "",
			subject: "Flight Invoice",
			text: invoiceMessage({
				transformedFlightData,
				flightIDs,
				airshipID: currentFlight.airship_id,
			}),
			contract: false,
		}
		await sendEmail(EmailInfo)
	}

	const handleContract = async () => {
		const EmailInfo = {
			to: clients?.fullname || "",
			subject: "Flight contract",
			text: contractMessage({
				master_passenger: clients?.fullname || "Passenger",
			}),
			contract: true,
		}
		await sendEmail(EmailInfo)
	}

	switch (localPhase) {
		case 1:
			return (
				<div className="w-[100%] h-[100%] grid grid-cols-2 gap-16">
					<h2 className="text-xl text-center">
						From: <br />
						{currentFlight.from}
					</h2>
					<h2 className="text-xl text-center">
						To: <br />
						{currentFlight.to}
					</h2>
					<h2 className="text-xl text-center">
						Lead Passenger: <br />
						{clients && clients.fullname}
					</h2>
					<h2 className="text-xl text-center">
						Launch time: <br />
						{currentFlight.launchtime.slice(0, 16)}
					</h2>
				</div>
			)
		case 2:
			return (
				<div className="w-[100%] h-[100%] grid grid-cols-2 gap-16">
					<h2 className="text-xl text-center">
						Cost: <br />${currentFlight && currentFlight.price_cost}
					</h2>
					<h2 className="text-xl text-center">
						Markup: <br />$
						{currentFlight && currentFlight.price_revenue}
					</h2>
				</div>
			)
		case 3:
			return (
				<>
					<p>Waiting for Client to choose plane.</p>
				</>
			)
		case 4:
			return (
				<>
					{parseInt(currentFlight.price_cost) > 0 &&
					currentFlight.price_revenue > 0 ? (
						<div className="flex flex-col w-1/2 h-[70%] justify-center items-center">
							<h1 className="text-3xl mb-6">
								The client has chosen
							</h1>
							<h2 className="text-xl">
								Airship chosen: {getCorrectAirshipName}
							</h2>
							<div className="flex gap-4 mt-4">
								<h2 className="text-xl">
									Cost: ${currentFlight.price_cost}
								</h2>
								<h2 className="text-xl">
									Markup: ${currentFlight.price_revenue}
								</h2>
							</div>
							<button
								onClick={handleContract}
								className="text-white mt-6 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-green-600 hover:bg-green-700 focus:ring-green-800"
							>
								Send Contract
							</button>
						</div>
					) : (
						<p>No planes have been chosen yet</p>
					)}
				</>
			)
		case 5:
			return (
				<div className="flex flex-col w-1/2 h-[70%] justify-center items-center">
					{currentFlight.phase <= 5 ? (
						<>
							<p>Send invoice with detailed prices.</p>
							<button
								onClick={handleInvoice}
								className="text-white mt-6 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-green-600 hover:bg-green-700 focus:ring-green-800"
							>
								Send Invoice
							</button>
						</>
					) : (
						<p>Invoice has been sent.</p>
					)}
				</div>
			)
		case 6:
			return <>Waiting for client to pay.</>
		case 7:
			return (
				<>
					Check client has correctly payed and alert crew of the
					plane.
				</>
			)
		default:
			return <>Post Routine Flight.</>
	}
}

export const EditFields = ({
	currentFlight,
	localPhase,
	loading,
	airships,
}: props) => {
	return (
		<div className="w-full h-[30%] flex justify-center items-center ">
			{fieldDecider({ currentFlight, localPhase, airships })}
			{loading && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
					<LoaderSpinner />
				</div>
			)}
		</div>
	)
}
