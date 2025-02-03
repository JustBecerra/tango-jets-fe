import type { airshipFormType } from "../components/scheduler/SchedulerFrame"
import type { Airship } from "../components/table/TableModal"
import hash from "hash.js"
interface props {
	transformedFlightData: flightData
	airshipData: airshipFormType[]
	airships: Airship[]
	tripID: number
}

interface flightData {
	launchtime: string
	to: string
	from: string
	master_passenger: FormDataEntryValue
	createdby: string | undefined
}

export const flightScheduledMessage = ({
	transformedFlightData,
	airshipData,
	airships,
	tripID,
}: props) => {
	const { launchtime, to, from, createdby, master_passenger } =
		transformedFlightData

	const AirshipIDs = airshipData
		.map((jet) => {
			const getAirshipID = airships.find(
				(ship) => ship.title === jet.airship_name
			)?.id
			return `${getAirshipID}/${jet.price_revenue.toString()}/`
		})
		.join("")

	const fullURL = `https://tango-jets-fe.vercel.app/Quote/${tripID}/${AirshipIDs}`

	const hashedURL = hash.sha256().update(fullURL).digest("hex")

	return `Dear ${master_passenger},

	We’re pleased to inform you that your flight has been successfully pre-scheduled. Below are the details:

    Departure: ${launchtime}

    Departure Airport: ${from}

    Arrival Airport: ${to}

	Please ensure you arrive at the airport at least one hour before departure for check-in.

	Here is the link to the quote: ${hashedURL}

	if you have any questions or need assistance, feel free to contact us.

	Thank you for choosing Tango Jets.

	Best regards,
	${createdby}
`
}
