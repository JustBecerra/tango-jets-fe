import type { Flight } from "../table/TableModal";

interface props {
  clients: Flight[];
}
const ClientTable = ({ clients }: props) => {
  return (
    <div className="h-[300px] overflow-y-auto rounded-lg shadow-lg scrollbar-hide">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr>
            <th
              colSpan={3}
              //   className="px-6 py-3 text-left text-lg font-semibold text-gray-700 uppercase tracking-wider"
              className="px-3 py-2 bg-gray-50 font-semibold text-gray-700 uppercase tracking-wider text-sm"
            >
              🧑‍💼 Clients
            </th>
          </tr>
          <tr>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
              Phase
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {clients.map((client) => (
            <tr key={client.id}>
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900">
                {client.master_passenger}
              </td>
              <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900">
                {client.phase}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientTable;
