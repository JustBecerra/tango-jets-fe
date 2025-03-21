

interface props {
	master_passenger: string
	date: string
	price: number
}

export const contractMessage = ({ master_passenger, date, price }: props) => {
	const params = `${master_passenger}/${date}/${price}`
	const encodedURL = encodeURIComponent(btoa(params))

	const fullURL = `https://tango-jets-fe.vercel.app/Signing?data=${encodedURL}`

	return fullURL
}
