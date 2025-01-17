import useStore from "../../store/store"
import { AutoComplete } from "../input/AutoComplete"
import type { airshipFormType, formType } from "../scheduler/SchedulerFrame"
import { FaRegPlusSquare } from "react-icons/fa"
interface props {
	phase: string
	formData: formType
	setFormData: React.Dispatch<React.SetStateAction<formType>>
	airshipData: airshipFormType[]
	setAirshipData: React.Dispatch<React.SetStateAction<airshipFormType[]>>
}

export const FlightInfo = ({
	phase,
	formData,
	setFormData,
	airshipData,
	setAirshipData,
}: props) => {
	const { to, from, launchtime, master_passenger } = formData
	const { airships } = useStore((state) => state)
	const getPercentage = (cost: string): number => {
		if (cost === "") return 0

		const percentage = 20
		const costNumber = parseFloat(cost)

		const revenue = costNumber * (percentage / 100)
		return costNumber + revenue
	}

	const addAirshipOption = () => {
		setAirshipData((prev) => [
			...prev,
			{
				airship_name: "",
				price_cost: 0,
				price_revenue: 0,
			},
		])
	}
	const PhaseFields = () => {
		if (phase === "first") {
			return (
				<div className="h-[200px] w-[800px] mb-6 grid grid-cols-1 gap-12 sm:grid-cols-2">
					<div>
						<label
							htmlFor="to"
							className="block text-sm font-medium"
						>
							To
						</label>
						<input
							type="text"
							id="to"
							name="to"
							value={to}
							onChange={(e) =>
								setFormData((prevFormData) => ({
									...prevFormData,
									to: e.target.value,
								}))
							}
							className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
							required
						/>
					</div>
					<div>
						<label
							htmlFor="from"
							className="block text-sm font-medium"
						>
							From
						</label>
						<input
							type="text"
							id="from"
							name="from"
							value={from}
							onChange={(e) =>
								setFormData((prevFormData) => ({
									...prevFormData,
									from: e.target.value,
								}))
							}
							className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
							required
						/>
					</div>
					<div>
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
							value={launchtime.toISOString().slice(0, 16)}
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
							Master Passenger
						</label>
						<AutoComplete
							value={master_passenger}
							setter={setFormData}
						/>
					</div>
				</div>
			)
		} else if (phase === "second") {
			return (
				<div className="h-[200px] w-[800px] mb-6 grid grid-cols-1 gap-12 sm:grid-cols-2 overflow-y-auto">
					{airshipData.map((airship, index) => (
						<>
							<div key={index}>
								<label
									htmlFor="airship_title"
									className="block text-sm font-medium"
								>
									Airship Name
								</label>
								<select
									onChange={(e) =>
										setAirshipData((prevFormData) =>
											prevFormData.map((item, index) =>
												index ===
												prevFormData.length - 1
													? {
															...item,
															airship_name:
																e.target.value,
													  }
													: item
											)
										)
									}
									value={airship.airship_name}
									className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
								>
									<option value="" disabled>
										Select an airship
									</option>
									{airships.map((airship, index) => (
										<option
											value={airship.title}
											key={index}
										>
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
									value={airship.price_cost}
									onChange={(e) =>
										setAirshipData((prevFormData) =>
											prevFormData.map((item, index) =>
												index ===
												prevFormData.length - 1
													? {
															...item,
															price_cost:
																parseInt(
																	e.target
																		.value
																),
															price_revenue:
																getPercentage(
																	e.target
																		.value
																),
													  }
													: item
											)
										)
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
									Price revenue
								</label>

								<input
									id="price_revenue"
									name="price_revenue"
									value={airship.price_revenue}
									disabled
									className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
									required
								/>
							</div>
							<div className="flex items-center">
								<FaRegPlusSquare
									onClick={addAirshipOption}
									className="mx-auto cursor-pointer h-10 w-10 text-gray-300"
								/>
							</div>
						</>
					))}
					{/* <div>
						<label className="block text-sm font-medium">
							Number of companions
						</label>
						<select
							onChange={(e) =>
								setNumberCompanions(parseInt(e.target.value))
							}
							value={numberCompanions}
							className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
						>
							{arrayOfCompanions.map((number) => (
								<option value={number}>{number}</option>
							))}
						</select>
					</div>
					{numberCompanions > 0 &&
						Array.from({ length: numberCompanions }).map(
							(_, index) => (
								<div key={index}>
									<label className="block text-sm font-medium">
										Companion #{index + 1}
									</label>
									<input
										className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
										value={
											companion_passengers[index] || ""
										}
										onChange={(e) =>
											setFormData((prevFormData) => {
												const oldArray = [
													...prevFormData.companion_passengers,
												]
												oldArray[index] = e.target.value
												return {
													...prevFormData,
													companion_passengers:
														oldArray,
												}
											})
										}
									/>
								</div>
							)
						)} */}
				</div>
			)
		} else {
			return (
				<div className="h-[200px] w-[800px] mb-6 grid grid-cols-1 gap-12 sm:grid-cols-2 overflow-y-auto">
					<h2>To: {to === "" ? "TBD" : to}</h2>
					<h2>From: {from === "" ? "TBD" : from}</h2>
					<h2>
						Launch Time: {launchtime.toISOString().slice(0, 16)}
					</h2>
					<h2>
						Master Passenger:{" "}
						{master_passenger === "" ? "TBD" : master_passenger}
					</h2>
					{/* <h2>
						Airship: {airship_name === "" ? "TBD" : airship_name}
					</h2>
					<h2>Cost: {price_cost === "" ? "TBD" : price_cost}</h2>
					<h2>
						Cost Plus Revenue:{" "}
						{price_revenue === 0 ? "TBD" : price_revenue}
					</h2> */}
					{/* <div>
						<h2>Companion Passengers: </h2>
						{companion_passengers.length
							? companion_passengers.map((companion) => (
									<h3>{companion}</h3>
							  ))
							: "TBD"}
					</div> */}
				</div>
			)
		}
	}
	return <div className="border-t border-gray-600 py-2">{PhaseFields()}</div>
}
