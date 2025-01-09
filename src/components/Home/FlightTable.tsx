import React from "react";
import { getFlights } from "../../../lib/actions/flights/actions";

interface Flight {
  id: number;
  to: string;
  from: string;
}

const FlightTable = () => {
  const [flights, setFlights] = React.useState<Flight[]>([]);

  React.useEffect(() => {
    const fetchFlights = async () => {
      const flightsData = await getFlights();
      setFlights(flightsData);
    };
    fetchFlights();
  }, []);

  return (
    <table className="min-w-full divide-y divide-gray-200 mt-4 rounded-lg overflow-hidden">
      <thead className="bg-gray-50 rounded-t-lg">
        <tr>
          <th
            colSpan={3}
            className="px-6 py-3 text-left text-lg font-semibold text-gray-700 uppercase tracking-wider"
          >
            🛫Departing soon✈
          </th>
        </tr>
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            ID
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            To
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            From
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 rounded-b-lg">
        {flights.map((flight) => (
          <tr key={flight.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {flight.id}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {flight.to}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {flight.from}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FlightTable;
