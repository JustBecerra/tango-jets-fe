
interface flightData {
	launchtime: string
	to: string
	from: string
	master_passenger: FormDataEntryValue
	createdby: string | undefined
}

interface props {
    transformedFlightData: flightData
    flightIDs: number[]
}

export const invoiceMessage = ({
    transformedFlightData,
	flightIDs,
}: props) => {
     const { launchtime, to, from, createdby, master_passenger } = transformedFlightData

    const params = `${flightIDs}`
    const encodedURL = encodeURIComponent(btoa(params))

    const fullURL = `https://tango-jets-fe.vercel.app/Invoice?data=${encodedURL}`

    return `
    <p>Dear ${master_passenger},</p>

    <p>We’re pleased to inform you that your flight has been successfully scheduled. Below are the details:</p>

    <p><strong>Departure:</strong> ${launchtime}</p>
    <p><strong>Departure Airport:</strong> ${from}</p>
    <p><strong>Arrival Airport:</strong> ${to}</p>

    <p>Please ensure you arrive at the airport at least one hour before departure for check-in.</p>

    <p>To confirm your booking, please complete the payment using the link below:</p>

    <p><a href="${fullURL}" target="_blank"><strong>Pay Invoice</strong></a></p>

    <p>If you have any questions or need assistance, feel free to contact us.</p>

    <p>Thank you for choosing Tango Jets.</p>

    <p>Best regards,</p>
    <p>${createdby}</p>

    `
    }
