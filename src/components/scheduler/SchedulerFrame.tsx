import { useState } from "react";
import { ModalStepper } from "../stepper/ModalStepper";
import { addFlight, getFlights } from "../../../lib/actions/flights/actions";
import { getCookie } from "../../utils/getCookie";
import { flightScheduledMessage } from "../../utils/emailMessage";
import { HiCheck } from "react-icons/hi";
import { FlightInfo } from "../stepper/FlightInfo";
import { StepperButtons } from "../buttons/StepperButtons";
import useStore from "../../store/store";
import LoaderSpinner from "../Loaders/LoaderSpinner";
import { sendEmail } from "../../../lib/actions/emails/actions";
import type { Flight } from "../table/TableModal";
import { MultiCity } from "../stepper/MultiCity";
import { RoundTrip } from "../stepper/RoundTrip";
export interface formType {
  launchtime: Date;
  to: string;
  from: string;
  master_passenger: string;
  type_of: string;
  associated_to: string;
  first_longitude: string;
  first_latitude: string;
  second_longitude: string;
  second_latitude: string;
  flight_time: string;
}

export interface airshipFormType {
  price_cost: number;
  price_revenue: number;
  airship_name: string;
  percentage: number;
  extra_price: number;
}

const SchedulerFrame = ({
  flightData,
  flightID,
}: {
  flightData: Flight | null;
  flightID: string | null;
}) => {
  const [phase, setPhase] = useState("first");
  const [showToast, setShowToast] = useState(false);
  const airships = useStore((state) => state.airships);
  const [activeComponent, setActiveComponent] = useState<
    "FlightInfo" | "Oneway" | "RoundTrip"
  >("FlightInfo");
  const [formData, setFormData] = useState<formType[]>([
		{
			launchtime: new Date(),
			to: "",
			from: "",
			master_passenger:
				flightData !== null ? flightData.master_passenger : "",
			type_of: flightID ? "connection" : "initial",
			associated_to: flightID ? flightID : "",
			first_longitude: "",
			first_latitude: "",
			second_longitude: "",
			second_latitude: "",
			flight_time: "00:00",
		},
  ])
  const [airshipData, setAirshipData] = useState<airshipFormType[]>([
		{
			airship_name: "",
			price_cost: 0,
			price_revenue: 0,
			percentage: 20,
			extra_price: 0,
		},
  ])
  const [loading, setLoading] = useState(false)
  const { updateFlights } = useStore((state) => state)

  const handleSubmit = async (event: React.FormEvent) => {
		event.preventDefault()
		setLoading(true)

		const name = getCookie("username")
		const transformedFlightDataArray = formData.map((trip) => ({
			launchtime: trip.launchtime.toISOString().slice(0, 16),
			to: trip.to,
			from: trip.from,
			master_passenger: trip.master_passenger,
			createdby: name,
			type_of: trip.type_of,
			associated_to: trip.associated_to,
			first_longitude: trip.first_longitude,
			first_latitude: trip.first_latitude,
			second_longitude: trip.second_longitude,
			second_latitude: trip.second_latitude,
			flight_time: trip.flight_time,
		}))

		try {
			const newFlights = await Promise.all(
				transformedFlightDataArray.map((flightData) =>
					addFlight(flightData)
				)
			)

			// const EmailInfo = {
			//   to: transformedFlightData.master_passenger,
			//   subject: "Flight pre-scheduled!",
			//   url: flightScheduledMessage({
			//     airshipData,
			//     airships,
			//     tripID: newFlight.id,
			//   }),
			//   type_of_email: "quote",
			// };

			// await sendEmail(EmailInfo); mover todo esto a un boton en el stepper
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
				<div className="flex space-x-4">
					<button
						type="button"
						onClick={() => setActiveComponent("FlightInfo")}
						className={`px-4 py-2 rounded-lg ${
							activeComponent === "FlightInfo"
								? "bg-blue-500 text-white"
								: "bg-gray-200"
						}`}
					>
						One Way
					</button>
					<button
						type="button"
						onClick={() => setActiveComponent("Oneway")}
						className={`px-4 py-2 rounded-lg ${
							activeComponent === "Oneway"
								? "bg-blue-500 text-white"
								: "bg-gray-200"
						}`}
					>
						Round Trip
					</button>
					<button
						type="button"
						onClick={() => setActiveComponent("RoundTrip")}
						className={`px-4 py-2 rounded-lg ${
							activeComponent === "RoundTrip"
								? "bg-blue-500 text-white"
								: "bg-gray-200"
						}`}
					>
						Multi City
					</button>
				</div>

				<form onSubmit={handleSubmit} className="space-y-6">
					<div className="rounded-xl">
						{activeComponent === "FlightInfo" ? (
							<FlightInfo
								phase={phase}
								formData={formData[0]}
								setFormData={setFormData}
								airshipData={airshipData}
								setAirshipData={setAirshipData}
							/>
						) : activeComponent === "RoundTrip" ? (
							<RoundTrip
								phase={phase}
								formData={formData}
								setFormData={setFormData}
								airshipData={airshipData}
								setAirshipData={setAirshipData}
							/>
						) : (
							<MultiCity
								phase={phase}
								formData={formData}
								setFormData={setFormData}
								airshipData={airshipData}
								setAirshipData={setAirshipData}
							/>
						)}
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
};

export default SchedulerFrame;
