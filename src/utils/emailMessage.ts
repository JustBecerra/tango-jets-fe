import type { airshipFormType } from "../components/scheduler/SchedulerFrame"
import type { Airship } from "../components/table/TableModal"

interface props {
	airshipData: airshipFormType[]
	airships: Airship[]
	tripID: number
}

export const flightScheduledMessage = ({
	airshipData,
	airships,
	tripID,
}: props) => {
	const AirshipIDs = airshipData
		.map((jet) => {
			const getAirshipID = airships.find(
				(ship) => ship.title === jet.airship_name
			)?.id
			return `${getAirshipID}/${jet.price_revenue.toString()}/${jet.price_cost.toString()}/`
		})
		.join("")

	const params = `${tripID}/${AirshipIDs}`
	const encodedURL = encodeURIComponent(btoa(params))

	const fullURL = `https://tango-jets-fe.vercel.app/Quote?data=${encodedURL}`
	return fullURL
}
