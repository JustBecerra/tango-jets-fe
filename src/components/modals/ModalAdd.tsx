import React, { useState } from "react";
import { Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import { addClient } from "../../../lib/actions/clients/actions";
import LoaderSpinner from "../Loaders/LoaderSpinner";
import { nationalities } from "../../utils/nationalities"
import { z } from "zod"

const Client = z.object({
	fullname: z.string().refine((value) => {
		const words = value.trim().split(/\s+/)
		return words.length >= 2
	}),
	nationality: z.string(),
	email: z.string().email("it needs to be an email"),
	identification: z
		.string()
		.min(8, "ID needs to have a minimum of 8 characters"),
	passport: z.string().min(6, "ID needs to have a minimum of 6 characters"),
	weight: z.string().min(2, "needs to have a minimum of 2 characters"),
})

const ModalAdd: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [showToast, setShowToast] = useState(false)
	const [loading, setLoading] = useState(false)
	const [errors, setErrors] = useState({
		fullname: "",
		nationality: "",
		email: "",
		identification: "",
		passport: "",
		weight: "",
	})

	const handleToggleModal = () => {
		setIsModalOpen((prev) => !prev)
	}

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		setLoading(true)

		try {
			const formElement = event.target as HTMLFormElement
			const formData = new FormData(formElement)
			const clientData = Object.fromEntries(formData.entries())

			const parsedData = Client.parse({
				fullname: clientData.fullname,
				nationality: clientData.nationality,
				email: clientData.email,
				identification: clientData.identification,
				passport: clientData.passport,
				weight: clientData.weight,
			})

			const transformedClientData = {
				fullname: parsedData.fullname,
				nationality: parsedData.nationality,
				email: parsedData.email,
				identification: parsedData.identification,
				passport: parsedData.passport,
				weight: parsedData.weight,
			}

			const response = await addClient(transformedClientData)
			setShowToast(true)
			setTimeout(() => {
				setShowToast(false)
				window.location.reload()
			}, 2000)
			setIsModalOpen(false)
		} catch (err) {
			console.error("Error adding client:", err)
			if (err instanceof z.ZodError) {
				const newErrors = {
					fullname:
						err.errors.find((e) => e.path[0] === "fullname")
							?.message || "",
					nationality:
						err.errors.find((e) => e.path[0] === "nationality")
							?.message || "",
					email:
						err.errors.find((e) => e.path[0] === "email")
							?.message || "",
					identification:
						err.errors.find((e) => e.path[0] === "identification")
							?.message || "",
					passport:
						err.errors.find((e) => e.path[0] === "passport")
							?.message || "",
					weight:
						err.errors.find((e) => e.path[0] === "weight")
							?.message || "",
				}
				setErrors(newErrors)
			}
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<button
				id="addClientButton"
				className="block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
				type="button"
				onClick={handleToggleModal}
			>
				Add Client
			</button>

			{isModalOpen && (
				<div
					id="addClientModal"
					tabIndex={-1}
					aria-hidden="true"
					className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto backdrop-filter backdrop-blur-sm bg-opacity-50"
				>
					<div className="relative w-full max-w-2xl max-h-full">
						<div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
							<div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
								<h3 className="text-xl font-semibold text-gray-900 dark:text-white">
									Add New Client
								</h3>
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
								<form
									id="addClientForm"
									onSubmit={handleSubmit}
								>
									<div className="h-fit mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
										<div>
											<label
												htmlFor="fullname"
												className="block text-sm font-medium text-gray-900 dark:text-gray-200"
											>
												Full name
											</label>
											<input
												type="text"
												id="fullname"
												name="fullname"
												className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												required
											/>
											{errors.fullname && (
												<p className="text-red-500 text-xs">
													{errors.fullname}
												</p>
											)}
										</div>
										<div>
											<label
												htmlFor="nationality"
												className="block text-sm font-medium text-gray-900 dark:text-gray-200"
											>
												Nationality
											</label>
											<select
												id="nationality"
												name="nationality"
												className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												required
											>
												<option defaultValue="">
													Select an option
												</option>
												{nationalities.map(
													(nationality) => (
														<option
															value={nationality}
														>
															{nationality}
														</option>
													)
												)}
											</select>
											{errors.nationality && (
												<p className="text-red-500 text-xs">
													{errors.nationality}
												</p>
											)}
										</div>
										<div>
											<label
												htmlFor="email"
												className="block text-sm font-medium text-gray-900 dark:text-gray-200"
											>
												Email
											</label>
											<input
												type="email"
												id="email"
												name="email"
												className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												required
											/>
											{errors.email && (
												<p className="text-red-500 text-xs">
													{errors.email}
												</p>
											)}
										</div>
										<div>
											<label
												htmlFor="identification"
												className="block text-sm font-medium text-gray-900 dark:text-gray-200"
											>
												ID
											</label>
											<input
												type="text"
												id="identification"
												name="identification"
												className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												required
											/>
											{errors.identification && (
												<p className="text-red-500 text-xs">
													{errors.identification}
												</p>
											)}
										</div>
										<div>
											<label
												htmlFor="passport"
												className="block text-sm font-medium text-gray-900 dark:text-gray-200"
											>
												Passport
											</label>
											<input
												type="text"
												id="passport"
												name="passport"
												className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												required
											/>
											{errors.passport && (
												<p className="text-red-500 text-xs">
													{errors.passport}
												</p>
											)}
										</div>
										<div>
											<label
												htmlFor="weight"
												className="block text-sm font-medium text-gray-900 dark:text-gray-200"
											>
												Weight
											</label>
											<input
												type="text"
												id="weight"
												name="weight"
												className="block w-full px-4 py-2 mt-1 text-sm text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
												required
											/>
											{errors.weight && (
												<p className="text-red-500 text-xs">
													{errors.weight}
												</p>
											)}
										</div>
									</div>
									<div className="flex justify-start items-center py-6 space-x-2 border-t border-gray-200 rounded-b dark:border-gray-600">
										<button
											id="submitClient"
											type="submit"
											className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
										>
											Add Client
										</button>
										<button
											type="button"
											className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
											onClick={handleToggleModal}
										>
											Cancel
										</button>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			)}

			{loading && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
					<LoaderSpinner />
				</div>
			)}

			{showToast && (
				<div className="fixed top-4 left-1/2 transform -translate-x-1/2">
					<Toast>
						<div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
							<HiCheck className="h-5 w-5" />
						</div>
						<div className="ml-3 text-sm font-normal">
							Client added successfully.
						</div>
						<Toast.Toggle onClick={() => setShowToast(false)} />
					</Toast>
				</div>
			)}
		</>
	)
}

export default ModalAdd;
