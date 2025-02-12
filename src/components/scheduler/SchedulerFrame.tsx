import { useState } from "react";
import { ModalStepper } from "../stepper/ModalStepper";
import { addFlight, getFlights } from "../../../lib/actions/flights/actions";
import { getCookie } from "../../utils/getCookie";
import { flightScheduledMessage } from "../../utils/emailMessage";
import { Toast } from "flowbite-react";
import { HiCheck } from "react-icons/hi";
import { FlightInfo } from "../stepper/FlightInfo";
import { StepperButtons } from "../buttons/StepperButtons";
import useStore from "../../store/store";
import LoaderSpinner from "../Loaders/LoaderSpinner";
import { sendEmail } from "../../../lib/actions/emails/actions";
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
		},
	])
	const [loading, setLoading] = useState(false)
	const { updateFlights } = useStore((state) => state)

	const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		setLoading(true)
		const { launchtime, to, from, master_passenger } = formData

		const name = getCookie("username")
		const transformedFlightData = {
			launchtime: launchtime.toISOString().slice(0, 16),
			to,
			from,
			master_passenger,
			createdby: name,
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
		<div className="relative overflow-x-auto overflow-y-hidden max-h-[800px] h-[500px] bg-[#166ba3] bg-opacity-30 backdrop-blur-md w-full max-w-[100%] shadow-md sm:rounded-lg px-6">
			{showToast && (
				<div className="fixed top-4 left-1/2 transform -translate-x-1/2">
					<Toast>
						<div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500">
							<HiCheck className="h-5 w-5" />
						</div>
						<p className="ml-3 text-sm font-normal">
							Flight added successfully.
						</p>
						<Toast.Toggle onClick={() => setShowToast(false)} />
					</Toast>
				</div>
			)}
			<ModalStepper phase={phase} />
			<div className="p-6 space-y-6 h-[90%]">
				<form onSubmit={handleSubmit}>
					<FlightInfo
						phase={phase}
						formData={formData}
						setFormData={setFormData}
						airshipData={airshipData}
						setAirshipData={setAirshipData}
						FlightsForAssociation={FlightsForAssociation}
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

export default SchedulerFrame;
