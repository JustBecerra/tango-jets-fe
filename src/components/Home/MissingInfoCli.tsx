import type { Client } from "../table/TableModal";

interface props {
  clients: Client[];
}

const MissingInfoCli = ({ clients }: props) => {
  return (
    <div className="h-[300px] overflow-y-auto rounded-lg shadow-lg scrollbar-hide">
      <table className="min-w-full divide-y divide-gray-200  text-xs sm:text-sm">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr>
            <th
              colSpan={7}
              className="px-3 py-2 bg-gray-50 font-semibold text-gray-700 uppercase tracking-wider text-sm"
            >
              ⚠️ Missing Client Information
            </th>
          </tr>
          <tr>
            <th className="px-3 py-2 bg-gray-50 text-left font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th className="px-3 py-2 bg-gray-50 text-left font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th className="px-3 py-2 bg-gray-50 text-left font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-3 py-2 bg-gray-50 text-left font-medium text-gray-500 uppercase tracking-wider">
              Nationality
            </th>
            <th className="px-3 py-2 bg-gray-50 text-left font-medium text-gray-500 uppercase tracking-wider">
              Identification
            </th>
            <th className="px-3 py-2 bg-gray-50 text-left font-medium text-gray-500 uppercase tracking-wider">
              Passport
            </th>
            <th className="px-3 py-2 bg-gray-50 text-left font-medium text-gray-500 uppercase tracking-wider">
              Weight
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {clients.map((client) => (
            <tr key={client.id}>
              <td className="px-3 py-2 whitespace-nowrap text-gray-900">
                {client.id}
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-gray-700">
                {client.fullname}
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-gray-700">
                {client.email}
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-gray-700">
                {client.nationality}
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-gray-700">
                {client.identification}
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-gray-700">
                {client.passport}
              </td>
              <td className="px-3 py-2 whitespace-nowrap text-gray-700">
                {client.weight}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MissingInfoCli;
