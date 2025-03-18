
interface flightData {
	launchtime: string
	to: string
	from: string
	master_passenger: FormDataEntryValue
	createdby: string | undefined
}

interface props {
	flightIDs: number[]
	airshipID: number
}

export const invoiceMessage = ({ flightIDs, airshipID }: props) => {
	const params = `${airshipID}/${flightIDs}`
	const encodedURL = encodeURIComponent(btoa(params))

	const fullURL = `https://tango-jets-fe.vercel.app/Invoice?data=${encodedURL}`

	return fullURL
}
