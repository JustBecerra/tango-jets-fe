import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import type { formType } from "../scheduler/SchedulerFrame"

interface CsvSelectProps {
	labelFrom?: string
	labelTo?: string
	onSelectFrom?: (value: string) => void
	onSelectTo?: (value: string) => void
	onDistanceCalculated?: (distance: number) => void
	onFlightTimeCalculated?: (flightTime: number) => void
	toDefaultValue?: string
	fromDefaultValue?: string
	setFormData: React.Dispatch<React.SetStateAction<formType>>
}
const MAX_RESULTS = 5

// Función para obtener aeropuertos
const fetchAirports = async (
	query: string,
	setResults: React.Dispatch<React.SetStateAction<any[]>>
) => {
	if (!query || query.length < 2) return

	try {
		const response = await axios.get(
			`https://autocomplete.travelpayouts.com/places2?term=${query}&locale=en&types[]=city&types[]=airport`
		)

		if (response.data && response.data.length > 0) {
			const airports = response.data
				.slice(0, MAX_RESULTS)
				.map((place: any) => ({
					id: place.code,
					name: place.name,
					country: place.country_name,
					lat: place.coordinates?.lat,
					lon: place.coordinates?.lon,
					display: `${place.name} (${place.code}) - ${place.country_name}`,
				}))

			setResults(airports)
		}
	} catch (error) {
		console.error("Error getting airports:", error)
	}
}

// Función para calcular distancia con la fórmula de Haversine
const calculateDistance = (
	lat1: number,
	lon1: number,
	lat2: number,
	lon2: number,
	setFormData: React.Dispatch<React.SetStateAction<formType>>
): number => {
	if (!lat1 || !lon1 || !lat2 || !lon2) return 0

	const R = 6371 // Radio de la Tierra en km
	const dLat = (lat2 - lat1) * (Math.PI / 180)
	const dLon = (lon2 - lon1) * (Math.PI / 180)
	setFormData((prevFormData) => ({
		...prevFormData,
		first_latitude: lat1.toString(),
		first_longitude: lon1.toString(),
		second_latitude: lat2.toString(),
		second_longitude: lon2.toString(),
	}))
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos(lat1 * (Math.PI / 180)) *
			Math.cos(lat2 * (Math.PI / 180)) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2)
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
	return Math.round(R * c) // Distancia en km
}

// Función para calcular el tiempo de vuelo
const calculateFlightTime = (distance: number, speed = 900): string => {
	if (!distance) return "0"
	return (distance / speed).toFixed(2) // Tiempo en horas
}

const CsvSelect: React.FC<CsvSelectProps> = ({
	labelFrom = "From",
	labelTo = "To",
	onSelectFrom,
	onSelectTo,
	onDistanceCalculated,
	onFlightTimeCalculated,
	toDefaultValue,
	fromDefaultValue,
	setFormData,
}) => {
	const [from, setFrom] = useState(fromDefaultValue || "")
	const [to, setTo] = useState(toDefaultValue || "")
	const [fromAirport, setFromAirport] = useState<any>(null)
	const [toAirport, setToAirport] = useState<any>(null)
	const [fromResults, setFromResults] = useState<any[]>([])
	const [toResults, setToResults] = useState<any[]>([])
	const [distance, setDistance] = useState<number | null>(null)
	const [flightTime, setFlightTime] = useState<string | null>(null)

	const fromRef = useRef<HTMLDivElement>(null)
	const toRef = useRef<HTMLDivElement>(null)

	const handleClickOutside = (event: MouseEvent) => {
		if (
			fromRef.current &&
			!fromRef.current.contains(event.target as Node)
		) {
			setFromResults([])
		}
		if (toRef.current && !toRef.current.contains(event.target as Node)) {
			setToResults([])
		}
	}

	useEffect(() => {
		document.addEventListener("mousedown", handleClickOutside)
		return () => {
			document.removeEventListener("mousedown", handleClickOutside)
		}
	}, [])

	return (
		<div className="flex flex-col justify-end h-fit">
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				{/* Input "From" */}
				<div className="flex-1 mb-4" ref={fromRef}>
					<label className="block text-sm font-medium text-gray-700">
						{labelFrom}
					</label>
					<input
						type="text"
						value={from}
						onChange={(e) => {
							setFrom(e.target.value)
							fetchAirports(e.target.value, setFromResults)
						}}
						className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
						placeholder="Enter Airport"
					/>
					{fromResults.length > 0 && (
						<ul className="absolute z-10 bg-white border rounded-lg shadow-lg mt-1 max-h-40 overflow-auto w-3/4">
							{fromResults.map((place) => (
								<li
									key={place.id}
									className="p-2 cursor-pointer hover:bg-gray-200"
									onClick={() => {
										setFrom(place.display)
										setFromAirport(place)
										setFromResults([])
										if (onSelectFrom)
											onSelectFrom(place.display)
										if (toAirport) {
											const dist = calculateDistance(
												place.lat,
												place.lon,
												toAirport.lat,
												toAirport.lon,
												setFormData
											)
											setDistance(dist)
											setFlightTime(
												calculateFlightTime(dist)
											)
											if (onDistanceCalculated)
												onDistanceCalculated(dist)
											if (onFlightTimeCalculated)
												onFlightTimeCalculated(
													parseFloat(
														calculateFlightTime(
															dist
														)
													)
												)
										}
									}}
								>
									{place.display}
								</li>
							))}
						</ul>
					)}
				</div>

				{/* Input "To" */}
				<div className="flex-1 mb-4" ref={toRef}>
					<label className="block text-sm font-medium text-gray-700">
						{labelTo}
					</label>
					<input
						type="text"
						value={to}
						onChange={(e) => {
							setTo(e.target.value)
							fetchAirports(e.target.value, setToResults)
						}}
						className="block w-full px-5 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
						placeholder="Enter Airport"
					/>
					{toResults.length > 0 && (
						<ul className="absolute z-10 bg-white border rounded-lg shadow-lg mt-1 max-h-40 overflow-auto w-full">
							{toResults.map((place) => (
								<li
									key={place.id}
									className="p-2 cursor-pointer hover:bg-gray-200"
									onClick={() => {
										setTo(place.display)
										setToAirport(place)
										setToResults([])
										if (onSelectTo)
											onSelectTo(place.display)
										if (fromAirport) {
											const dist = calculateDistance(
												fromAirport.lat,
												fromAirport.lon,
												place.lat,
												place.lon,
												setFormData
											)
											setDistance(dist)
											setFlightTime(
												calculateFlightTime(dist)
											)
											if (onDistanceCalculated)
												onDistanceCalculated(dist)
											if (onFlightTimeCalculated)
												onFlightTimeCalculated(
													parseFloat(
														calculateFlightTime(
															dist
														)
													)
												)
										}
									}}
								>
									{place.display}
								</li>
							))}
						</ul>
					)}
				</div>
			</div>

			{distance !== null && (
				<div className="mt-4 p-2 bg-blue-100 text-blue-800 rounded-lg">
					Distance: <strong>{distance} km</strong>
				</div>
			)}
			{flightTime !== null && (
				<div className="mt-2 p-2 bg-green-100 text-green-800 rounded-lg">
					Flight time: <strong>{flightTime} hs</strong>
				</div>
			)}
		</div>
	)
}

export default CsvSelect;
