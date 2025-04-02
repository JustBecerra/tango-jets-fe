import React from 'react'
import { StepperHeader } from './StepperHeader'
import type { Airship, Client, Flight } from '../table/TableModal'
import { ProgressStepper } from "./ProgressStepper"

interface props {
	currentFlight: Flight
	listAirships: Airship[]
	listClients: Client[]
}

export const StepperStructure = ({
	currentFlight,
	listAirships,
	listClients,
}: props) => {
	const lead_passenger =
		listClients.find(
			(client) => client.fullname === currentFlight.master_passenger
		) || "John Doe"
	return (
		<div className="flex flex-col h-full w-full justify-center items-center gap-8">
			<StepperHeader
				currentFlight={currentFlight}
				lead_passenger={lead_passenger}
			/>{" "}
			<ProgressStepper />
		</div>
	)
}
