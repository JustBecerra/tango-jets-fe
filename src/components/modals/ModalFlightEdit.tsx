import React, { useState } from "react"
import type { Flight } from "../table/TableModal"
import { ModalStepper } from "../stepper/ModalStepper"
import { StepperButtons } from "../buttons/StepperButtons"
import { EditFlightInfo } from "../stepper/EditFlightInfo"

interface Props {
	formData: Flight
	handleChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => void
	handleEdit: (event: React.FormEvent<HTMLFormElement>) => void
	setOpenModal: (open: boolean) => void
}

const ModalFlightEdit = ({
	formData,
	handleChange,
	handleEdit,
	setOpenModal,
}: Props) => {
	const [phase, setPhase] = useState("first")
	return (
		<div
			id="editFlightModal"
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
							onClick={() => setOpenModal(false)}
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
						<form id="editFlightForm" onSubmit={handleEdit}>
							<EditFlightInfo
								formData={formData}
								handleChange={handleChange}
								phase={phase}
							/>
							<StepperButtons
								phase={phase}
								setPhase={setPhase}
								operation="edit"
							/>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ModalFlightEdit
