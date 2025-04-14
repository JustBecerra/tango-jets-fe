import { useState } from "react";
import { HiCheck } from "react-icons/hi";
import { FlightInfo } from "../stepper/FlightInfo";
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
  pax: number;
}

export interface airshipFormType {
  price_cost: number;
  price_revenue: number;
  airship_name: string;
  percentage: number;
  extra_price: number;
}

const SchedulerFrame = () => {
  const [phase, setPhase] = useState("first");
  const [showToast, setShowToast] = useState(false);
  const [activeComponent, setActiveComponent] = useState<string>("FlightInfo");

  const handleSelectComponent = (activeComponent: string) => {
    setActiveComponent(activeComponent);
    setPhase("first");
  };

  return (
    <div className="flex max-h-[90vh] md:h-[600px] h-[800px] w-full max-w-[1400px] rounded-3xl bg-white shadow-xl">
      {showToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
          <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white/95 backdrop-blur-md shadow-lg border border-gray-100">
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-green-50">
              <HiCheck className="h-5 w-5 text-green-500" />
            </div>
            <p className="text-sm font-medium text-gray-800">
              Flight added successfully
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

      <div className="px-10 pt-10 space-y-8 h-[90%]">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-2xl font-medium text-gray-800">
            Schedule Flight
          </h2>
          <div className="flex space-x-3">
            <button
              type="button"
              onClick={() => handleSelectComponent("FlightInfo")}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeComponent === "FlightInfo"
                  ? "bg-blue-500 text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              One Way
            </button>
            <button
              type="button"
              onClick={() => handleSelectComponent("RoundTrip")}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeComponent === "RoundTrip"
                  ? "bg-blue-500 text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Round Trip
            </button>
            <button
              type="button"
              onClick={() => handleSelectComponent("MultiCity")}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ${
                activeComponent === "MultiCity"
                  ? "bg-blue-500 text-white shadow-sm"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              Multi City
            </button>
          </div>
        </div>

        <div className="bg-gray-50 px-8 rounded-2xl">
          {/* bg-gray-50 */}
          {activeComponent === "FlightInfo" ? (
            <FlightInfo
              phase={phase}
              setPhase={setPhase}
              setShowToast={setShowToast}
            />
          ) : activeComponent === "RoundTrip" ? (
            <RoundTrip
              phase={phase}
              setPhase={setPhase}
              setShowToast={setShowToast}
            />
          ) : (
            <MultiCity
              phase={phase}
              setPhase={setPhase}
              setShowToast={setShowToast}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SchedulerFrame;
