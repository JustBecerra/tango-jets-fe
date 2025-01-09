import React from "react";
import { getClients } from "../../../lib/actions/clients/actions";
//Clientes que van cambiando de phase
interface Client {
  id: number;
  fullname: string;
  phonenumber: string;
}

const ClientTable = () => {
  const [clients, setClients] = React.useState<Client[]>([]);

  React.useEffect(() => {
    const fetchClients = async () => {
      const clientsData = await getClients();
      const formattedClients = clientsData.map((client: any) => ({
        id: client.id,
        fullname: `${client.firstname} ${client.lastname}`,
        phonenumber: client.phonenumber,
      }));
      setClients(formattedClients);
    };
    fetchClients();
  }, []);

  return (
    <table className="min-w-full divide-y divide-gray-200 mt-4 rounded-lg overflow-hidden">
      <thead className="bg-gray-50 rounded-t-lg">
        <tr>
          <th
            colSpan={3}
            className="px-6 py-3 text-left text-lg font-semibold text-gray-700 uppercase tracking-wider"
          >
            🧑‍💼 Clients
          </th>
        </tr>
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Name
          </th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Phase
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200 rounded-b-lg">
        {clients.map((client) => (
          <tr key={client.id}>
            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              {client.fullname}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              {client.phonenumber}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ClientTable;
