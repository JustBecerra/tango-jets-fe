import type { Flight } from "../table/TableModal"

interface props {
	currentFlight: Flight
	localPhase: number
}

const fieldDecider = ({ currentFlight, localPhase }: props) => {
	switch (localPhase) {
		case 1:
			return (
				<div>
					<h2>{currentFlight.from}</h2>
					<h2>{currentFlight.to}</h2>
					<h2>{currentFlight.master_passenger}</h2>
					<h2>{currentFlight.launchtime}</h2>
				</div>
			)
		case 2:
			return (
				<div>
					<h2>{currentFlight.price_cost}</h2>
					<h2>{currentFlight.price_revenue}</h2>
				</div>
			)
		case 3:
			return (
				<div>
					<p>Waiting for Client to choose plane.</p>
				</div>
			)
		case 4:
			return <div></div>
	}
}

export const EditFields = ({ currentFlight, localPhase }: props) => {
	return <>{fieldDecider({ currentFlight, localPhase })}</>
}
