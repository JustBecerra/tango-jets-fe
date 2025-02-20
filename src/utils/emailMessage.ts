import type { airshipFormType } from "../components/scheduler/SchedulerFrame"
import type { Airship } from "../components/table/TableModal"

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
			return `${getAirshipID}/${jet.price_revenue.toString()}/${jet.price_cost.toString()}/`
		})
		.join("")

	

	const params = `${tripID}/${AirshipIDs}`
	const encodedURL = encodeURIComponent(btoa(params))

	const fullURL = `https://tango-jets-fe.vercel.app/Quote${encodedURL}`

	return `
    <p>Dear ${master_passenger},</p>
    <p>We’re pleased to inform you that your flight has been successfully pre-scheduled. Below are the details:</p>
    
    <p><strong>Departure:</strong> ${launchtime}</p>
    <p><strong>Departure Airport:</strong> ${from}</p>
    <p><strong>Arrival Airport:</strong> ${to}</p>

    <p>Please ensure you arrive at the airport at least one hour before departure for check-in.</p>

    <p>Here is the link to your quote: 
        <a href="${fullURL}" target="_blank">
            View Quote
        </a>
    </p>

    <p>If you have any questions or need assistance, feel free to contact us.</p>

    <p>Thank you for choosing Tango Jets.</p>

    <p>Best regards,</p>
    <p>${createdby}</p>
`
}
