import React from 'react'
import { StepperHeader } from './StepperHeader'
import type { Airship, Client, Flight } from '../table/TableModal'
import { ProgressStepper } from "./ProgressStepper"
import { StepperFlightInfo } from "./StepperFlightInfo"
import FlightSegmentsPage from "./FlightSegmentSection"
import FlightSegmentsSection from "./FlightSegmentSection"

interface props {
	currentFlight: Flight
	listAirships: Airship[]
	listClients: Client[]
	chosenAirship: Airship
	allFlights: Flight[]
}

export const StepperStructure = ({
	currentFlight,
	listAirships,
	listClients,
	chosenAirship,
	allFlights,
}: props) => {
	const lead_passenger =
		listClients.find(
			(client) => client.fullname === currentFlight.master_passenger
		) || "John Doe"

	const coordinates = [
		{
			latitude: currentFlight.first_latitude,
			longitude: currentFlight.first_longitude,
		},
		{
			latitude: currentFlight.second_latitude,
			longitude: currentFlight.second_longitude,
		},
	]
	return (
		<div className="flex flex-col h-full w-full justify-start items-center gap-8">
			<StepperHeader
				currentFlight={currentFlight}
				lead_passenger={lead_passenger}
			/>{" "}
			<ProgressStepper currentStep={currentFlight.phase} />
			<StepperFlightInfo
				coordinates={coordinates}
				chosenAirship={chosenAirship}
				to={currentFlight.to}
				from={currentFlight.from}
				totalPassengers={currentFlight.companion_passengers.length + 1}
			/>
			<FlightSegmentsSection allFlights={allFlights} />
		</div>
	)
}
