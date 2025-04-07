import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import type { formType } from "../scheduler/SchedulerFrame";

type SelectHandler = (params: { value: string; index: number }) => void
interface CsvSelectProps {
    labelFrom?: string
    labelTo?: string
    onSelectFrom?: SelectHandler
    onSelectTo?: SelectHandler
    onDistanceCalculated?: (distance: number) => void
    formData: formType
    setFormData: React.Dispatch<React.SetStateAction<formType[]>>
    formDataIndex: number
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
    setFormData: React.Dispatch<React.SetStateAction<formType[]>>,
    index?: number
): number => {
    if (!lat1 || !lon1 || !lat2 || !lon2) return 0

    const R = 6371 // Radio de la Tierra en km
    const dLat = (lat2 - lat1) * (Math.PI / 180)
    const dLon = (lon2 - lon1) * (Math.PI / 180)
    if (index) {
        setFormData((prevFormData: any) => {
            if (Array.isArray(prevFormData)) {
                const updatedFormData = [...prevFormData]
                updatedFormData[index] = {
                    ...updatedFormData[index],
                    first_latitude: lat1.toString(),
                    first_longitude: lon1.toString(),
                    second_latitude: lat2.toString(),
                    second_longitude: lon2.toString(),
                }
                return updatedFormData
            }
            return prevFormData
        })
    } 

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
    if (!distance) return "00:00"

    const timeInHours = distance / speed // Get time in decimal hours
    const hours = Math.floor(timeInHours) // extraigo tiempo en horas
    const minutes = Math.round((timeInHours - hours) * 60) // extraigo tiempo en minutos

    // formateo para que este separado por :
    const formattedTime = `${String(hours).padStart(2, "0")}:${String(
        minutes
    ).padStart(2, "0")}`

    return formattedTime
}

const LocationSelector: React.FC<CsvSelectProps> = ({
    labelFrom = "From",
    labelTo = "To",
    onSelectFrom,
    onSelectTo,
    onDistanceCalculated,
    formData,
    setFormData,
    formDataIndex,
}) => {
    const [fromAirport, setFromAirport] = useState<any>(null)
    const [toAirport, setToAirport] = useState<any>(null)
    const [fromResults, setFromResults] = useState<any[]>([])
    const [toResults, setToResults] = useState<any[]>([])
    const [distance, setDistance] = useState<number | null>(null)

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

    const handleFlightTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/[^0-9:]/g, "") // Allow only numbers and ":"

        // If user deletes everything, allow empty input
        if (value === "") {
            setFormData((prevFormData: formType[]) => {
                const updatedFormData = [...prevFormData]
                updatedFormData[formDataIndex] = {
                    ...updatedFormData[formDataIndex],
                    flight_time: "",
                }
                    
                return updatedFormData
            })
        }

        // Extract hours and minutes
        const parts = value.split(":")
        let hours = parts[0] ? parseInt(parts[0], 10) : 0
        let minutes = parts[1] ? parseInt(parts[1], 10) : 0

        // Ensure minutes are between 0-59
        if (minutes > 59) minutes = 59

        // Format time properly
        const formattedTime = `${String(hours).padStart(2, "0")}:${String(
            minutes
        ).padStart(2, "0")}`

        setFormData((prevFormData: any) => {
            
                const updatedFormData = [...prevFormData]
                updatedFormData[formDataIndex] = {
                    ...updatedFormData[formDataIndex],
                    flight_time: formattedTime,
                }
                return updatedFormData
            
        })
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
				<div className="relative flex-1 mb-4" ref={fromRef}>
					<label className="block text-sm font-medium text-gray-700">
						{labelFrom}
					</label>
					<input
						type="text"
						value={formData.from}
						onChange={(e) => {
							setFormData((prev: any) => {
								const updatedFormData = [...prev]
								updatedFormData[formDataIndex] = {
									...updatedFormData[formDataIndex],
									from: e.target.value,
								}
								return updatedFormData
							})
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
										setFromAirport(place)
										setFormData((prev: any) => {
											const updatedFormData = [...prev]
											updatedFormData[formDataIndex] = {
												...updatedFormData[
													formDataIndex
												],
												from: place.display,
											}
											return updatedFormData
										})
										setFromResults([])
										if (onSelectFrom)
											onSelectFrom({
												value: place.id,
												index: formDataIndex ?? 999,
											})
										if (toAirport) {
											const dist = calculateDistance(
												place.lat,
												place.lon,
												toAirport.lat,
												toAirport.lon,
												setFormData,
												formDataIndex
											)
											setDistance(dist)
											setFormData((prevFormData: any) => {
												const updatedFormData = [
													...prevFormData,
												]
												updatedFormData[formDataIndex] =
													{
														...updatedFormData[
															formDataIndex
														],
														flight_time:
															calculateFlightTime(
																dist
															),
													}
												return updatedFormData
											})

											if (onDistanceCalculated)
												onDistanceCalculated(dist)
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
				<div className="relative flex-1 mb-4" ref={toRef}>
					<label className="block text-sm font-medium text-gray-700">
						{labelTo}
					</label>
					<input
						type="text"
						value={formData.to}
						onChange={(e) => {
							setFormData((prev: any) => {
								const updatedFormData = [...prev]
								updatedFormData[formDataIndex] = {
									...updatedFormData[formDataIndex],
									to: e.target.value,
								}
								return updatedFormData
							})
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
										setToAirport(place)
										setFormData((prev: any) => {
											const updatedFormData = [...prev]
											updatedFormData[formDataIndex] = {
												...updatedFormData[
													formDataIndex
												],
												to: place.display,
											}
											return updatedFormData
										})
										setToResults([])
										if (onSelectTo)
											onSelectTo({
												value: place.id,
												index: formDataIndex ?? 999,
											})
										if (fromAirport) {
											const dist = calculateDistance(
												fromAirport.lat,
												fromAirport.lon,
												place.lat,
												place.lon,
												setFormData,
												formDataIndex
											)
											setDistance(dist)
											setFormData((prevFormData: any) => {
												const updatedFormData = [
													...prevFormData,
												]
												updatedFormData[formDataIndex] =
													{
														...updatedFormData[
															formDataIndex
														],
														flight_time:
															calculateFlightTime(
																dist
															),
													}
												return updatedFormData
											})

											if (onDistanceCalculated)
												onDistanceCalculated(dist)
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
			{formData.flight_time !== null && (
				<div className="flex gap-2 mt-2 p-2 bg-green-100 text-green-800 rounded-lg">
					<label className="block text-sm font-medium text-gray-700">
						<strong>Flight time:</strong>
					</label>
					<input
						type="text"
						onChange={handleFlightTimeChange}
						value={formData.flight_time}
						className="bg-transparent focus:outline-none"
					/>
				</div>
			)}
		</div>
	)
}

export default LocationSelector;
