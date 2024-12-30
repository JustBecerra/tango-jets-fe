interface props {
	launchtime: string
	arrivaltime: string
	to: string
	from: string
	airship_name: FormDataEntryValue
	master_passenger: FormDataEntryValue
	createdby: string | undefined
}

export const flightScheduledMessage = (transformedFlightData: props) => {
	const {
		launchtime,
		arrivaltime,
		to,
		from,
		airship_name,
		createdby,
		master_passenger,
	} = transformedFlightData
	return `Dear ${master_passenger},

We’re pleased to inform you that your flight has been successfully scheduled. Below are the details:

    Flight Number: ${airship_name}

    Departure: ${launchtime}

    Arrival: ${arrivaltime}

    Departure Airport: ${from}

    Arrival Airport: ${to}

Please ensure you arrive at the airport at least one hour before departure for check-in.

Here is the link to the invoice: [Link]

If you have any questions or need assistance, feel free to contact us at [Contact Information].

Thank you for choosing Tango Jets.

Best regards,
${createdby}
[Your Contact Information]`
}
