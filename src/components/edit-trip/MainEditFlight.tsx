import CsvSelect from "../stepper/prueba"
import { AutoComplete } from "../input/AutoComplete"
import { useMemo, useState } from "react"
import type { Airship, Flight } from "../table/TableModal"
import type { formType } from "../scheduler/SchedulerFrame"
import { editAction } from "../../../lib/actions/edit/actions"
import { getFlights } from "../../../lib/actions/flights/actions"
import useStore from "../../store/store"
import LoaderSpinner from "../Loaders/LoaderSpinner"
import { FaRegPlusSquare } from "react-icons/fa"

interface props {
	currentFlight: Flight
	airships: Airship[]
}

export interface formEditType {
	launchtime: Date
	to: string
	from: string
	airship_name: string
	price_cost: string
	price_revenue: number
	master_passenger: string
	companion_passengers: string[]
}

export const MainEditFlight = ({ currentFlight, airships }: props) => {
	const [formData, setFormData] = useState<formEditType>({
		launchtime: new Date(currentFlight.launchtime),
		to: currentFlight.to,
		from: currentFlight.from,
		airship_name: currentFlight.airship_name,
		price_cost: currentFlight.price_cost,
		price_revenue: currentFlight.price_revenue,
		master_passenger: currentFlight.master_passenger,
		companion_passengers: currentFlight.companion_passengers,
	})
	const [revenuePercentage, setRevenuePercentage] = useState(20)

	const [loading, setLoading] = useState(false)
	const [distance, setDistance] = useState<number | null>(null)
	const [flightTime, setFlightTime] = useState<number | null>(null)
	const updateFlights = useStore((state) => state.updateFlights)
	const handleSelectFrom = (value: string) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			from: value,
		}))
	}

	const airshipSeats = useMemo(
		() =>
			airships.find((airship) => airship.title === formData.airship_name)
				?.seats || 8,
		[]
	)

	const handleSelectTo = (value: string) => {
		setFormData((prevFormData) => ({
			...prevFormData,
			to: value,
		}))
	}

	const addCompanionOption = (e: any) => {
		e.preventDefault()
		setFormData((prev) => ({
			...prev,
			companion_passengers: [
				...prev.companion_passengers,
				"New Passenger",
			],
		}))
	}

	const getPercentage = ({
		cost,
		newPercentage = "20",
	}: {
		cost: string
		newPercentage?: string
	}): number => {
		if (cost === "") return 0

		const percentage = parseFloat(newPercentage)
		const costNumber = parseFloat(cost)

		const revenue = costNumber * (percentage / 100)
		return costNumber + revenue
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)

		try {
			const convertedData = new FormData()
			convertedData.append(
				"launchtime",
				formData.launchtime.toISOString()
			)
			convertedData.append("to", formData.to)
			convertedData.append("from", formData.from)
			convertedData.append("master_passenger", formData.master_passenger)
			convertedData.append("airship_name", formData.airship_name)
			convertedData.append("price_cost", formData.price_cost.toString())
			convertedData.append(
				"price_revenue",
				formData.price_revenue.toString()
			)
			convertedData.append(
				"companion_passengers",
				JSON.stringify(formData.companion_passengers)
			)

			await editAction({
				caseType: "flight",
				data: convertedData,
				id: currentFlight.id,
			})
			const newFlights = await getFlights()
			updateFlights(newFlights)

			window.location.href = "/Trips"
		} catch (error) {
			console.error("Error submitting flight:", error)
		} finally {
			setLoading(false)
		}
	}

	const handleDistanceCalculated = (calculatedDistance: number) => {
		setDistance(calculatedDistance)
	}

	const handleFlightTimeCalculated = (calculatedFlightTime: number) => {
		setFlightTime(calculatedFlightTime)
	}
	return (
		<div className="w-[800px] h-[600px]">
			<form className="flex flex-col gap-4" onSubmit={handleSubmit}>
				<CsvSelect
					labelFrom="From"
					labelTo="To"
					onSelectFrom={handleSelectFrom}
					onSelectTo={handleSelectTo}
					onDistanceCalculated={handleDistanceCalculated}
					onFlightTimeCalculated={handleFlightTimeCalculated}
					toDefaultValue={formData.to}
					fromDefaultValue={formData.from}
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
						value={formData.launchtime.toISOString().slice(0, 16)}
						onChange={(e) =>
							setFormData((prevFormData) => ({
								...prevFormData,
								launchtime: new Date(e.target.value),
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
				<div className="flex gap-2">
					<div className="w-1/2">
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
									price_revenue: getPercentage({
										cost: e.target.value,
										newPercentage:
											revenuePercentage.toString(),
									}),
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
					<div className="w-1/2">
						<label
							htmlFor="price_revenue"
							className="block text-sm font-medium"
						>
							Price with{" "}
							<input
								value={revenuePercentage}
								type="number"
								style={{
									appearance: "textfield",
									WebkitAppearance: "none",
									MozAppearance: "textfield",
								}}
								onChange={(e) => {
									setRevenuePercentage(
										parseFloat(e.target.value)
									),
										setFormData((prevFormData) => ({
											...prevFormData,

											price_revenue: getPercentage({
												cost: prevFormData.price_cost,
												newPercentage: e.target.value,
											}),
										}))
								}}
								placeholder="20%"
								className="w-[8%]"
							/>
							% commission
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
				</div>
				<div className="grid grid-cols-3 w-full gap-2">
					{formData.companion_passengers.map((companion, index) => (
						<div className="w-full" key={index}>
							<label>Companion #{index + 1}</label>
							<input
								id={`companion ${index}`}
								name={`companion ${index}`}
								value={companion}
								className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
								onChange={(e) =>
									setFormData((prevFormData) => ({
										...prevFormData,
										companion_passengers:
											prevFormData.companion_passengers.map(
												(c, i) =>
													i === index
														? e.target.value
														: c
											),
									}))
								}
							/>
						</div>
					))}
					{formData.companion_passengers.length < airshipSeats && (
						<>
							<div
								onClick={addCompanionOption}
								className="w-full cursor-pointer flex items-center bg-green-600 hover:bg-green-800 justify-center block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
							>
								<button
									type="button"
									className="block w-fit py-2 mt-1 text-sm text-white rounded-lg focus:ring-blue-500 focus:border-blue-500"
								>
									Add Passenger
								</button>
								<FaRegPlusSquare className="ml-2  h-8 w-8 text-white" />
							</div>
						</>
					)}
				</div>

				{loading && (
					<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
						<LoaderSpinner />
					</div>
				)}
				<button
					type="submit"
					className="focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 bg-green-600 text-white border-gray-500 hover:text-white hover:bg-green-800 focus:ring-gray-600"
				>
					Confirm Change
				</button>
			</form>
		</div>
	)
}
