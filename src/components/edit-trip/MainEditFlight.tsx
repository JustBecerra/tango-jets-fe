import CsvSelect from "../stepper/prueba"
import { AutoComplete } from "../input/AutoComplete"
import { useState } from "react"
import type { Airship, Flight } from "../table/TableModal"
import type { formType } from "../scheduler/SchedulerFrame"

interface props {
	currentFlight: Flight
	airships: Airship[]
}

export interface formEditType {
	launchtime: string
	to: string
	from: string
	airship_name: string
	price_cost: string
	price_revenue: number
	master_passenger: string
}

export const MainEditFlight = ({ currentFlight, airships }: props) => {
	const [formData, setFormData] = useState<formEditType>({
		launchtime: currentFlight.launchtime,
		to: currentFlight.to,
		from: currentFlight.from,
		airship_name: currentFlight.airship_name,
		price_cost: currentFlight.price_cost,
		price_revenue: currentFlight.price_revenue,
		master_passenger: currentFlight.master_passenger,
	})
	const [distance, setDistance] = useState<number | null>(null)
	const [flightTime, setFlightTime] = useState<number | null>(null)

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

	const getPercentage = (cost: string): number => {
		if (cost === "") return 0

		const percentage = 20
		const costNumber = parseFloat(cost)

		const revenue = costNumber * (percentage / 100)
		return costNumber + revenue
	}

	const handleDistanceCalculated = (calculatedDistance: number) => {
		setDistance(calculatedDistance)
	}

	const handleFlightTimeCalculated = (calculatedFlightTime: number) => {
		setFlightTime(calculatedFlightTime)
	}
	return (
		<div className="border-2 border-red-200 border-solid w-[1000px] h-[600px]">
			<form>
				<CsvSelect
					labelFrom="From"
					labelTo="To"
					onSelectFrom={handleSelectFrom}
					onSelectTo={handleSelectTo}
					onDistanceCalculated={handleDistanceCalculated}
					onFlightTimeCalculated={handleFlightTimeCalculated}
				/>
				<div className="flex flex-col justify-end">
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
						value={formData.launchtime}
						onChange={(e) =>
							setFormData((prevFormData) => ({
								...prevFormData,
								launchtime: new Date(e.target.value)
									.toISOString()
									.slice(0, 16),
							}))
						}
						min={new Date().toISOString().slice(0, 16)}
						className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
						required
					/>
				</div>
				<div>
					<label
						htmlFor="master_passenger"
						className="block text-sm font-medium"
					>
						Lead Passenger
					</label>
					<AutoComplete
						value={formData.master_passenger}
						setter={
							setFormData as unknown as React.Dispatch<
								React.SetStateAction<formType>
							>
						}
					/>
				</div>
				<div>
					<label
						htmlFor="airship_title"
						className="block text-sm font-medium"
					>
						Airship Name
					</label>
					<select
						onChange={(e) =>
							setFormData((prevFormData) => ({
								...prevFormData,
								airship_name: e.target.value,
							}))
						}
						value={formData.airship_name}
						className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
					>
						<option value="" disabled>
							Select an airship
						</option>
						{airships.map((airship, index) => (
							<option value={airship.title} key={index}>
								{airship.title}
							</option>
						))}
					</select>
				</div>
				<div>
					<label
						htmlFor="price_cost"
						className="block text-sm font-medium"
					>
						Price cost
					</label>
					<input
						value={formData.price_cost}
						onChange={(e) =>
							setFormData((prevFormData) => ({
								...prevFormData,
								price_cost: e.target.value,
								price_revenue: getPercentage(e.target.value),
							}))
						}
						type="number"
						id="price_cost"
						name="price_cost"
						style={{
							appearance: "textfield",
							WebkitAppearance: "none",
							MozAppearance: "textfield",
						}}
						className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
						required
					/>
				</div>
				<div>
					<label
						htmlFor="price_revenue"
						className="block text-sm font-medium"
					>
						Price with 20% commission
					</label>

					<input
						id="price_revenue"
						name="price_revenue"
						value={formData.price_revenue}
						onChange={(e) =>
							setFormData((prevFormData) => ({
								...prevFormData,
								price_revenue: parseInt(e.target.value),
							}))
						}
						className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
						required
					/>
				</div>
			</form>
		</div>
	)
}
