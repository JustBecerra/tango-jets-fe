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
  date_of_birth: string | null;
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
          client.email === "TBD" ||
          client.fullname === null ||
          client.fullname === "TBD" ||
          client.id === null ||
          client.id === "TBD" ||
          client.identification === null ||
          client.identification === "TBD" ||
          client.nacionality === null ||
          client.nacionality === "TBD" ||
          client.pasaport === null ||
          client.pasaport === "TBD" ||
          client.weight === null ||
          client.weight === 0 ||
          client.date_of_birth === null ||
          client.date_of_birth === "TBD"
      );

      setFilteredClients(filteredClients);

      const filteredFlights = flightsRequested.filter(
        (flight: { createdby: string }) => flight.createdby === username
      );
      setFilteredFlights(filteredFlights);
    };
    fetchData();
  }, []);

  // return (
  return (
    <div className="p-4 h-full w-full">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
        <div className="bg-white rounded-lg shadow-lg min-h-[200px] h-[300px] max-w-full col-span-1">
          <DepartingSoon flights={filteredFlights} />
        </div>
        <div className="bg-white rounded-lg shadow-lg min-h-[200px] h-[300px] max-w-full col-span-1">
          <InFlight flights={filteredFlights} />
        </div>
        <div className="bg-white rounded-lg shadow-lg min-h-[200px] h-[300px] max-w-full col-span-1">
          <RecentlyLanded flights={filteredFlights} />
        </div>
      </div>

      {/* Diseño inferior (dos tablas, ajustadas en tamaño) */}
      <div className="my-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white col-span-2 rounded-lg shadow-lg min-h-[200px] h-[300px] max-w-full">
          <MissingInfoCli clients={filteredClients} />
        </div>
        <div className="bg-white col-span-1 rounded-lg shadow-lg min-h-[200px] h-[300px] max-w-full">
          <ClientTable clients={filteredFlights} />
        </div>
      </div>
    </div>
  );
};
