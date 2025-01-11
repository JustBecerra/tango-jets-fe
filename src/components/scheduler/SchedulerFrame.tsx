import { useState } from "react"
import { ModalStepper } from "../stepper/ModalStepper"
import { addFlight, getFlights } from "../../../lib/actions/flights/actions"
import { getCookie } from "../../utils/getCookie"
import { flightScheduledMessage } from "../../utils/emailMessage"
import { Toast } from "flowbite-react"
import { HiCheck } from "react-icons/hi"
import { FlightInfo } from "../stepper/FlightInfo"
import { StepperButtons } from "../buttons/StepperButtons"
import useStore from "../../store/store"
import LoaderSpinner from "../Loaders/LoaderSpinner"
export interface formType {
	launchtime: Date
	to: string
	from: string
	price_cost: string
	price_revenue: number
	airship_name: string
	master_passenger: string
	companion_passengers: string[]
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
		companion_passengers: [],
	})
	const [loading, setLoading] = useState(false)
	const { updateFlights } = useStore((state) => state)

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		setLoading(true)
		const {
			launchtime,
			to,
			from,
			price_cost,
			price_revenue,
			airship_name,
			master_passenger,
			companion_passengers,
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
			companion_passengers,
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
			const flights = await getFlights()
			updateFlights(flights)
			setShowToast(true)
			setTimeout(() => {
				setShowToast(false)
				window.location.href = "/Trips"
			}, 2000)
		} catch (err) {
			console.error("Error adding flight:", err)
		} finally {
			setLoading(false)
		}
	}
	return (
		<div className="relative overflow-x-auto overflow-y-auto max-h-[800px] w-full max-w-[100%] shadow-md sm:rounded-lg px-6">
			{showToast && (
				<div className="fixed top-4 left-1/2 transform -translate-x-1/2">
					<Toast>
						<div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500">
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
			{loading && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
					<LoaderSpinner />
				</div>
			)}
		</div>
	)
}

export default SchedulerFrame
