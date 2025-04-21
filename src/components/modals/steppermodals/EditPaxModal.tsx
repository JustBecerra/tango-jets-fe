import React, { useState } from "react"
import LoaderSpinner from "../../Loaders/LoaderSpinner"
import { editAction } from "../../../../lib/actions/edit/actions"
import { getFlights } from "../../../../lib/actions/flights/actions"
import useStore from "../../../store/store"

interface props {
	masterPassenger: string
	companionPassengers: string[]
	currentFlightID: number
}

export const EditPaxModal = ({
	masterPassenger,
	companionPassengers,
	currentFlightID,
}: props) => {
	const [data, setData] = useState({
		master_passenger: masterPassenger,
		companion_passengers: companionPassengers,
	})
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [loading, setLoading] = useState(false)
	const updateFlights = useStore((state) => state.updateFlights)
	const handleToggleModal = () => {
		setIsModalOpen((prev) => !prev)
	}

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		setLoading(true)
		try {
			const convertedData = new FormData()
			convertedData.append("master_passenger", data.master_passenger)
			convertedData.append(
				"companion_passenger",
				JSON.stringify(data.companion_passengers)
			)

			await editAction({
				caseType: "flight",
				data: convertedData,
				id: currentFlightID,
			})

			const newFlights = await getFlights()
			updateFlights(newFlights)

			setTimeout(() => {
				window.location.reload()
			}, 2000)
		} catch (err) {
			console.log(err)
		}
	}
	return (
		<>
			<button
				onClick={handleToggleModal}
				className="text-gray-500 px-3 py-1 rounded-md border border-gray-200 flex items-center text-sm"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-4 w-4 mr-1"
					viewBox="0 0 20 20"
					fill="currentColor"
				>
					<path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
				</svg>
				Edit
			</button>
			{isModalOpen && (
				<div
					id="addClientModal"
					tabIndex={-1}
					aria-hidden="true"
					className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto backdrop-filter backdrop-blur-sm bg-opacity-50"
				>
					<div className="relative w-full rounded max-w-2xl max-h-full bg-gray-800">
						<div className="relative bg-gray-800 bg-opacity-30 backdrop-blur-md max-h-[600px] rounded-lg shadow-lg">
							<div className="flex items-center justify-between p-4 border-b rounded-t border-gray-600">
								<p className="text-white">Pax</p>
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
									<div className="h-fit mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
										<div>
											<label
												htmlFor="master_passenger"
												className="block text-sm font-medium text-gray-900 dark:text-gray-200"
											>
												Lead Passenger
											</label>
											<input
												type="text"
												id="master_passenger"
												name="master_passenger"
												value={data.master_passenger}
												onChange={(e) =>
													setData((prev) => ({
														...prev,
														master_passenger:
															e.target.value,
													}))
												}
												className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												required
											/>
										</div>
										{data.companion_passengers.map(
											(item, index) => (
												<div key={index}>
													<label
														htmlFor="companion_passengers"
														className="block text-sm font-medium text-gray-900 dark:text-gray-200"
													>
														Companion Passenger{" "}
														{index + 1}
													</label>
													<input
														type="text"
														id="companion_passengers"
														name="companion_passengers"
														value={
															data
																.companion_passengers[
																index
															]
														}
														onChange={(e) =>
															setData((prev) => ({
																...prev,
																companion_passenger:
																	e.target
																		.value,
															}))
														}
														className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
														required
													/>
												</div>
											)
										)}
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
											Modify
										</button>
									</div>
								</form>
							</div>
							{loading && (
								<div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm">
									<div className="p-6 rounded-2xl">
										<LoaderSpinner />
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	)
}
