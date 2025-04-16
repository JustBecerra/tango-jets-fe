import React, { useState } from "react"
import type { Airship } from "../../table/TableModal"
import LoaderSpinner from "../../Loaders/LoaderSpinner"

interface props {
	listAirships: Airship[]
	chosenAirship: string
	to: string
	from: string
	launchtime: string
	arrivaltime: string
}

export const EditAircraftModal = ({
	listAirships,
	chosenAirship,
	to,
	from,
	launchtime,
	arrivaltime,
}: props) => {
	const [data, setData] = useState({
		airship_name: chosenAirship,
		to,
		from,
		launchtime,
		arrivaltime,
	})
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [showToast, setShowToast] = useState(false)
	const [loading, setLoading] = useState(false)

	const handleToggleModal = () => {
		setIsModalOpen((prev) => !prev)
	}

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		setLoading(true)
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
						<div className="relative bg-gray-800 bg-opacity-30 backdrop-blur-md rounded-lg shadow-lg">
							<div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-600">
								<p className="text-white">
									Modify segment details
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
									<div className="h-fit mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
										<div>
											<label
												htmlFor="airship"
												className="block text-sm font-medium text-gray-900 dark:text-gray-200"
											>
												Airship
											</label>
											<select
												onChange={(e) =>
													setData((prev) => ({
														...prev,
														airship_name:
															e.target.value,
													}))
												}
												value={data.airship_name}
												className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
											>
												<option value="" disabled>
													Select an airship
												</option>
												{listAirships.map(
													(airship, index) => (
														<option
															value={
																airship.title
															}
															key={index}
														>
															{airship.title}
														</option>
													)
												)}
											</select>
										</div>
										<div>
											<label
												htmlFor="from"
												className="block text-sm font-medium text-gray-900 dark:text-gray-200"
											>
												From
											</label>
											<input
												type="text"
												id="from"
												name="from"
												value={data.from}
												onChange={(e) =>
													setData((prev) => ({
														...prev,
														from: e.target.value,
													}))
												}
												className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												required
											/>
										</div>
										<div>
											<label
												htmlFor="to"
												className="block text-sm font-medium text-gray-900 dark:text-gray-200"
											>
												To
											</label>
											<input
												type="text"
												id="to"
												name="to"
												value={data.to}
												onChange={(e) =>
													setData((prev) => ({
														...prev,
														to: e.target.value,
													}))
												}
												className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												required
											/>
										</div>
										<div>
											<label
												htmlFor="airship"
												className="block text-sm font-medium text-gray-900 dark:text-gray-200"
											>
												Launch Time
											</label>
											<input
												type="text"
												id="fullname"
												name="fullname"
												value={data.to}
												onChange={(e) =>
													setData((prev) => ({
														...prev,
														launch: e.target.value,
													}))
												}
												className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												required
											/>
										</div>
										<div>
											<label
												htmlFor="airship"
												className="block text-sm font-medium text-gray-900 dark:text-gray-200"
											>
												Arrival Time
											</label>
											<input
												type="text"
												id="fullname"
												name="fullname"
												value={data.to}
												onChange={(e) =>
													setData((prev) => ({
														...prev,
														to: e.target.value,
													}))
												}
												className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												required
											/>
										</div>
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
							<div className="flex ml-6 items-center py-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
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
						</div>
					</div>
				</div>
			)}
		</>
	)
}
