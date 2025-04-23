import type { airshipFormType } from "../components/scheduler/SchedulerFrame"
import type { Airship } from "../components/table/TableModal"

interface AirshipType {
	price_cost: number
	price_revenue: number
	airship_name: string
}

interface props {
	airshipData: AirshipType[]
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
