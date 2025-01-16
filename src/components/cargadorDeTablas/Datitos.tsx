import React, { useEffect, useState } from "react";
import { getAirships } from "../../../lib/actions/airships/actions";
import useStore from "../../store/store";
import { getFlights } from "../../../lib/actions/flights/actions";
import { getClients } from "../../../lib/actions/clients/actions";
import { getCookie } from "../../utils/getCookie";

const DepartingSoon = React.lazy(() => import("../Home/DepartingSoon"));
const ClientTable = React.lazy(() => import("../Home/ClientTable"));
const MissingInfoCli = React.lazy(() => import("../Home/MissingInfoCli"));
const InFlight = React.lazy(() => import("../Home/InFlight"));
const RecentlyLanded = React.lazy(() => import("../Home/RecentlyLanded"));
export const Datitos = () => {
  const { updateAirships, updateFlights, updateClients, flights, clients } =
    useStore((state) => state);
  const [filteredFlights, setFilteredFlights] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const flightsRequested = await getFlights();
      updateFlights(flightsRequested);
      const airshipsRequested = await getAirships();
      updateAirships(airshipsRequested);
      const clientsRequested = await getClients();
      updateClients(clientsRequested);

      const username = getCookie("username");
      const filteredFlights = flightsRequested.filter(
        (flight: { createdby: string }) => flight.createdby === username
      );
      setFilteredFlights(filteredFlights);
    };
    fetchData();
  }, []);

  const handleNewTrip = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void => {
    event.preventDefault();
    window.location.href = "/Scheduler";
  };

  return (
    <div className="p-4">
      {/* Diseño superior (tres tablas en fila) */}
      <div className="flex justify-end -mb-0">
        <button
          type="button"
          className="text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:over:border-gray-600 dark:hover:text-gray-400 dark:text-white dark:bg-gray-600 dark:focus:ring-gray-800"
          onClick={handleNewTrip}
        >
          ➕ New Trip
        </button>
      </div>
      <div className="grid grid-cols-3 gap-6 mb-4">
        <div className="bg-white overflow-y-auto rounded-lg shadow-lg ">
          <DepartingSoon flights={filteredFlights} />
        </div>
        <div className="bg-white overflow-y-auto rounded-lg shadow-lg ">
          <InFlight flights={filteredFlights} />
        </div>
        <div className="bg-white overflow-y-auto rounded-lg shadow-lg ">
          <RecentlyLanded flights={filteredFlights} />
        </div>
      </div>

      {/* Diseño inferior (dos tablas, ajustadas en tamaño) */}
      <div className=" mt-8 flex gap-6">
        <div className="bg-white flex-[3.1] overflow-y-auto rounded-lg shadow-lg h-[300px] scrollbar-hide">
          <MissingInfoCli clients={clients} />
        </div>
        {/* ClientTable: Más pequeño */}
        <div className="bg-white flex-[1.5] overflow-y-auto rounded-lg shadow-lg h-[300px] scrollbar-hide">
          <ClientTable clients={filteredFlights} />
        </div>
      </div>
    </div>
  );
};
