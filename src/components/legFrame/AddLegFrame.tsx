import { useState } from "react";
import { HiCheck } from "react-icons/hi";
import { FlightInfo } from "../stepper/FlightInfo";
import type { Flight } from "../table/TableModal";

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
  pax: number;
}

export interface airshipFormType {
  price_cost: number;
  price_revenue: number;
  airship_name: string;
  percentage: number;
  extra_price: number;
}

const AddLegFrame = ({
  flightData,
  flightID,
}: {
  flightData: Flight | null;
  flightID: string | null;
}) => {
  const [phase, setPhase] = useState("first");
  const [showToast, setShowToast] = useState(false);

  return (
    <div className="relative overflow-hidden max-h-[90vh] h-[800px] w-full max-w-[1400px] rounded-3xl bg-white shadow-xl">
      {showToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-gray-100">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-50">
              <HiCheck className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-sm font-medium text-gray-800">
              Leg added successfully
            </p>
            <button
              onClick={() => setShowToast(false)}
              className="ml-2 text-gray-400 hover:text-gray-500 transition-colors"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="p-10 space-y-8 h-[90%]">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-medium text-gray-800">
            Schedule Flight
          </h2>
        </div>

        <div className="bg-gray-50 p-9 rounded-2xl">
            <FlightInfo
              phase={phase}
              setPhase={setPhase}
              flightData={flightData}
              flightID={flightID}
              setShowToast={setShowToast}
            />
        </div>

      </div>
    </div>
  );
};

export default AddLegFrame
