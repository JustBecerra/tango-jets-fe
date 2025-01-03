import React, { useState } from "react";
import { Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import { addFlight } from "../../../lib/actions/flights/actions";
import { getCookie } from "../../utils/getCookie";
import LoaderSpinner from "../Loaders/LoaderSpinner";
import { sendEmail } from "../../../lib/actions/emails/actions"
import { flightScheduledMessage } from "../../utils/emailMessage"
import { ModalStepper } from "../stepper/ModalStepper"
import { StepperButtons } from "../buttons/StepperButtons"
import { FlightInfo } from "../stepper/FlightInfo"

export interface formType {
	launchtime: Date
	to: string
	from: string
	price_cost: string
	price_revenue: number
	airship_name: string
	master_passenger: string
	createdby: string
}

const ModalFlightAdd: React.FC = () => {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [showToast, setShowToast] = useState(false)
	const [loading, setLoading] = useState(false)
	const [phase, setPhase] = useState("first")
	const [formData, setFormData] = useState<formType>({
		launchtime: new Date(),
		to: "",
		from: "",
		price_cost: "",
		price_revenue: 0,
		airship_name: "",
		master_passenger: "",
		createdby: "",
	})
	const handleToggleModal = () => {
		setIsModalOpen((prev) => !prev)
	}

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		setLoading(true)
		const formElement = event.target as HTMLFormElement
		const formData = new FormData(formElement)
		const flightData = Object.fromEntries(formData.entries())
		const name = getCookie("username")
		const transformedFlightData = {
			launchtime: new Date(flightData.launchtime as string).toISOString(),
			to: flightData.to as string,
			from: flightData.from as string,
			price_cost: flightData.price_cost,
			price_revenue: flightData.price_revenue,
			airship_name: flightData.airship_title,
			master_passenger: flightData.master_passenger,
			createdby: name,
		}
		const EmailInfo = {
			to: transformedFlightData.master_passenger,
			subject: "Flight scheduled!",
			text: flightScheduledMessage(transformedFlightData),
		}

		try {
			await addFlight(transformedFlightData)
			// await sendEmail(EmailInfo)
			setShowToast(true)
			setTimeout(() => {
				setShowToast(false)
				window.location.reload()
			}, 2000)
			setIsModalOpen(false)
		} catch (err) {
			console.error("Error adding flight:", err)
		} finally {
			setLoading(false)
		}
	}

	return (
		<>
			<button
				id="addFlightButton"
				className="block text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
				type="button"
				onClick={handleToggleModal}
			>
				Add Flight
			</button>

			{isModalOpen && (
				<div
					id="addFlightModal"
					tabIndex={-1}
					aria-hidden="true"
					className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-x-hidden overflow-y-auto backdrop-filter backdrop-blur-sm bg-opacity-50"
				>
					<div className="relative w-full max-w-2xl max-h-full">
						<div className="relative bg-white rounded-lg shadow dark:bg-gray-800">
							<div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
								<ModalStepper phase={phase} />

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
									id="addFlightForm"
									onSubmit={handleSubmit}
								>
									<FlightInfo
										phase={phase}
										formData={formData}
										setFormData={setFormData}
									/>
									<StepperButtons
										phase={phase}
										setPhase={setPhase}
									/>
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
							Flight added successfully.
						</div>
						<Toast.Toggle onClick={() => setShowToast(false)} />
					</Toast>
				</div>
			)}
		</>
	)
}

export default ModalFlightAdd;
