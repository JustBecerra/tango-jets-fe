import React, { useEffect, useState } from "react";
import { getAirships } from "../../../lib/actions/airships/actions";
import useStore from "../../store/store";
import { getFlights } from "../../../lib/actions/flights/actions";
import { getClients } from "../../../lib/actions/clients/actions";
import { getCookie } from "../../utils/getCookie";

interface Client {
  email: string | null;
  fullname: string | null;
  id: string | null;
  identification: string | null;
  nacionality: string | null;
  pasaport: string | null;
  weight: number | null;
}

const DepartingSoon = React.lazy(() => import("../Home/DepartingSoon"));
const ClientTable = React.lazy(() => import("../Home/ClientTable"));
const MissingInfoCli = React.lazy(() => import("../Home/MissingInfoCli"));
const InFlight = React.lazy(() => import("../Home/InFlight"));
const RecentlyLanded = React.lazy(() => import("../Home/RecentlyLanded"));

export const Datitos = () => {
  const { updateAirships, updateFlights, updateClients, flights, clients } =
    useStore((state) => state);
  const [filteredFlights, setFilteredFlights] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const flightsRequested = await getFlights();
      updateFlights(flightsRequested);
      const airshipsRequested = await getAirships();
      updateAirships(airshipsRequested);
      const clientsRequested = await getClients();
      updateClients(clientsRequested);

      const username = getCookie("username");
      const filteredClients = clientsRequested.filter(
        (client: Client) =>
          client.email === null ||
          client.fullname === null ||
          client.id === null ||
          client.identification === null ||
          client.nacionality === null ||
          client.pasaport === null ||
          client.weight === null
      );

      setFilteredClients(filteredClients);

      const filteredFlights = flightsRequested.filter(
        (flight: { createdby: string }) => flight.createdby === username
      );
      setFilteredFlights(filteredFlights);
    };
    fetchData();
  }, []);

  return (
    <div className="p-4">
      {/* Diseño superior (tres tablas en fila) */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
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
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white col-span-2 overflow-y-auto rounded-lg shadow-lg h-[300px] scrollbar-hide">
          <MissingInfoCli clients={filteredClients} />
        </div>
        {/* ClientTable: Más pequeño */}
        <div className="bg-white col-span-1 overflow-y-auto rounded-lg shadow-lg h-[300px] scrollbar-hide">
          <ClientTable clients={filteredFlights} />
        </div>
      </div>
    </div>
  );
};
