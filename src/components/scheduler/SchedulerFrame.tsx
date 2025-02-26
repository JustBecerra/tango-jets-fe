import { useState } from "react"
import { ModalStepper } from "../stepper/ModalStepper"
import { addFlight, getFlights } from "../../../lib/actions/flights/actions"
import { getCookie } from "../../utils/getCookie"
import { flightScheduledMessage } from "../../utils/emailMessage"
import { HiCheck } from "react-icons/hi"
import { FlightInfo } from "../stepper/FlightInfo"
import { StepperButtons } from "../buttons/StepperButtons"
import useStore from "../../store/store"
import LoaderSpinner from "../Loaders/LoaderSpinner"
import { sendEmail } from "../../../lib/actions/emails/actions"
import type { Flight } from "../table/TableModal"

export interface formType {
	launchtime: Date
	to: string
	from: string
	master_passenger: string
	type_of: string
	associated_to: string
}

export interface airshipFormType {
	price_cost: number
	price_revenue: number
	airship_name: string
	percentage: number
}

const SchedulerFrame = ({
	FlightsForAssociation,
}: {
	FlightsForAssociation: Flight[]
}) => {
	const [phase, setPhase] = useState("first")
	const [showToast, setShowToast] = useState(false)
	const airships = useStore((state) => state.airships)
	const [formData, setFormData] = useState<formType>({
		launchtime: new Date(),
		to: "",
		from: "",
		master_passenger: "",
		type_of: "initial",
		associated_to: "",
	})
	const [airshipData, setAirshipData] = useState<airshipFormType[]>([
		{
			airship_name: "",
			price_cost: 0,
			price_revenue: 0,
			percentage: 20,
		},
	])
	const [loading, setLoading] = useState(false)
	const { updateFlights } = useStore((state) => state)

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		setLoading(true)
		const {
			launchtime,
			to,
			from,
			master_passenger,
			type_of,
			associated_to,
		} = formData

		const name = getCookie("username")
		const transformedFlightData = {
			launchtime: launchtime.toISOString().slice(0, 16),
			to,
			from,
			master_passenger,
			createdby: name,
			type_of,
			associated_to,
		}

		try {
			const newFlight = await addFlight(transformedFlightData)

			const EmailInfo = {
				to: transformedFlightData.master_passenger,
				subject: "Flight pre-scheduled!",
				text: flightScheduledMessage({
					transformedFlightData,
					airshipData,
					airships,
					tripID: newFlight.id,
				}),
			}

			await sendEmail(EmailInfo)
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
		<div className="relative overflow-hidden max-h-[90vh] h-[800px] w-full max-w-[1400px] rounded-2xl">
			{showToast && (
				<div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
					<div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/90 backdrop-blur-sm shadow-lg">
						<div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-50">
							<HiCheck className="h-5 w-5 text-green-500" />
						</div>
						<p className="text-sm font-medium text-gray-700">
							Flight added successfully
						</p>
						<button
							onClick={() => setShowToast(false)}
							className="ml-2 text-gray-400 hover:text-gray-500"
						>
							×
						</button>
					</div>
				</div>
			)}

			<div className="px-8 pt-6">
				<ModalStepper phase={phase} />
			</div>

			<div className="p-8 space-y-8 h-[90%]">
				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="rounded-xl p-6">
						<FlightInfo
							phase={phase}
							formData={formData}
							setFormData={setFormData}
							airshipData={airshipData}
							setAirshipData={setAirshipData}
							FlightsForAssociation={FlightsForAssociation}
						/>
					</div>

					<div className="pt-4">
						<StepperButtons
							phase={phase}
							setPhase={setPhase}
							operation="add"
						/>
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
	)
}

export default SchedulerFrame
