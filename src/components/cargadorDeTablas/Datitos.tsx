import React, { useEffect, useState, Suspense } from "react";
import { getCookie } from "../../utils/getCookie";
import { getAirships } from "../../../lib/actions/airships/actions";
import useStore from "../../store/store";
import { getFlights } from "../../../lib/actions/flights/actions";
import { getClients } from "../../../lib/actions/clients/actions";

interface Flight {
  id: number;
  to: string;
  from: string;
}

const FlightTable = React.lazy(() => import("../Home/FlightTable"));
const ClientTable = React.lazy(() => import("../Home/ClientTable"));
const MissingInfoCli = React.lazy(() => import("../Home/MissingInfoCli"));

export const Datitos = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [flights, setFlights] = useState<Flight[]>([]);
  const { updateAirships, updateFlights, updateClients } = useStore(
    (state) => state
  );

  useEffect(() => {
    const fetchData = async () => {
      const flights = await getFlights();
      setFlights(flights);
      updateFlights(flights);
      const airships = await getAirships();
      updateAirships(airships);
      const clients = await getClients();
      updateClients(clients);
    };
    fetchData();
    const name = getCookie("username");
    if (name) {
      setEmployeeName(name);
    }
  }, []);

  return (
    <div className="p-4">
      {/* Diseño superior (tres tablas en fila) */}
      <div className="grid grid-cols-3 gap-6">
        <div className="overflow-hidden rounded-lg shadow-lg">
          <FlightTable />
        </div>
        <div className="overflow-hidden rounded-lg shadow-lg">
          <FlightTable />
        </div>
        <div className="overflow-hidden rounded-lg shadow-lg">
          <FlightTable />
        </div>
      </div>

      {/* Diseño inferior (dos tablas, ajustadas en tamaño) */}
      <div className="mt-8 flex gap-6">
        {/* MissingInfoCli: Altura fija para evitar scroll */}
        <div className="flex-[3.1] overflow-y-auto rounded-lg shadow-lg h-[300px] scrollbar-hide">
          <MissingInfoCli />
        </div>
        {/* ClientTable: Más pequeño */}
        <div className="flex-[1.5] overflow-y-auto rounded-lg shadow-lg h-[300px] scrollbar-hide">
          <ClientTable />
        </div>
      </div>
    </div>
  );
};
