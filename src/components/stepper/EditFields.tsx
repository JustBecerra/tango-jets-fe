import useStore from "../../store/store"
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

	const getCorrectAirshipName = airships.find(
		(elem: Airship) => elem.id === currentFlight.airship_id
	)?.title

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
						</div>
					) : (
						<p>No planes have been chosen yet</p>
					)}
				</>
			)
		case 5:
			return <>Send invoice with detailed prices.</>
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
