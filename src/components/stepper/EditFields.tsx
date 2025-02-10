import useStore from "../../store/store"
import LoaderSpinner from "../Loaders/LoaderSpinner"
import type { Client, Flight } from "../table/TableModal"

interface props {
	currentFlight: Flight
	localPhase: number
	loading?: boolean
}

const fieldDecider = ({ currentFlight, localPhase }: props) => {
	const clients = useStore((state) => state.clients).find(
		(client: Client) =>
			client.id === parseInt(currentFlight.master_passenger)
	)

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
					<p>Planes chosen by the client.</p>
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

export const EditFields = ({ currentFlight, localPhase, loading }: props) => {
	return (
		<div className="w-full h-[30%] flex justify-center items-center ">
			{fieldDecider({ currentFlight, localPhase })}
			{loading && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
					<LoaderSpinner />
				</div>
			)}
		</div>
	)
}
