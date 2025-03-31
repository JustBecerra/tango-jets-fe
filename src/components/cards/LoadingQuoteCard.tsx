import React, { useEffect, useState } from 'react'
import TopQuoteCard from "./TopQuoteCard"
import { PickAirship, type ImagesType } from "./PickAirship"
import { MapCard } from "./MapCard"
import {
	getAirshipImages,
	getAirshipsForInvoice,
} from "../../../lib/actions/airships/actions"
import { getFlightById } from "../../../lib/actions/flights/actions"
import { type Airship, type Flight } from "../table/TableModal"
import LoaderSpinner from "../Loaders/LoaderSpinner"

interface props {
	airshipParamsArray: string[]
	tripID: string
}

export interface AirshipObjectInterface {
	airshipID: number
	revenue: number
	cost: number
}

export const LoadingQuoteCard = ({ tripID, airshipParamsArray }: props) => {
	const [storedAirshipData, setStoredAirshipData] = useState<Airship[]>([])
	const [images, setImages] = useState<ImagesType[][]>([])
	const [clientFlight, setClientFlight] = useState<Flight | null>(null)
	const [coordinates, setCoordinates] = useState<
		{ latitude: string; longitude: string }[]
	>([])
	const [reFetchedFlight, setReFetchedFlight] = useState<Flight | null>(null)
	const [airshipObjects, setAirshipObjects] = useState<
		AirshipObjectInterface[]
	>([])

	useEffect(() => {
		const fetchData = async () => {
			const airshipTempObject = []
			for (let i = 0; i < airshipParamsArray.length; i += 3) {
				setAirshipObjects((prev) => [
					...prev,
					{
						airshipID: parseInt(airshipParamsArray[i]),
						revenue: parseFloat(airshipParamsArray[i + 1]),
						cost: parseFloat(airshipParamsArray[i + 2]),
					},
				])
				airshipTempObject.push({
					airshipID: parseInt(airshipParamsArray[i]),
					revenue: parseFloat(airshipParamsArray[i + 1]),
					cost: parseFloat(airshipParamsArray[i + 2]),
				})
			}

			const airshipIDsFromParams = airshipTempObject.map((airship) =>
				airship.airshipID.toString()
			)

			try {
				const storedData = await getAirshipsForInvoice(
					airshipIDsFromParams
				)
				

				const imageRequests = airshipIDsFromParams.map((id) =>
					getAirshipImages(parseInt(id))
				)
				const imagesData = await Promise.all(imageRequests)
				setImages(imagesData)

				const convertedID = parseInt(tripID)
				const flightData = await getFlightById(convertedID)

				setClientFlight(flightData)
				if (flightData.airship_name === "TBD") {
					setStoredAirshipData(storedData)
				} else {
					const airshipChosen = storedData.filter(
						(elem: Airship) =>
							elem.title === flightData.airship_name
					)

					setStoredAirshipData(airshipChosen)
				}
				setCoordinates([
					{
						latitude: flightData.first_latitude,
						longitude: flightData.first_longitude,
					},
					{
						latitude: flightData.second_latitude,
						longitude: flightData.second_longitude,
					},
				])
			} catch (error) {
				console.error("Error fetching data:", error)
			}
		}

		fetchData()
	}, [])

	if (airshipParamsArray[0] === "undefined") {
		return <div>No airships options were sent, talk to your scheduler</div>
	}

	return (
		<>
			<div className="w-full h-[25%] sm:h-[10%] flex items-center justify-center mb-4 p-4 border-2 rounded border-solid bg-[#EFFFE3] border-[#d6e9c6]">
				<p className="w-full h-fit overflow-hidden text-wrap break-words mb-0">
					Please review the trip itinerary and quote for accuracy and
					contact us with any changes. If the itinerary and quote are
					correct, please click the 'Request to book' button to start
					the booking process. Once we have confirmed availability for
					the trip, we will send you a link to complete the booking
					process.
				</p>
			</div>

			<div className="flex flex-col w-full gap-y-2">
				{storedAirshipData.map((elem, i) => (
					<TopQuoteCard
						key={i}
						FlightData={clientFlight}
						revenue={airshipObjects[i].revenue}
						airshipObjects={airshipObjects}
						singleAirship={elem}
						setReFetchedFlight={setReFetchedFlight}
						setStoredAirshipData={setStoredAirshipData}
					/>
				))}
			</div>
			<div className="w-full flex flex-col sm:flex-row justify-around h-[60%] py-4 gap-8">
				{clientFlight !== null ? (
					<PickAirship
						images={images as [ImagesType[]]}
						storedAirshipData={storedAirshipData}
						FlightData={clientFlight}
						airshipObjects={airshipObjects}
						setReFetchedFlight={setReFetchedFlight}
						reFetchedFlight={reFetchedFlight}
						setStoredAirshipData={setStoredAirshipData}
					/>
				) : (
					<div className="w-full sm:w-[50%] h-full p-4  border-2 flex items-center justify-center bg-black bg-opacity-50">
						<LoaderSpinner />
					</div>
				)}

				{coordinates.length > 0 ? (
					<MapCard Coordinates={coordinates} />
				) : (
					<div className="w-full sm:w-[50%] h-full p-4  border-2 flex items-center justify-center bg-black bg-opacity-50">
						<LoaderSpinner />
					</div>
				)}
			</div>
		</>
	)
}


