interface props {
	launchtime: string
	to: string
	from: string
	master_passenger: FormDataEntryValue
	createdby: string | undefined
}

export const flightScheduledMessage = (transformedFlightData: props) => {
	const { launchtime, to, from, createdby, master_passenger } =
		transformedFlightData
	return `Dear ${master_passenger},

	We’re pleased to inform you that your flight has been successfully pre-scheduled. Below are the details:

    Departure: ${launchtime}

    Departure Airport: ${from}

    Arrival Airport: ${to}

	Please ensure you arrive at the airport at least one hour before departure for check-in.

	Here is the link to the invoice: [Link]

	if you have any questions or need assistance, feel free to contact us.

	Thank you for choosing Tango Jets.

	Best regards,
	${createdby}
`
}
