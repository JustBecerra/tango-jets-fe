import React, { useState } from "react";
import { FaRegPlusSquare, FaRegMinusSquare } from "react-icons/fa";
import useStore from "../../store/store";
import CsvSelect from "./prueba";
import { AutoComplete } from "../input/AutoComplete";
import type { airshipFormType, formType } from "../scheduler/SchedulerFrame";
import type { Flight } from "../table/TableModal";
import StarRanking from "./StarsRank";

interface props {
	phase: string
	formData: formType[]
	setFormData: React.Dispatch<React.SetStateAction<formType[]>>
	airshipData: airshipFormType[]
	setAirshipData: React.Dispatch<React.SetStateAction<airshipFormType[]>>
}

export const MultiCity = ({
	phase,
	formData,
	setFormData,
	airshipData,
	setAirshipData,
}: props) => {
	const { airships } = useStore((state) => state)
	const [distance, setDistance] = useState<number | null>(null)
	const [flightTime, setFlightTime] = useState<number | null>(null)

	const getPercentage = ({
		cost,
		newPercentage = "20",
	}: {
		cost: string
		newPercentage?: string
	}): { revenue: number; roundingDifference: number } => {
		if (cost === "") return { revenue: 0, roundingDifference: 0 }

		const percentage = parseFloat(newPercentage)
		const costNumber = parseFloat(cost)

		const revenue = costNumber * (percentage / 100)
		const roundedRevenue = Math.ceil(costNumber + revenue)
		const roundingDifference = roundedRevenue - (costNumber + revenue)

		return { revenue: roundedRevenue, roundingDifference }
	}

	const handleSelectFrom = (value: string) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			from: value,
		}))
	}

	const handleSelectTo = (value: string) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			to: value,
		}))
	}

	const handleDistanceCalculated = (calculatedDistance: number) => {
		setDistance(calculatedDistance)
	}

	const handleFlightTimeCalculated = (calculatedFlightTime: number) => {
		setFlightTime(calculatedFlightTime)
	}

	const addAirshipOption = () => {
		setAirshipData((prev) => [
			...prev,
			{
				airship_name: "",
				price_cost: 0,
				price_revenue: 0,
				percentage: 20,
				extra_price: 0,
			},
		])
	}

	const subtractAirshipOption = (airshipindex: number) => {
		const newAirshipData = airshipData.filter(
			(airship) => airship !== airshipData[airshipindex]
		)
		setAirshipData(newAirshipData)
	}

	const PhaseFields = () => {
		if (phase === "first") {
			return (
				<>
					{formData.map((elem) => (
						<div className="h-[300px] w-[800px] grid grid-auto-rows grid-cols-1 gap-6 sm:grid-cols-2">
							<CsvSelect
								labelFrom="From"
								labelTo="To"
								onSelectFrom={handleSelectFrom}
								onSelectTo={handleSelectTo}
								onDistanceCalculated={handleDistanceCalculated}
								onFlightTimeCalculated={
									handleFlightTimeCalculated
								}
								formData={elem}
								setFormData={setFormData}
							/>
							<div className="flex flex-col justify-end h-fit">
								<label
									htmlFor="launchtime"
									className="block text-sm font-medium"
								>
									Launch Time
								</label>
								<input
									type="datetime-local"
									id="launchtime"
									name="launchtime"
									value={elem.launchtime
										.toISOString()
										.slice(0, 16)}
									onChange={(e) =>
										setFormData((prevFormData) => ({
											...prevFormData,
											launchtime: new Date(
												e.target.value
											),
										}))
									}
									min={new Date().toISOString().slice(0, 16)}
									className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
									required
								/>
							</div>
							<div className="flex flex-col justify-end h-fit">
								<label
									htmlFor="master_passenger"
									className="block text-sm font-medium"
								>
									Lead Passenger
								</label>
								<AutoComplete
									value={elem.master_passenger}
									setter={setFormData}
								/>
							</div>
						</div>
					))}
				</>
			)
		} else if (phase === "second") {
			return (
				<div className="h-[280px] w-[800px] mb-6 grid grid-cols-1 gap-12 sm:grid-cols-2 overflow-y-auto">
					{airshipData.map((airship, airshipindex) => {
						const { revenue, roundingDifference } = getPercentage({
							cost: airship.price_cost.toString(),
							newPercentage: airship.percentage.toString(),
						})
						const totalRevenue = revenue + airship.extra_price
						return (
							<>{/* Aquí va el contenido del segundo paso */}</>
						)
					})}
				</div>
			)
		} else {
			return (
				<div className="h-[280px] w-[800px] mb-6 grid grid-cols-1 gap-12 sm:grid-cols-2 overflow-y-auto">
					{formData.map((elem) => (
						<div>
							<h2>To: {elem.to === "" ? "TBD" : elem.to}</h2>
							<h2>
								From: {elem.from === "" ? "TBD" : elem.from}
							</h2>
							<h2>
								Launch Time:{" "}
								{elem.launchtime.toISOString().slice(0, 16)}
							</h2>
							<h2>
								Distance:{" "}
								{distance !== null
									? `${distance.toFixed(2)} km`
									: "TBD"}
							</h2>
							<h2>
								Flight Time:{" "}
								{elem.flight_time !== null
									? `${elem.flight_time} hours`
									: "TBD"}
							</h2>
							<h2>
								Lead Passenger:{" "}
								{elem.master_passenger === ""
									? "TBD"
									: elem.master_passenger}
							</h2>
						</div>
					))}
				</div>
			)
		}
	}

	return <div className="py-2">{PhaseFields()}</div>
}
