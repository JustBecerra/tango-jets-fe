import LoaderSpinner from "../Loaders/LoaderSpinner"
import type { Flight } from "../table/TableModal"

interface props {
	clients: Flight[]
}
const ClientTable = ({ clients }: props) => {
	const newClientsList = clients.sort((a, b) => b.phase - a.phase)
	return (
		<div className="h-full overflow-y-auto rounded-lg shadow-lg scrollbar-hide">
			<table
				className={`min-w-full divide-y divide-gray-200 ${
					clients.length === 0 && "h-[300px]"
				} `}
			>
				<thead className="bg-gray-50 sticky top-0 z-10">
					<tr>
						<th
							colSpan={3}
							className="px-3 py-2 bg-gray-50 font-semibold text-gray-700 uppercase tracking-wider text-sm"
						>
							Trips Status
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
				<tbody className="bg-white divide-y divide-gray-200 ">
					{clients.length === 0 ? (
						<tr className="h-full">
							<td className="h-full" colSpan={2}>
								<div className="flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
									<LoaderSpinner />
								</div>
							</td>
						</tr>
					) : (
						newClientsList.map((client) => (
							<tr
								key={client.id}
								className={`border-b cursor-pointer ${
									client.phase === 4
										? "bg-green-100 text-green-800 hover:bg-green-200"
										: client.phase === 7
										? "bg-red-100 text-red-800 hover:bg-red-900"
										: "bg-white hover:bg-gray-200"
								}`}
								onClick={() =>
									(window.location.href = `/trip/${client.id}`)
								}
							>
								<td
									className={`px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900`}
								>
									{client.master_passenger}
								</td>
								<td
									className={`px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900`}
								>
									{client.phase}
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	)
}

export default ClientTable
