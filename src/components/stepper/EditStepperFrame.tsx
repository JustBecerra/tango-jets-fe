import { useState } from "react";
import { VerticalStepper } from "./VerticalStepper";
import { EditForms } from "./EditForms";
import type { Flight } from "../table/TableModal";
import { ArrowLeftIcon } from "@heroicons/react/20/solid";

interface props {
  flightRequested: Flight;
}

export const EditStepperFrame = ({ flightRequested }: props) => {
  const [localPhase, setLocalPhase] = useState(flightRequested.phase);
  const [currentFlight, setCurrentFlight] = useState<Flight>(flightRequested);

  return (
    <div className="flex h-full justify-center items-center gap-8">
      <div className="flex flex-col h-full justify-center items-start">
        <div className="flex w-full justify-between mb-2">
          <button
            type="button"
            className="focus:ring-4 focus:outline-none mb-2 focus:ring-blue-300 rounded-lg border text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600"
            onClick={() => (window.location.href = "/Trips")}
          >
            {/* <ArrowLeftIcon className="w-5 h-5 mr-2" /> */}
            Back
          </button>
          <a
            href="/itinerary.pdf"
            download
            className="focus:ring-4 focus:outline-none mb-2 focus:ring-blue-300 rounded-lg border text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 bg-gray-700 text-gray-300 border-gray-500 hover:text-white hover:bg-gray-600 focus:ring-gray-600 ml-auto"
          >
            Download Itinerary
          </a>
        </div>
        <EditForms
          localPhase={localPhase}
          setLocalPhase={setLocalPhase}
          currentFlight={currentFlight}
          setCurrentFlight={setCurrentFlight}
        />
      </div>
      {currentFlight && <VerticalStepper phase={currentFlight.phase} />}
    </div>
  );
};
