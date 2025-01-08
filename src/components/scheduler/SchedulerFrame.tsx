import { useState } from "react"
import { ModalStepper } from "../stepper/ModalStepper"
import { addFlight } from "../../../lib/actions/flights/actions"
import { getCookie } from "../../utils/getCookie"
import { flightScheduledMessage } from "../../utils/emailMessage"
import { Toast } from "flowbite-react"
import { HiCheck } from "react-icons/hi"
import { FlightInfo } from "../stepper/FlightInfo"
import { StepperButtons } from "../buttons/StepperButtons"
export interface formType {
	launchtime: Date
	to: string
	from: string
	price_cost: string
	price_revenue: number
	airship_name: string
	master_passenger: string
}
const SchedulerFrame = () => {
	const [phase, setPhase] = useState("first")
	const [showToast, setShowToast] = useState(false)
	const [formData, setFormData] = useState<formType>({
		launchtime: new Date(),
		to: "",
		from: "",
		price_cost: "",
		price_revenue: 0,
		airship_name: "",
		master_passenger: "",
	})

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		const {
			launchtime,
			to,
			from,
			price_cost,
			price_revenue,
			airship_name,
			master_passenger,
		} = formData

		const name = getCookie("username")
		const transformedFlightData = {
			launchtime: launchtime.toISOString().slice(0, 16),
			to,
			from,
			price_cost,
			price_revenue,
			airship_name,
			master_passenger,
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
				window.location.href = "/Trips"
			}, 2000)
		} catch (err) {
			console.error("Error adding flight:", err)
		}
	}
	return (
		<div className="relative overflow-x-auto overflow-y-auto max-h-[800px] w-full max-w-[100%] shadow-md sm:rounded-lg px-6">
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
			<ModalStepper phase={phase} />
			<div className="p-6 space-y-6">
				<form onSubmit={handleSubmit}>
					<FlightInfo
						phase={phase}
						formData={formData}
						setFormData={setFormData}
					/>
					<StepperButtons
						phase={phase}
						setPhase={setPhase}
						operation="add"
					/>
				</form>
			</div>
		</div>
	)
}

export default SchedulerFrame
