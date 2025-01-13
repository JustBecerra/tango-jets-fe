import React, { useEffect } from "react"
import { getAirships } from "../../../lib/actions/airships/actions"
import useStore from "../../store/store"
import { getFlights } from "../../../lib/actions/flights/actions"
import { getClients } from "../../../lib/actions/clients/actions"

const FlightTable = React.lazy(() => import("../Home/FlightTable"))
const ClientTable = React.lazy(() => import("../Home/ClientTable"))
const MissingInfoCli = React.lazy(() => import("../Home/MissingInfoCli"))

export const Datitos = () => {
	const { updateAirships, updateFlights, updateClients, flights, clients } =
		useStore((state) => state)

	useEffect(() => {
		const fetchData = async () => {
			const flightsRequested = await getFlights()
			updateFlights(flightsRequested)
			const airshipsRequested = await getAirships()
			updateAirships(airshipsRequested)
			const clientsRequested = await getClients()
			updateClients(clientsRequested)
		}
		fetchData()
	}, [])

	return (
		<div className="p-4">
			{/* Diseño superior (tres tablas en fila) */}
			<div className="grid grid-cols-3 gap-6">
				<div className="overflow-hidden rounded-lg shadow-lg">
					<FlightTable flights={flights} />
				</div>
				<div className="overflow-hidden rounded-lg shadow-lg">
					<FlightTable flights={flights} />
				</div>
				<div className="overflow-hidden rounded-lg shadow-lg">
					<FlightTable flights={flights} />
				</div>
			</div>

			{/* Diseño inferior (dos tablas, ajustadas en tamaño) */}
			<div className="mt-8 flex gap-6">
				{/* MissingInfoCli: Altura fija para evitar scroll */}
				<div className="flex-[3.1] overflow-y-auto rounded-lg shadow-lg h-[300px] scrollbar-hide">
					<MissingInfoCli clients={clients} />
				</div>
				{/* ClientTable: Más pequeño */}
				<div className="flex-[1.5] overflow-y-auto rounded-lg shadow-lg h-[300px] scrollbar-hide">
					<ClientTable clients={clients} />
				</div>
			</div>
		</div>
	)
}
