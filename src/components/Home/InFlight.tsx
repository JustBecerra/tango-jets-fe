import type { Flight } from "../table/TableModal";

interface props {
  flights: Flight[];
}

const InFlight = ({ flights }: props) => {
  return (
    <div className="h-[300px] overflow-y-auto rounded-lg shadow-lg scrollbar-hide">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr>
            <th
              colSpan={4}
              className="px-3 py-2 text-center font-semibold text-gray-700 uppercase tracking-wider text-sm"
              // className="px-6 py-3 text-left text-lg font-semibold text-gray-700 uppercase tracking-wider"
            >
              ✈ In Flight
            </th>
          </tr>
          <tr>
            {/* <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
            ID
          </th> */}
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Airship
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              From
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              To
            </th>
            {/* <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time */}
            {/* </th> */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 rounded-b-lg">
          {flights.map((flight) => (
            <tr key={flight.id}>
              {/* <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900">
              {flight.id}
            </td> */}
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900">
                {flight.airship_name}
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-700">
                {flight.from}
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-700">
                {flight.to}
              </td>
              {/* <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-700">
                {flight.time}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InFlight;
