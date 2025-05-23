import LoaderSpinner from "../Loaders/LoaderSpinner"
import type { Client } from "../table/TableModal"

interface props {
	clients: Client[]
}

const MissingInfoCli = ({ clients }: props) => {
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
							colSpan={7}
							className="px-3 py-2 bg-gray-50 font-semibold text-gray-700 uppercase tracking-wider text-sm"
						>
							⚠️ Missing Client Information ⚠️
						</th>
					</tr>
					<tr>
						<th className="px-3 py-2 bg-gray-50  font-medium text-gray-500 uppercase tracking-wider">
							Name
						</th>
						<th className="px-3 py-2 hidden md:table-cell bg-gray-50  font-medium text-gray-500 uppercase tracking-wider">
							Email
						</th>
						<th className="px-3 py-2 hidden md:table-cell bg-gray-50  font-medium text-gray-500 uppercase tracking-wider">
							Nationality
						</th>
						<th className="px-3 py-2 hidden md:table-cell bg-gray-50  font-medium text-gray-500 uppercase tracking-wider">
							Date
						</th>
						<th className="px-3 py-2  bg-gray-50 font-medium text-gray-500 uppercase tracking-wider">
							Passport
						</th>
						<th className="px-3 py-2 hidden md:table-cell bg-gray-50  font-medium text-gray-500 uppercase tracking-wider">
							Weight
						</th>
					</tr>
				</thead>
				<tbody className="bg-white divide-y divide-gray-200">
					{clients.length === 0 ? (
						<tr className="h-full">
							<td className="h-full" colSpan={6}>
								<div className="flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
									<LoaderSpinner />
								</div>
							</td>
						</tr>
					) : (
						clients.map((client) => (
							<tr
								key={client.id}
								className="bg-white border-b cursor-pointer sm:hover:bg-gray-200"
								onClick={() =>
									(window.location.href = `/Client`)
								}
							>
								<td className="px-3 py-2 text-center whitespace-nowrap font-medium text-gray-900">
									{client.fullname}
								</td>
								<td className="px-3 py-2 text-center hidden md:table-cell whitespace-nowrap text-gray-700">
									{client.email}
								</td>
								<td className="px-3 py-2 text-center hidden md:table-cell whitespace-nowrap text-gray-700">
									{client.nationality}
								</td>
								<td className="px-3 py-2 text-center hidden md:table-cell whitespace-nowrap text-gray-700">
									{client.date_of_birth}
								</td>
								<td className="px-3 py-2  text-center whitespace-nowrap text-gray-700">
									{client.passport}
								</td>
								<td className="px-3 py-2 hidden md:table-cell text-center whitespace-nowrap text-gray-700">
									{client.weight}
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	)
}

export default MissingInfoCli
