import React from "react"
import { sendEmail } from "../../../lib/actions/emails/actions"
import useStore from "../../store/store"
import { contractMessage } from "../../utils/contractMessage"
import { invoiceMessage } from "../../utils/invoiceMessage"
import LoaderSpinner from "../Loaders/LoaderSpinner"
import type { Airship, Client, Flight } from "../table/TableModal"
import { assignPilot, getPilots } from "../../../lib/actions/pilots/actions"
import { getFlights } from "../../../lib/actions/flights/actions"

interface props {
	currentFlight: Flight
	localPhase: number
	loading?: boolean
	airships: Airship[]
	setLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const fieldDecider = ({
	currentFlight,
	localPhase,
	airships,
	setLoading,
}: props) => {
	const pilots = useStore((state) => state.pilots)

	const [chosenPilot, setChosenPilot] = React.useState(currentFlight.pilot_id)

	React.useEffect(() => {
		setChosenPilot(currentFlight.pilot_id)
	}, [currentFlight.pilot_id])

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
	const updatePilots = useStore((state) => state.updatePilots)
	const updateFlights = useStore((state) => state.updateFlights)
	flights.unshift(currentFlight.id)

	const getCorrectAirshipName = airships.find(
		(elem: Airship) => elem.id === currentFlight.airship_id
	)?.title

	const handlePilotAssignation = async () => {
		setLoading(true)
		const pilotToBeAssigned = pilots.find(
			(pilot) => pilot.fullname === chosenPilot
		)
		const FlightUpdate = {
			flight_id: currentFlight.id,
			pilot_id: pilotToBeAssigned?.id || 0,
		}
		await assignPilot(FlightUpdate)
		const refetchPilots = await getPilots()
		const refetchFlights = await getFlights()
		updatePilots(refetchPilots)
		updateFlights(refetchFlights)
		setLoading(false)
	}

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
			url: invoiceMessage({
				flightIDs,
				airshipID: currentFlight.airship_id,
			}),
			type_of_email: "invoice",
			contract: false,
		}
		await sendEmail(EmailInfo)
	}

	const handleContract = async () => {
		const EmailInfo = {
			to: clients?.fullname || "",
			subject: "Flight contract",
			url: contractMessage({
				master_passenger: clients?.fullname || "Passenger",
			}),
			type_of_email: "contract",
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
						{currentFlight.master_passenger}
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
				<div className="flex flex-col w-full h-[70%] justify-center items-center gap-6">
					<p>
						Check client has correctly payed and alert crew of the
						plane.
					</p>
					<div className="w-1/2 flex justify-center items-center gap-6 h-fit">
						<select
							value={chosenPilot}
							onChange={(e) => setChosenPilot(e.target.value)}
							className="block w-1/2 px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
						>
							<option value="">-- select --</option>
							{pilots.map((pilot, key) => (
								<option key={key} value={pilot.fullname}>
									{pilot.fullname}
								</option>
							))}
						</select>
						<button
							onClick={handlePilotAssignation}
							className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800"
						>
							Confirm Pilot
						</button>
					</div>
				</div>
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
	setLoading,
}: props) => {
	return (
		<div className="w-full h-[30%] flex justify-center items-center ">
			{fieldDecider({ currentFlight, localPhase, airships, setLoading })}
			{loading && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
					<LoaderSpinner />
				</div>
			)}
		</div>
	)
}
