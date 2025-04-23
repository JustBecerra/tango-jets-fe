import { useState } from "react"
import LoaderSpinner from "../../Loaders/LoaderSpinner"
import { sendEmail } from "../../../../lib/actions/emails/actions"
import { flightScheduledMessage } from "../../../utils/emailMessage"
import type { Airship } from "../../table/TableModal"
import { FaRegMinusSquare, FaRegPlusSquare } from "react-icons/fa"
import type { airshipFormType } from "../../scheduler/SchedulerFrame"

interface props {
	master_passenger: string
	currentFlightID: number
	listAirships: Airship[]
}

export const ChooseAirshipModal = ({
	master_passenger,
	currentFlightID,
	listAirships,
}: props) => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [loading, setLoading] = useState(false)
	const [chosenAirships, setChosenAirships] = useState<airshipFormType[]>([
		{
			airship_name: "",
			price_cost: 0,
			price_revenue: 0,
			percentage: 20,
			extra_price: 0,
		},
	])

	const handleToggleModal = () => {
		setIsModalOpen((prev) => !prev)
	}

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		setLoading(true)
		try {
			const EmailInfo = {
				to: master_passenger,
				subject: "Flight pre-scheduled!",
				url: flightScheduledMessage({
					airshipData: chosenAirships,
					airships: listAirships,
					tripID: currentFlightID,
				}),
				type_of_email: "quote",
			}

			await sendEmail(EmailInfo)
		} catch (err) {
			console.log(err)
		} finally {
            setLoading(false)
            handleToggleModal()
        }
	}

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

	const addAirshipOption = () => {
		setChosenAirships((prev) => [
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
		const newAirshipData = chosenAirships.filter(
			(airship) => airship !== chosenAirships[airshipindex]
		)
		setChosenAirships(newAirshipData)
	}

	return (
		<>
			<button
				className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-green-600 hover:bg-green-700 focus:ring-green-800"
				onClick={handleToggleModal}
			>
				Send Quote
			</button>

			{isModalOpen && (
				<div
					id="addClientModal"
					tabIndex={-1}
					aria-hidden="true"
					className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto backdrop-filter backdrop-blur-sm bg-opacity-50"
				>
					<div className="relative w-full rounded max-w-2xl max-h-full bg-gray-800">
						<div className="relative bg-gray-800 bg-opacity-30 backdrop-blur-md rounded-lg shadow-lg">
							<div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
								<p className="text-white">
									Choose airships for quote
								</p>
								<button
									type="button"
									className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
									onClick={handleToggleModal}
								>
									<svg
										aria-hidden="true"
										className="w-5 h-5"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											fillRule="evenodd"
											d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
											clipRule="evenodd"
										></path>
									</svg>
									<span className="sr-only">Close modal</span>
								</button>
							</div>

							<div className="p-6 space-y-6">
								<form onSubmit={handleSubmit}>
									<div className="h-[500px] overflow-y-auto">
										<div className="bg-white rounded-lg border border-gray-200 p-4">
											<h3 className="text-sm font-medium text-gray-700 mb-3">
												Aircraft Selection
											</h3>

											{chosenAirships.map(
												(airship, index) => (
													<div
														key={index}
														className="mb-4 p-3 bg-gray-50 rounded-lg border border-gray-200"
													>
														<div className="flex items-center justify-between mb-2">
															<label className="text-sm font-medium text-gray-700">
																Aircraft
															</label>
															{index > 0 && (
																<button
																	type="button"
																	className="text-red-500 hover:text-red-700"
																	onClick={() =>
																		subtractAirshipOption(
																			index
																		)
																	}
																>
																	<FaRegMinusSquare className="w-4 h-4" />
																</button>
															)}
														</div>

														<select
															value={
																airship.airship_name
															}
															onChange={(e) =>
																setChosenAirships(
																	(
																		prevFormData
																	) =>
																		prevFormData.map(
																			(
																				item,
																				idx
																			) =>
																				index ===
																				idx
																					? {
																							...item,
																							airship_name:
																								e
																									.target
																									.value,
																					  }
																					: item
																		)
																)
															}
															className="block w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 mb-3"
														>
															<option
																value=""
																disabled
															>
																Select an
																aircraft
															</option>
															{listAirships.map(
																(
																	airship,
																	idx
																) => (
																	<option
																		value={
																			airship.title
																		}
																		key={
																			idx
																		}
																	>
																		{
																			airship.title
																		}
																	</option>
																)
															)}
														</select>

														<div className="space-y-3">
															<div>
																<label
																	htmlFor="price_cost"
																	className="block text-sm font-medium text-gray-700 mb-1"
																>
																	Price cost
																</label>
																<input
																	value={
																		airship.price_cost
																	}
																	onChange={(
																		e
																	) => {
																		const newCost =
																			parseInt(
																				e
																					.target
																					.value
																			) ||
																			0
																		const {
																			revenue,
																			roundingDifference,
																		} =
																			getPercentage(
																				{
																					cost: e
																						.target
																						.value,
																					newPercentage:
																						airship.percentage.toString(),
																				}
																			)

																		const totalRevenue =
																			revenue +
																			(airship.extra_price ||
																				0)

																		setChosenAirships(
																			(
																				prevFormData
																			) =>
																				prevFormData.map(
																					(
																						item,
																						idx
																					) =>
																						index ===
																						idx
																							? {
																									...item,
																									price_cost:
																										newCost,
																									price_revenue:
																										totalRevenue,
																							  }
																							: item
																				)
																		)
																	}}
																	type="number"
																	id="price_cost"
																	name="price_cost"
																	style={{
																		appearance:
																			"textfield",
																		WebkitAppearance:
																			"none",
																		MozAppearance:
																			"textfield",
																	}}
																	className="block w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
																	required
																/>
															</div>

															<div>
																<label
																	htmlFor="price_revenue"
																	className="block text-sm font-medium text-gray-700 mb-1"
																>
																	Price with{" "}
																	<input
																		value={
																			airship.percentage
																		}
																		type="number"
																		style={{
																			appearance:
																				"textfield",
																			WebkitAppearance:
																				"none",
																			MozAppearance:
																				"textfield",
																			width: "20px",
																		}}
																		onChange={(
																			e
																		) => {
																			const newPercentage =
																				parseFloat(
																					e
																						.target
																						.value
																				) ||
																				0
																			const {
																				revenue,
																				roundingDifference,
																			} =
																				getPercentage(
																					{
																						cost: airship.price_cost.toString(),
																						newPercentage:
																							e
																								.target
																								.value,
																					}
																				)

																			const totalRevenue =
																				revenue +
																				(airship.extra_price ||
																					0)

																			setChosenAirships(
																				(
																					prevFormData
																				) =>
																					prevFormData.map(
																						(
																							item,
																							idx
																						) =>
																							index ===
																							idx
																								? {
																										...item,
																										percentage:
																											newPercentage,
																										price_revenue:
																											totalRevenue,
																								  }
																								: item
																					)
																			)
																		}}
																		placeholder="20%"
																		className="w-[4%][appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
																	/>
																	% commission
																	+{" "}
																	<input
																		value={
																			airship.extra_price ===
																			0
																				? ""
																				: airship.extra_price
																		}
																		type="number"
																		style={{
																			appearance:
																				"textfield",
																			WebkitAppearance:
																				"none",
																			MozAppearance:
																				"textfield",
																			width: "35px",
																		}}
																		onChange={(
																			e
																		) => {
																			const newExtraPrice =
																				parseFloat(
																					e
																						.target
																						.value
																				) ||
																				0
																			const {
																				revenue,
																				roundingDifference,
																			} =
																				getPercentage(
																					{
																						cost: airship.price_cost.toString(),
																						newPercentage:
																							airship.percentage.toString(),
																					}
																				)

																			const totalRevenue =
																				revenue +
																				newExtraPrice

																			setChosenAirships(
																				(
																					prevFormData
																				) =>
																					prevFormData.map(
																						(
																							item,
																							idx
																						) =>
																							index ===
																							idx
																								? {
																										...item,
																										extra_price:
																											newExtraPrice,
																										price_revenue:
																											totalRevenue,
																								  }
																								: item
																					)
																			)
																		}}
																		placeholder="Extra"
																		className="w-[4%][appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
																	/>
																</label>

																<input
																	id="price_revenue"
																	name="price_revenue"
																	value={
																		airship.price_revenue
																	}
																	onChange={(
																		e
																	) =>
																		setChosenAirships(
																			(
																				prevFormData
																			) =>
																				prevFormData.map(
																					(
																						item,
																						idx
																					) =>
																						index ===
																						idx
																							? {
																									...item,
																									price_revenue:
																										parseInt(
																											e
																												.target
																												.value
																										) ||
																										0,
																							  }
																							: item
																				)
																		)
																	}
																	className="block w-full px-3 py-2 text-sm text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
																	required
																/>
																<p className="text-sm text-gray-500 mt-1">
																	Rounding:{" "}
																	{getPercentage(
																		{
																			cost: airship.price_cost.toString(),
																			newPercentage:
																				airship.percentage.toString(),
																		}
																	).roundingDifference.toFixed(
																		2
																	)}
																</p>
															</div>
														</div>
													</div>
												)
											)}

											<button
												type="button"
												className="flex items-center text-sm text-blue-600 hover:text-blue-800"
												onClick={addAirshipOption}
											>
												<FaRegPlusSquare className="w-4 h-4 mr-1" />
												Add Aircraft Option
											</button>
										</div>
									</div>

                                    <div className="flex items-center py-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
										<button
											type="button"
											className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
											onClick={handleToggleModal}
										>
											Cancel
										</button>
										<button
											id="submitClient"
											type="submit"
											className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
										>
											Send
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			)}

			{loading && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
					<div className="p-6 rounded-2xl">
						<LoaderSpinner />
					</div>
				</div>
			)}
		</>
	)
}
