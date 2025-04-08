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

  const [activeComponent, setActiveComponent] = useState<
		"FlightInfo" | "RoundTrip" | "MultiCity"
  >("FlightInfo")

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
						onClick={() => setActiveComponent("RoundTrip")}
						className={`px-4 py-2 rounded-lg ${
							activeComponent === "RoundTrip"
								? "bg-blue-500 text-white"
								: "bg-gray-200"
						}`}
					>
						Round Trip
					</button>
					<button
						type="button"
						onClick={() => setActiveComponent("MultiCity")}
						className={`px-4 py-2 rounded-lg ${
							activeComponent === "MultiCity"
								? "bg-blue-500 text-white"
								: "bg-gray-200"
						}`}
					>
						Multi City
					</button>
				</div>

				{activeComponent === "FlightInfo" ? (
					<FlightInfo
						phase={phase}
						setPhase={setPhase}
						flightData={flightData}
						flightID={flightID}
						setShowToast={setShowToast}
					/>
				) : activeComponent === "RoundTrip" ? (
					<RoundTrip
						phase={phase}
						setPhase={setPhase}
						flightData={flightData}
						flightID={flightID}
						setShowToast={setShowToast}
					/>
				) : (
					<MultiCity
						phase={phase}
						flightData={flightData}
						flightID={flightID}
						setShowToast={setShowToast}
					/>
				)}
			</div>
		</div>
  )
};

export default SchedulerFrame;
