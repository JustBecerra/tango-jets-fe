import { useEffect, useState } from "react"
import { getCookie } from "../../utils/getCookie"
import { getAirships } from "../../../lib/actions/airships/actions"
import useStore from "../../store/store"
import { getFlights } from "../../../lib/actions/flights/actions"
import { getClients } from "../../../lib/actions/clients/actions"

export const WelcomeText = () => {
	const [employeeName, setEmployeeName] = useState("")
	const { updateAirships, updateFlights, updateClients } = useStore(
		(state) => state
	)
	useEffect(() => {
		const fetchData = async () => {
			const flights = await getFlights()
			updateFlights(flights)
			const airships = await getAirships()
			updateAirships(airships)
			const clients = await getClients()
			updateClients(clients)
		}
		fetchData()
		const name = getCookie("username")
		if (name) {
			setEmployeeName(name)
		}
	}, [])

	return <h1 className="text-4xl font-bold">Welcome, {employeeName}</h1>
}
