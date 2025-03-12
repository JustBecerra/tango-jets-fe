import LoaderSpinner from "../Loaders/LoaderSpinner"
import type { Flight } from "../table/TableModal"

interface props {
	flights: Flight[]
}

const InFlight = ({ flights }: props) => {
	const formatLandingTime = (launchtime: string) => {
		const date = new Date(launchtime)
		return date.toLocaleString("en-US", {
			month: "2-digit",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
			hour12: false,
		})
	}

	return (
		<div className="h-full overflow-y-auto rounded-lg shadow-lg scrollbar-hide">
			<table
				className={`min-w-full divide-y divide-gray-200 ${
					flights.length === 0 && "h-[300px]"
				} `}
			>
				<thead className="bg-gray-50 sticky top-0 z-10">
					<tr>
						<th
							colSpan={4}
							className="px-3 py-2 text-center font-semibold text-gray-700 uppercase tracking-wider text-sm"
						>
							✈ In Flight
						</th>
					</tr>
					<tr>
						<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
							Airship
						</th>
						<th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
							From-To
						</th>
						<th className="px-6 py-3 hidden md:table-cell text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
							Time
						</th>
					</tr>
				</thead>
				<tbody
					className={`bg-white ${
						flights.length === 0 && "w-full h-full"
					} divide-y divide-gray-200 rounded-b-lg`}
				>
					{flights.length === 0 ? (
						<tr className={`${flights.length === 0 && "h-full"}`}>
							<td
								className={`${
									flights.length === 0 && "h-full"
								}`}
								colSpan={3}
							>
								<div className="flex items-center justify-center w-full h-full bg-gray-800 bg-opacity-50">
									<LoaderSpinner />
								</div>
							</td>
						</tr>
					) : (
						flights.map((flight) => (
							<tr
								key={flight.id}
								className="bg-white border-b cursor-pointer hover:bg-gray-200"
								onClick={() =>
									(window.location.href = `/trip/${flight.id}`)
								}
							>
								<td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium text-gray-900">
									{flight.airship_name}
								</td>
								<td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-700">
									{flight.from}
									<svg
										xmlns="http://www.w3.org/2000/svg"
										className="inline-block w-4 h-4 mx-1 text-gray-500"
										viewBox="0 0 24 24"
										fill="currentColor"
									>
										<path d="M13.5 4.5a1 1 0 011.41 0l6 6a1 1 0 010 1.41l-6 6a1 1 0 01-1.41-1.41L17.59 12H4a1 1 0 010-2h13.59l-4.09-4.09a1 1 0 010-1.41z" />
									</svg>
									{flight.to}
								</td>
								<td className="px-6 py-4 hidden md:table-cell text-center whitespace-nowrap text-sm text-gray-700">
									{formatLandingTime(flight.launchtime)}
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>
		</div>
	)
}

export default InFlight
